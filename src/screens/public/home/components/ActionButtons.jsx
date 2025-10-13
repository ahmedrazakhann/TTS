import { Play } from "lucide-react";

const ActionButtons = ({ onGenerate, disabled, isPlaying }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onGenerate}
          disabled={disabled || isPlaying}
          className="flex-1 min-w-[220px] flex items-center justify-center gap-3 px-6 py-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-5 h-5" />
          Generate Audio
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
