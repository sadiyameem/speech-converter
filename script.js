let speech = new SpeechSynthesisUtterance();

let voices = [];
let voiceSelect = document.querySelector("select");

const buttons = document.querySelectorAll("button");

const listenButton = buttons[0];
const speakButton = buttons[1];
const stopButton = buttons[2];

const resultElement = document.querySelector("textarea");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

listenButton.addEventListener("click", () => {
    speech.text = resultElement.value;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Speech recognition is not supported in this browser.");
} else {
    const recognition = new SpeechRecognition();

    recognition.lang = window.navigator.language;
    recognition.interimResults = true;

    speakButton.addEventListener('click', () => {
        recognition.start();
    });
    stopButton.addEventListener('click', () => {
        recognition.stop();
        window.speechSynthesis.cancel();
    });

    recognition.addEventListener('result', (event) => {
        const result = event.results[event.results.length - 1][0].transcript;
        resultElement.value = result;
    });
}