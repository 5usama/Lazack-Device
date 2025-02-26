let handler = async (m, { conn, args }) => {
    // Define regex and default message
    let regix = /\S+/; // Matches any non-space character
    let asta = "Sending love to you! ❤️"; // Default message if no input

    // Check if input matches regex, else use default
    let messageToSend = regix.test(args.join(' ')) ? args.join(' ') : asta;

    // Array of heart emojis
    let heartEmojis = [
        "❤", "💕", "😻", "🧡", "💛", "💚", "💙", "💜", "🖤", "❣", 
        "💞", "💓", "💗", "💖", "💘", "💝", "💟", "♥", "💌", 
        "🙂", "🤗", "😌", "😉", "🤗", "😊", "🎊", "🎉", "🎁", "❤"
    ];

    try {
        // Send the initial message
        let sentMessage = await conn.sendMessage(m.chat, { text: messageToSend.replace(/\{emoji\}/g, heartEmojis[0]) }, { quoted: m });
        let messageKey = sentMessage?.key; // Ensure messageKey exists

        // Loop through the heart emojis and edit the message
        for (let i = 0; i < heartEmojis.length; i++) {
            await sleep(800); // Wait for 800ms
            if (messageKey) {
                await conn.sendMessage(m.chat, { text: messageToSend.replace(/\{emoji\}/g, heartEmojis[i]), edit: messageKey });
            }
        }
    } catch (error) {
        console.error("Error in love.js:", error);
    }
};

// Sleep function to create delays
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

handler.help = ['love'];
handler.tags = ['fun'];
handler.command = ['love'];

export default handler;
