import {useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

type TProps = {
  text: string;
  lang: string;
};

const langs = {
  "en": ["en-US", "en-GB", "en_GB", "en_AU", "en_IN", "en_NG", "en_US"],
  "ru": ["ru-RU", "ru_RU"],
};

export function SpeakButton({ text, lang }: TProps) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  useEffect(() => {
    const loadVoices = () => {
      const synthVoices = window.speechSynthesis.getVoices();
      setVoices(synthVoices);
    };
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);
  function speak() {
    const langList = langs[(lang ?? "en") as keyof typeof langs];
    if (!langList) {
      console.warn(`Language "${lang}" not supported.`);
      return;
    }
    const validVoices = voices.filter(voice =>langList.includes(voice.lang));
    const currentVoice = validVoices[Math.floor(Math.random() * validVoices.length)];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentVoice.lang;
    utterance.voice = currentVoice;
    window.speechSynthesis.speak(utterance);
  }
  return (
    <button onClick={speak} className="btn btn-info m-3"><FontAwesomeIcon icon={faVolumeHigh} /></button>
  );
}
