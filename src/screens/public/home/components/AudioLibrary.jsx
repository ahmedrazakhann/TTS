import {
  Play,
  Pause,
  Download,
  Trash2,
  Mic,
  Volume2,
  Clock,
} from "lucide-react";
import { useState } from "react";

const AudioLibrary = ({ audioHistory, setAudioHistory }) => {
  const [playingId, setPlayingId] = useState(null);

  const handlePlay = (audio) => {
    if (playingId === audio.id) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(audio.text);
    utterance.onend = () => setPlayingId(null);
    window.speechSynthesis.speak(utterance);

    setPlayingId(audio.id);
  };

  const handleDelete = (id) => {
    setAudioHistory(audioHistory.filter((a) => a.id !== id));
    if (playingId === id) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
    }
  };

  return (
    <div className="lg:col-span-3 space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-700" />
              <h3 className="font-semibold text-gray-900">Audio Library</h3>
            </div>
            <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
              {audioHistory.length}
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-200 max-h-[calc(100vh-200px)] overflow-y-auto">
          {audioHistory.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Volume2 className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 mb-1">No audio files yet</p>
              <p className="text-xs text-gray-400">
                Generate your first audio to see it here
              </p>
            </div>
          ) : (
            audioHistory.map((audio) => (
              <div
                key={audio.id}
                className="p-4 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handlePlay(audio)}
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      playingId === audio.id
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-800"
                    }`}
                  >
                    {playingId === audio.id ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 truncate mb-1">
                      {audio.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                      {audio.text}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Mic className="w-3 h-3" />
                        {audio.voice}
                      </span>
                      <span>•</span>
                      <span>{audio.duration}</span>
                      <span>•</span>
                      <span className="uppercase">{audio.format}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{audio.date}</p>
                  </div>

                  <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => alert("Download feature")}
                      className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(audio.id)}
                      className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioLibrary;
