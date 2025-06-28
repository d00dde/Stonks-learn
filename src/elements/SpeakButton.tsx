import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

type TProps = {
  text: string;
};

export function SpeakButton({ text }: TProps) {
  function speak() {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en";
    window.speechSynthesis.speak(utterance);
  }

  return (
    <button onClick={speak} className="btn btn-info m-3"><FontAwesomeIcon icon={faVolumeHigh} /></button>
  );
}
