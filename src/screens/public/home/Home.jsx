import { useState } from "react";
import VoiceControls from "./components/VoiceControls";
import TextEditorArea from "./components/TextEditorArea";
import AudioLibrary from "./components/AudioLibrary";

const Home = () => {
  const [audioHistory, setAudioHistory] = useState([]);
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <VoiceControls />
        </div>
        <div className="lg:col-span-6">
          <TextEditorArea
            audioHistory={audioHistory}
            setAudioHistory={setAudioHistory}
          />
        </div>
        <div className="lg:col-span-3">
          <AudioLibrary
            audioHistory={audioHistory}
            setAudioHistory={setAudioHistory}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
