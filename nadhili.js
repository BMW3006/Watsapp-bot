const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

// Create a new client instance
const client = new Client({
  session: 'nadhili-session'
});

// Generate QR Code
client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
  console.log('QR Code generated. Scan with your phone to login.');
});

// Ready event
client.on('ready', () => {
  console.log('✅ Nadhili Bot is ready!');
  console.log('Bot Status: Connected');
});

// Message received event
client.on('message', message => {
  console.log(`📨 Message from ${message.from}: ${message.body}`);

  // Handle commands
  if (message.body === '!ping') {
    message.reply('🏓 Pong!');
  }

  if (message.body === '!hello') {
    message.reply('👋 Habari! Karibu kwenye Nadhili Bot');
  }

  if (message.body.startsWith('!echo ')) {
    const text = message.body.substring(6);
    message.reply(text);
  }

  if (message.body === '!help') {
    const helpText = `
📋 Nadhili Bot Commands:
!ping - Test bot response
!hello - Greeting message
!echo [text] - Echo your message
!time - Current time
!help - Show this help message
    `;
    message.reply(helpText);
  }

  if (message.body === '!time') {
    const time = new Date().toLocaleString();
    message.reply(`⏰ Saa hii: ${time}`);
  }
});

// Authenticate & start the bot
client.initialize();

console.log('🤖 Nadhili Bot starting...');
