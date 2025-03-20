
import os from 'os';
import fs from 'fs';
import path from 'path';
import moment from 'moment-timezone';
import { promisify } from 'util';
const readdir = promisfy(fs.readdir);

let handler = async (m, { conn }) => {
  const menuThumbnail = 'https://i.imgur.com/r4TueFV.jpeg';

  const lazackpath  = './lazackcmds';
  const commands = await readdir(lazackpath);
  const commandList = commands
    .map((cmd,idx) => `${idx + 1}, ${path.parse(cmd).name}`)
    .join('\n');

  const sysInfo = {
    totalRAM: `${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`,
    usedRAM: `${((os.totalmem() - os.freemem()) / (1024 ** 3)).toFixed(2)} GB`,
    uptime: moment.duration(os.uptime(), 'seconds').humanize(),
    timestamp: moment.tz('Africa/Nairobi').format('ddd DD/MM/YY HH:mm:ss'),
    platform: `${os.platform()} ${os.arch()}`,
    version: '2.1.0',
    developer: '@lazack',
  };

  const menu = `
╔════════════════════╗
║  *LAZACK-DEVICE*   ║
╠════════════════════╣
║ 👤 User: ${m.pushName || 'User'}
║ ⏳ Time: ${sysInfo.timestamp}
╠════════════════════╣
║ 📊 System Info:
║ ⏱ Uptime: ${sysInfo.uptime}
╠════════════════════╣
║ 📜 Available Commands:
║  ${commandList}
╠════════════════════╣
║ 🔗 github.com/Lazack28
╚════════════════════╝
  `.trim();

  await conn.sendMessage(m.chat, {
    image: { url: menuThumbnail },
    caption: menu,
    contextInfo: {
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
    }
  }, { quoted: m });
}
handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu'];

export default handler;