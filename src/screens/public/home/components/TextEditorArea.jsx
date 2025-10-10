import { useState, useRef } from "react";
import { FileText, Volume2, Wand2, Zap } from "lucide-react";
import StatsCard from "./StatsCard";
import TextAreaWithStats from "./TextAreaWithStats";
import ActionButtons from "./ActionButtons";

const TextEditorArea = ({ setAudioHistory }) => {
  const [text, setText] = useState(() => {
    return localStorage.getItem("textLogs") || "";
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef(null);

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const estimatedTime = Math.ceil(wordCount / 150);

  const handleSpeak = (content, onAudioGenerated) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(content);

    // Audio context to capture audio
    const audioContext = new AudioContext();
    const destination = audioContext.createMediaStreamDestination();
    const mediaRecorder = new MediaRecorder(destination.stream);
    const chunks = [];

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/mp3" });
      const audioUrl = URL.createObjectURL(blob);

      if (onAudioGenerated) onAudioGenerated(audioUrl);
    };

    utterance.onend = () => {
      mediaRecorder.stop();
      setIsPlaying(false);
    };

    mediaRecorder.start();
    window.speechSynthesis.speak(utterance);
    utteranceRef.current = utterance;
    setIsPlaying(true);
  };

  const handleGenerate = () => {
    if (!text.trim()) return;

    handleSpeak(text, (audioUrl) => {
      const newAudio = {
        id: Date.now(),
        title: text.substring(0, 20) + (text.length > 20 ? "..." : ""),
        text,
        voice: "Default",
        duration: `${estimatedTime}m`,
        format: "mp3",
        date: new Date().toLocaleString(),
        audioUrl,
      };

      setAudioHistory((prev) => [...prev, newAudio]);
    });
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setText(newValue);
    localStorage.setItem("textLogs", newValue);
  };

  const clearText = () => setText("");

  return (
    <div className="lg:col-span-6 space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <StatsCard
          icon={FileText}
          label="Characters"
          value={charCount.toLocaleString()}
        />
        <StatsCard
          icon={Wand2}
          label="Words"
          value={wordCount.toLocaleString()}
        />
        <StatsCard icon={Zap} label="Est. Time" value={`${estimatedTime}m`} />
        <StatsCard
          icon={Volume2}
          label="Status"
          value={isPlaying ? "Playing" : "Ready"}
        />
      </div>

      <TextAreaWithStats
        text={text}
        onChange={handleChange}
        charCount={charCount}
        wordCount={wordCount}
        clearText={clearText}
      />

      <ActionButtons onGenerate={handleGenerate} disabled={!text.trim()} />
    </div>
  );
};
export default TextEditorArea;
