/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

type TProps = {
  setTranscript: (transcript: string) => void,
  disabled?: boolean,
}

export function VoiceCatcher({ setTranscript, disabled = false }: TProps){
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const getRecognition = () => {
    if (recognitionRef.current) return recognitionRef.current;
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('К сожалению, браузер не поддерживает Web Speech API');
      return null;
    }

    const recog = new SpeechRecognition();
    recog.lang = 'en';          // язык распознавания
    recog.interimResults = false;   // получать промежуточные результаты
    recog.maxAlternatives = 1;

    recog.onerror = (event: any) => {
      console.error('Ошибка распознавания:', event.error);

      switch (event.error) {
        case 'no-speech':
          alert('Ничего не сказано. Попробуйте ещё раз.');
          break;
        case 'audio-capture':
          alert('Нет доступа к микрофону.');
          break;
        case 'not-allowed':
          alert('Разрешение на микрофон не получено.');
          break;
        case 'aborted':
          console.warn('Распознавание было прервано.');
          break;
        default:
          alert('Произошла ошибка: ' + event.error);
      }
    };

    recog.onresult = (e: any) => {
      let interimTranscript = '';
      for (let i = 0; i < e.results.length; i++) {
        const res = e.results[i];
        interimTranscript += res[0].transcript;
      }
      if (interimTranscript) setTranscript(interimTranscript);
    };

    recog.onend = () => setListening(false);
    recognitionRef.current = recog;
    return recog;
  };

  // Старт/стоп по кнопке
  const toggleListen = () => {
    const recog = getRecognition();
    if (!recog) return;

    if (!listening) {
      recog.start();
      setListening(true);
    } else {
      recog.stop();
      setListening(false);
    }
  };

  return (
    <div className="d-flex align-items-center">
      <button
        disabled={disabled}
        onClick={toggleListen}
        className={`btn btn-outline-secondary ${
          listening ? 'text-danger' : 'text-success'
        }`}
      >
        {listening ? <FontAwesomeIcon icon={faStop} /> : <FontAwesomeIcon icon={faMicrophone} /> }
      </button>
    </div>
  );
}
