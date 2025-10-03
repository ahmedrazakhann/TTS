import { useState, useRef } from "react";
import {
  FileText,
  Upload,
  Save,
  Play,
  Download,
  Volume2,
  Wand2,
  Zap,
} from "lucide-react";

const TextEditorArea = ({ setAudioHistory }) => {
  const [text, setText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef(null);

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const estimatedTime = Math.ceil(wordCount / 150);

  const handleSpeak = (content) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
    utteranceRef.current = utterance;
    setIsPlaying(true);
  };

  const handleGenerate = () => {
    if (!text.trim()) return;
    handleSpeak(text);

    const newAudio = {
      id: Date.now(),
      title: text.substring(0, 20) + (text.length > 20 ? "..." : ""),
      text,
      voice: "Default",
      duration: `${estimatedTime}m`,
      format: "mp3",
      date: new Date().toLocaleString(),
    };

    setAudioHistory((prev) => [...prev, newAudio]);
  };

  return (
    <div className="lg:col-span-6 space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <FileText className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Characters</p>
              <p className="text-xl font-bold text-gray-900">
                {charCount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Wand2 className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Words</p>
              <p className="text-xl font-bold text-gray-900">
                {wordCount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Zap className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Est. Time</p>
              <p className="text-xl font-bold text-gray-900">
                {estimatedTime}m
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Volume2 className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Status</p>
              <p className="text-xl font-bold text-gray-900">
                {isPlaying ? "Playing" : "Ready"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-700" />
              <h3 className="font-semibold text-gray-900">Text Editor</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                title="Upload File"
              >
                <Upload className="w-4 h-4 text-gray-700" />
              </button>
              <button
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                title="Save Draft"
              >
                <Save className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter or paste your text here... You can type up to 100,000 characters for conversion to speech."
            className="w-full h-64 p-4 text-base text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent resize-none transition-all leading-relaxed"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          />

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">
                  {charCount.toLocaleString()}
                </span>{" "}
                / 100,000 characters
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">
                  {wordCount.toLocaleString()}
                </span>{" "}
                words
              </span>
            </div>

            <button
              onClick={() => setText("")}
              className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleGenerate}
            disabled={!text.trim()}
            className="flex-1 min-w-[220px] flex items-center justify-center gap-3 px-6 py-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5" />
            Generate Audio
          </button>

          <button
            disabled={!text.trim()}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};
export default TextEditorArea;
