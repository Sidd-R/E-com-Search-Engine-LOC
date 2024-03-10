export default function TextToSpeech (text: string, rate:number = 0.8) {
    window.speechSynthesis.cancel();
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Text-to-speech is not supported in this browser.');
    }
}