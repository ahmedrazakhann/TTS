import { useEffect, useState } from "react";
import { Mic, Globe, Settings, RotateCcw } from "lucide-react";
import { getLanguages, getVoiceFormats, getVoices } from "@/api/HomeApiCalls";
import { useSelector } from "react-redux";
import SliderInput from "@/components/SliderInput";
import SelectInput from "@/components/SelectInput";

const VoiceControls = () => {
  const voiceModels = useSelector((state) => state.ttsConfig.voices);
  const languages = useSelector((state) => state.ttsConfig.languages);
  const formats = useSelector((state) => state.ttsConfig.formats);

  const [voice, setVoice] = useState(
    localStorage.getItem("preferredVoice") || "alloy"
  );
  const [language, setLanguage] = useState(
    localStorage.getItem("preferredLanguage") || "en-US"
  );
  const [format, setFormat] = useState(
    localStorage.getItem("preferredFormat") || "mp3"
  );
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);

  useEffect(() => {
    getVoices();
    getLanguages();
    getVoiceFormats();
  }, []);

  return (
    <div className="lg:col-span-3 space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 flex items-center gap-2">
          <Mic className="w-5 h-5 text-gray-700" />
          <h3 className="font-semibold text-gray-900">Voice Settings</h3>
        </div>
        <div className="p-6 space-y-5">
          <SelectInput
            label="Voice Model"
            value={voice}
            onChange={(e) => {
              setVoice(e.target.value),
                localStorage.setItem("preferredVoice", e.target.value);
            }}
            options={voiceModels}
          />
          <SelectInput
            label="Language"
            icon={Globe}
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value),
                localStorage.setItem("preferredLanguage", e.target.value);
            }}
            options={languages}
          />
          <SelectInput
            label="Output Format"
            value={format}
            onChange={(e) => {
              setFormat(e.target.value),
                localStorage.setItem("preferredFormat", e.target.value);
            }}
            options={formats}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-700" />
          <h3 className="font-semibold text-gray-900">Audio Parameters</h3>
        </div>
        <div className="p-6 space-y-6">
          <SliderInput
            label="Speed"
            value={speed}
            onChange={setSpeed}
            min={0.25}
            max={2.0}
            step={0.05}
            marks={["0.25x", "1.0x", "2.0x"]}
          />
          <SliderInput
            label="Pitch"
            value={pitch}
            onChange={setPitch}
            min={0.5}
            max={2.0}
            step={0.1}
            marks={["Low", "Normal", "High"]}
          />
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
