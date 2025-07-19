/* ================== MOBILE MENU TOGGLE ================== */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

/* ================== CHATBOT TOGGLE ================== */
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotContainer = document.getElementById("chatbot-container");
const chatClose = document.getElementById("chat-close");

if (chatbotToggle && chatbotContainer && chatClose) {
  chatbotToggle.addEventListener("click", () => {
    chatbotContainer.classList.toggle("hidden"); // toggle visible
  });

  chatClose.addEventListener("click", () => {
    chatbotContainer.classList.add("hidden"); // force close
  });
}

/* ================== CHATBOT ELEMENTS ================== */
const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const micBtn = document.getElementById("mic-btn");

/* ✅ Dummy chatbot responses */
const responses = {
  hello: "Hi! 👋 I'm Jarvis, your FitZone assistant. How can I help you?",
  pricing: "💰 Plans: Basic ₹2900/month | Premium ₹5900/month with unlimited classes.",
  classes: "🏋️ We offer Yoga, Cardio, Zumba, Barre, and Strength Training!",
  schedule: "📅 Classes run from 6 AM to 9 PM every day.",
  contact: "📧 Email us at support@fitzone.com or call 📞 +91 9876543210.",
  default: "🤔 I’m not sure about that. Try asking about 'pricing', 'classes', or 'schedule'.",
  thankyou:"🤝 You’re welcome,. It was my pleasure to assist you. Let me know if you need further support."
};

/* ✅ Add message bubble */
function addMessage(text, sender = "bot") {
  const div = document.createElement("div");
  div.className = sender === "user" ? "user-message" : "bot-message";
  div.textContent = text;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}

/* ✅ Handle user message */
function handleMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  // Show user's message
  addMessage(message, "user");
  userInput.value = "";

  // Find best reply
  const lowerMsg = message.toLowerCase();
  const replyKey = Object.keys(responses).find(key => lowerMsg.includes(key)) || "default";

  // Simulate bot typing delay
  setTimeout(() => addMessage(responses[replyKey], "bot"), 500);
}

/* ✅ Send button click */
if (sendBtn) {
  sendBtn.addEventListener("click", handleMessage);
}

/* ✅ Press Enter to send */
if (userInput) {
  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleMessage();
  });
}

/* ✅ Voice Input (Optional) */
if (micBtn && "webkitSpeechRecognition" in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";

  micBtn.addEventListener("click", () => {
    recognition.start();
    micBtn.textContent = "🎙️ Listening...";
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    userInput.value = transcript;
    micBtn.textContent = "🎤";
  };

  recognition.onerror = () => {
    micBtn.textContent = "🎤";
    alert("Voice recognition failed. Try again.");
  };
} else if (micBtn) {
  micBtn.style.display = "none"; // Hide mic if unsupported
}
