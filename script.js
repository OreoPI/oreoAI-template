const API_KEY = "TU_API_AQUI";  // Reemplaza con tu clave de Cohere
const API_URL = "https://api.cohere.ai/v1/generate";
const MODEL = "command";  // Modelo medio-bajo de Cohere

document.getElementById("sendButton").addEventListener("click", sendMessage);
document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") sendMessage();
});

async function sendMessage() {
    const userInput = document.getElementById("userInput").value.trim();
    if (!userInput) return;

    const messagesContainer = document.getElementById("messages");
    messagesContainer.innerHTML += `<div class="message user-message"><strong>Tú:</strong> ${userInput}</div>`;
    document.getElementById("userInput").value = "";
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: MODEL,
                prompt: `Tú: ${userInput}\nOreo AI:`,
                max_tokens: 100,
                temperature: 0.5
            })
        });

        const data = await response.json();
        const reply = data.generations?.[0]?.text || "No entendí.";

        messagesContainer.innerHTML += `<div class="message ai-message"><strong>Oreo AI:</strong> ${reply}</div>`;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } catch (error) {
        messagesContainer.innerHTML += `<div class="message ai-message" style="color: red;"><strong>Error:</strong> ${error.message}</div>`;
    }
}

