const os = require('os');
const moment = require("moment-timezone");
const fs = require("fs");
const Config = require('../config');
let { fancytext, tlang, tiny, runtime, formatp, botpic, prefix, sck1 } = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const Secktor = require('../lib/commands');

//---------------------------------------------------------------------------

Secktor.cmd({
    pattern: "help",
    alias: ["menu"],
    desc: "Help list",
    category: "general",
    react: "📃",
    filename: __filename
},
async (Void, citel, text) => {
    const { commands } = require('../lib');
    if (text.split(" ")[0]) {
        let arr = [];
        const cmd = commands.find((cmd) => cmd.pattern === (text.split(" ")[0].toLowerCase()));
        if (!cmd) return await citel.reply("*😔 No Such commands.*");
        else arr.push(`*🍁Command:* ${cmd.pattern}`);
        if (cmd.category) arr.push(`*✨Category:* ${cmd.category}`);
        if (cmd.alias) arr.push(`*⚡️Alias:* ${cmd.alias}`);
        if (cmd.desc) arr.push(`*🗂Description:* ${cmd.desc}`);
        if (cmd.use) arr.push(`*📡Usage:*\n \`\`\`${prefix}${cmd.pattern} ${cmd.use}\`\`\``);
        return await citel.reply(arr.join('\n'));
    } else {
        const cmds = {};
        commands.map(async (command, index) => {
            if (command.dontAddCommandList === false && command.pattern !== undefined) {
                if (!cmds[command.category]) cmds[command.category] = [];
                cmds[command.category].push(command.pattern);
            }
        });
        
        let str = `🤖 Hello *@${citel.pushName}*, I'm *LAZACK MD*\n\n`;
        str += `🔖 *Prefix*: [ ${prefix} ]\n\n`;
        str += `📚 *Below are my available commands*:\n\n`;
        str += `*Website: COMING SOON\n\n`;
        
        for (const category in cmds) {
            str += `*☞ ${category.charAt(0).toUpperCase() + category.slice(1)} ☜*\n`;
            str += `➮\`\`\`${cmds[category].join(', ')}\`\`\`\n\n`;
        }
        
        str += `📘 *Note:* To summon more information about a command, use ${prefix}help <cmd_name>. Example: *${prefix}help info*`;
        let buttonMessaged = {
            image: { url: await botpic() },
            caption: str
        };
        return await Void.sendMessage(citel.chat, buttonMessaged);
    }
});

//---------------------------------------------------------------------------

Secktor.cmd({
    pattern: "list",
    desc: "list menu",
    category: "general"
},
async (Void, citel) => {
    const { commands } = require('../lib');
    let str = `┏━━━━━•❃〘LAZACK-MD〙❃•━━━━━┓\n`;
    str += `┃ ⛥┏━━━━━•❃°•°•━━━━━•❃°•°•\n`;
    str += `•͙͙✧⃝•͙ User: ${citel.pushName}\n`;
    str += `•͙͙✧⃝•͙ Theme: ${tlang().title}\n`;
    str += `•͙͙✧⃝•͙ Prefix: ${prefix}\n`;
    str += `•͙͙✧⃝•͙ Owner: lazack\n`;
    str += `•͙͙✧⃝•͙ Commands: ${commands.length}\n`;
    str += `•͙͙✧⃝•͙ Uptime: ${runtime(process.uptime())}\n`;
    str += `•͙͙✧⃝•͙ Mem: ${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}\n`;
    str += `•͙͙✧⃝•͙\n`;
    str += `•͙͙✧⃝┗━━━━━•❃°•°•━━━━━•❃°•°•\n`;
    str += `┗━━━━━•❃°•°•━━━━━•❃°•°•\n`;
    for (let i = 0; i < commands.length; i++) {
        if (commands[i].pattern == undefined) continue;
        str += `✰ ${i+1} *${fancytext(commands[i].pattern, 1)}*\n`;
        if (commands[i].desc === undefined) commands[i].desc = "";
        str += `✰ ${fancytext(commands[i].desc, 1)}\n`;
    }
    return await Void.sendMessage(citel.chat, { image: { url: THUMB_IMAGE }, caption: str });
});

//---------------------------------------------------------------------------

Secktor.cmd({
    pattern: "owner",
    desc: "To find owner number",
    category: "general",
    react: "👾",
    filename: __filename
},
async (Void, citel) => {
    const Config = require('../config');
    const vcard = 'BEGIN:VCARD\n' +
        'VERSION:3.0\n' +
        'FN:' + Config.ownername + '\n' +
        'ORG:;\n' +
        'TEL;type=CELL;type=VOICE;waid=' + owner[0] + ':+' + owner[0] + '\n' +
        'END:VCARD';
    let buttonMessaged = {
        contacts: { displayName: Config.ownername, contacts: [{ vcard }] },
        contextInfo: {
            externalAdReply: {
                title: Config.ownername,
                body: 'Touch here.',
                renderLargerThumbnail: true,
                thumbnailUrl: ``,
                thumbnail: log0,
                mediaType: 2,
                mediaUrl: '',
                sourceUrl: `https://wa.me/+` + owner[0] + '?text=Hii bro,I am ' + citel.pushName,
            },
        },
    };
    return await Void.sendMessage(citel.chat, buttonMessaged, {
        quoted: citel,
    });
});

//---------------------------------------------------------------------------

Secktor.cmd({
    pattern: "file",
    desc: "to get exact name where that command is in repo. So user can edit that.",
    category: "general",
    react: "🥷",
    filename: __filename
},
async (Void, citel, text) => {
    const { commands } = require('../lib');
    let arr = [];
    const cmd = commands.find((cmd) => cmd.pattern === (text.split(" ")[0].toLowerCase()));
    if (!cmd) return await citel.reply("*😔 No Such commands.*");
    else arr.push(`*📡Command:* ${cmd.pattern}`);
    if (cmd.category) arr.push(`*🧩Type:* ${cmd.category}`);
    if (cmd.filename) arr.push(`✨FileName: ${cmd.filename}`);
    return citel.reply(arr.join('\n'));
});
