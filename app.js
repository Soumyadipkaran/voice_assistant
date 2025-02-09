const btn = document.querySelector('.talk');
const content = document.querySelector('.content');


// Personalized greeting with stored name
function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    let voices = window.speechSynthesis.getVoices();
    
    text_speak.voice = voices.find(voice => voice.name.includes("Google UK English Female")) ||
                       voices.find(voice => voice.name.includes("Google US English Female")) ||
                       voices.find(voice => voice.name.includes("Microsoft Zira")) ||
                       voices.find(voice => voice.lang.includes("en") && voice.name.includes("Female")) ||
                       voices[0];

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1.2; 

    window.speechSynthesis.speak(text_speak);
}


// Check for browser compatibility
if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    alert("Your browser does not support speech recognition. Please use Google Chrome.");
}
// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript.toLowerCase();
    content.textContent = transcript;
    takeCommand(transcript);
};

recognition.onend = () => {
    recognition.start();
};

btn.addEventListener('click', () => {
    content.textContent = "Listening....";
    recognition.start();
});

// Function to handle user commands
function takeCommand(message) {
    if (message.includes('set my name')) {
        let name = message.replace("set my name", "").trim();
        localStorage.setItem("userName", name);
        speak(`Okay, I will call you ${name} from now on.`);
    } 
    else if (message.includes('what is my name')) {
        let userName = localStorage.getItem("userName") || "Boss";
        speak(`Your name is ${userName}.`);
    } 
    else if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How may I assist you?");
    } 
    else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } 
    else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    } 
    else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } 
    else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.split(" ").join("+")}`, "_blank");
        speak(`Here is what I found on the internet regarding ${message}`);
    }
    else if (message.includes('video') ||message.includes('videos') || message.includes('in youtube') || message.includes('on youtube')||message.includes('youtube')
    ) {
        let query = message.replace(/video|in youtube|youtube/gi, "").trim();
        window.open(`https://www.youtube.com/results?search_query=${query.split(" ").join("+")}`, "_blank");
        speak(`Searching YouTube for ${query}`);
    }
     
    else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        speak(`Here is what I found on Wikipedia about ${message}`);
    } 
    else if (message.includes('time')) {
        const time = new Date().toLocaleTimeString();
        speak(`The current time is ${time}`);
    } 
    else if (message.includes('date')) {
        const date = new Date().toLocaleDateString();
        speak(`Today's date is ${date}`);
    } 
    else if (message.includes('calculator')) {
        window.open('Calculator:///');
    }
    else if (message.includes('close') || message.includes('stop')) {
        recognition.stop();
        speak("Speech recognition stopped.");
    }
    else if (
        message.includes('who created you') || 
        message.includes('who create you') || 
        message.includes('your creator') || 
        message.includes('creator') ||
        message.includes('who made you') || 
        message.includes('who is your developer') || 
        message.includes('who is your creator') || 
        message.includes('who developed you') || 
        message.includes('who built you') || 
        message.includes('who build you') ||
        message.includes('who designed you')||
        message.includes('who designe you')
    ) {
        window.open("https://www.linkedin.com/in/soumyadip-karan-82559224b");
        speak("I was created by soumyadip karan");
    }
      
    else {
        window.open(`https://www.google.com/search?q=${message.split(" ").join("+")}`, "_blank");
        speak(`I found some information for ${message} on Google.`);
    }
}
