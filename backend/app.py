from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper
import tempfile
import os
import traceback

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

FFMPEG_PATH = "ffmpeg"   # Assumes FFmpeg is installed
model = whisper.load_model("base")  # Free local model

@app.route("/transcribe", methods=["POST"])
def transcribe():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file provided"}), 400

        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        print("✅ File received:", file.filename)

        # Save original file
        file_path = os.path.join(os.getcwd(), UPLOAD_FOLDER, file.filename)
        file.save(file_path)
        print("✅ File saved at:", file_path)

        # Convert to WAV using ffmpeg
        wav_path = file_path.replace(".webm", ".wav")
        os.system(f'ffmpeg -i "{file_path}" -ar 16000 -ac 1 "{wav_path}" -y')

        # Whisper transcription
        print("🧠 Running Whisper...")
        result = model.transcribe(wav_path)
        transcript = result.get("text", "").strip()

        # Save to history
        with open("history.txt", "a", encoding="utf-8") as f:
            f.write(transcript + "\n")

        return jsonify({"transcript": transcript})

    except Exception as e:
        print("❌ Unexpected error:", e)
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

    finally:
        # Cleanup
        try:
            os.remove(file_path)
            os.remove(wav_path)
        except:
            pass


@app.route("/history", methods=["GET"])
def history():
    if not os.path.exists("history.txt"):
        return jsonify([])

    with open("history.txt", "r", encoding="utf-8") as f:
        lines = f.read().splitlines()

    return jsonify(lines[-3:])


if __name__ == "__main__":
    print("Starting Flask server on http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
