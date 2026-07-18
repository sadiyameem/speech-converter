const speakButton = document.getElementById('speak-btn');
const textArea = document.getElementById('text-to-speak');
const voiceSelect = document.getElementById('voice-select');

if ('speechSynthesis' in window) {
    let voices = [];

    function populateVoiceList() {
        voices = speechSynthesis.getVoices();
        voiceSelect.innerHTML = '';

        voices.forEach((voice) => {
            const option = document.createElement('option');
            option.textContent = voice.name;
            option.value = voice.name;
            voiceSelect.appendChild(option);
        });
    }

    function refreshVoiceList() {
        if (speechSynthesis.getVoices().length !== voices.length) {
            populateVoiceList();
        }
    }

    speechSynthesis.onvoiceschanged = () => {
        refreshVoiceList();
    }

    refreshVoiceList();
    speakButton.addEventListener('click', function () {
        const text = textArea.value.trim();
        if (text === "") {
            alert("Please enter text to speak.");
            return;
        }

        const selectedVoiceName = voiceSelect.value;
        const selectedVoice = voices.find(voice => voice.name === selectedVoiceName);

        const speech = new SpeechSynthesisUtterance(text);
        speech.voice = selectedVoice;

        speechSynthesis.speak(speech);
    });
} else {
    alert("sorry, your browser does not support Speech Converter")
}

const themeToggleBtn = document.querySelector('.theme-toggle');

function handleThemeToggle() {
    document.body.classList.toggle('dark-mode');
}

themeToggleBtn.addEventListener('click', () => {
    handleThemeToggle();
})