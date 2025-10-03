import { useState } from "react";
import { Mic, Globe, Settings, RotateCcw } from "lucide-react";

const voiceModels = [
  { value: "alloy", label: "Alloy - Natural & Balanced" },
  { value: "echo", label: "Echo - Clear & Professional" },
  { value: "fable", label: "Fable - Warm & Engaging" },
  { value: "onyx", label: "Onyx - Deep & Authoritative" },
  { value: "nova", label: "Nova - Energetic & Bright" },
  { value: "shimmer", label: "Shimmer - Soft & Gentle" },
];

const languages = [
  { value: "en-US", label: "English (US)" },
  { value: "en-GB", label: "English (UK)" },
  { value: "es-ES", label: "Spanish" },
  { value: "fr-FR", label: "French" },
  { value: "de-DE", label: "German" },
  { value: "it-IT", label: "Italian" },
  { value: "pt-BR", label: "Portuguese" },
  { value: "ja-JP", label: "Japanese" },
  { value: "ko-KR", label: "Korean" },
  { value: "zh-CN", label: "Chinese" },
];

const formats = [
  { value: "mp3", label: "MP3 - Standard Quality" },
  { value: "wav", label: "WAV - High Quality" },
  { value: "ogg", label: "OGG - Compressed" },
  { value: "flac", label: "FLAC - Lossless" },
];

const VoiceControls = () => {
  const [voice, setVoice] = useState("alloy");
  const [language, setLanguage] = useState("en-US");
  const [format, setFormat] = useState("mp3");
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);

  return (
    <div className="lg:col-span-3 space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-gray-700" />
            <h3 className="font-semibold text-gray-900">Voice Settings</h3>
          </div>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
              Voice Model
            </label>
            <select
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all"
            >
              {voiceModels.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
              Language
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
              Output Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all"
            >
              {formats.map((fmt) => (
                <option key={fmt.value} value={fmt.value}>
                  {fmt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-700" />
            <h3 className="font-semibold text-gray-900">Audio Parameters</h3>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Speed
              </label>
              <span className="text-sm font-bold text-gray-700">
                {speed.toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              min="0.25"
              max="2.0"
              step="0.05"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-800"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0.25x</span>
              <span>1.0x</span>
              <span>2.0x</span>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Pitch
              </label>
              <span className="text-sm font-bold text-gray-700">
                {pitch.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-800"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Low</span>
              <span>Normal</span>
              <span>High</span>
            </div>
          </div>
          <button
            onClick={() => {
              setSpeed(1.0);
              setPitch(1.0);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-xl transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Parameters
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceControls;
