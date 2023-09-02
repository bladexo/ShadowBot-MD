import { S_WHATSAPP_NET } from "@whiskeysockets/baileys";

let handler = async (m, { conn, args, participants }) => {
  let users = Object.entries(global.db.data.users).map(([key, value]) => {
    return { ...value, jid: key };
  });
  let sortedExp = users.map(toNumber("exp")).sort(sort("exp"));
  let sortedLim = users.map(toNumber("limit")).sort(sort("limit"));
  let sortedLevel = users.map(toNumber("level")).sort(sort("level"));
  let sortedRole = users.map(toNumber("role")).sort(sort("role"));
  let sortedDolares = users.map(toNumber("dolares")).sort(sort("dolares"));
  let sortedJoincount = users
    .map(toNumber("joincount"))
    .sort(sort("joincount"));
  let sortedPremium = users.map(toNumber("premium")).sort(sort("premium"));
let sortedbank = users.map(toNumber("bank")).sort(sort("bank"));
    
  let usersExp = sortedExp.map(enumGetKey);
  let usersLim = sortedLim.map(enumGetKey);
  let usersLevel = sortedLevel.map(enumGetKey);
  let usersDolares = sortedDolares.map(enumGetKey);
  let usersJoincount = sortedJoincount.map(enumGetKey);
let usersbank = sortedbank.map(enumGetKey);
    
  const parseMention = (text) =>
    [...text.matchAll(/@?([0-9]{5,16}|0)/g)].map((v) => v[1] + S_WHATSAPP_NET);

  let len =
    args[0] && args[0].length > 0
      ? Math.min(100, Math.max(parseInt(args[0]), 10))
      : Math.min(10, sortedExp.length);
  let text = `╔═════ೋೋ═════╗
║ 🏆 *TABLA DE CLASIFICACION*
║
║ ➢ *TOP ${len} Dolares 💵*
║ Tú : *${usersDolares.indexOf(m.sender) + 1}* de *${
    usersDolares.length
  } Usuarios*
║ ${sortedDolares
    .slice(0, len)
    .map(
      ({ jid, dolares }, i) =>
        `${i + 1}. ${
          participants.some((p) => jid === p.jid)
            ? `(${conn.getName(jid)}) wa.me/`
            : "@"
        }${jid.split`@`[0]} *${dolares}  💸*`,
    ).join`\n`}
║═════════════════
║ ➢ *TOP ${len} XP ⚡* 
║ Tú : *${usersExp.indexOf(m.sender) + 1}* de *${usersExp.length} Usuarios*
║ ${sortedExp
    .slice(0, len)
    .map(
      ({ jid, exp }, i) =>
        `${i + 1}. ${
          participants.some((p) => jid === p.jid)
            ? `(${conn.getName(jid)}) wa.me/`
            : "@"
        }${jid.split`@`[0]} *${exp} ⚡*`,
    ).join`\n`}
║═════════════════
║ ➢ *TOP ${len} NIVEL 🔅* 
║ Tú : *${usersLevel.indexOf(m.sender) + 1}* de *${usersLevel.length} Usuarios*
║ ${sortedLevel
    .slice(0, len)
    .map(
      ({ jid, level }, i) =>
        `${i + 1}. ${
          participants.some((p) => jid === p.jid)
            ? `(${conn.getName(jid)}) wa.me/`
            : "@"
        }${jid.split`@`[0]} *${level} 🔅*`,
    ).join`\n`}
║═════════════════
║ ➢ *TOP ${len} ROL | RANGO 💪* 
║ Tú : *${usersLevel.indexOf(m.sender) + 1}* de *${usersLevel.length} Usuarios*
║ ${sortedLevel
    .slice(0, len)
    .map(
      ({ jid, role }, i) =>
        `${i + 1}. ${
          participants.some((p) => jid === p.jid)
            ? `(${conn.getName(jid)}) wa.me/`
            : "@"
        }${jid.split`@`[0]} ${role}`,
    ).join`\n`}
║═════════════════
║ ➢ *TOP ${len} Dolares BANK 💵*
║ Tú : *${usersbank.indexOf(m.sender) + 1}* de *${
    usersbank.length
  } Usuarios*
║ ${sortedbank
    .slice(0, len)
    .map(
      ({ jid, bank }, i) =>
        `${i + 1}. ${
          participants.some((p) => jid === p.jid)
            ? `(${conn.getName(jid)}) wa.me/`
            : "@"
        }${jid.split`@`[0]} *${bank}  💸*`,
    ).join`\n`}
║═════════════════
║ ➢ *TOP ${len} DIAMANTES 💎* 
║ Tú : *${usersLim.indexOf(m.sender) + 1}* de *${usersLim.length} Usuarios*
║ ${sortedLim
    .slice(0, len)
    .map(
      ({ jid, limit }, i) =>
        `${i + 1}. ${
          participants.some((p) => jid === p.jid)
            ? `(${conn.getName(jid)}) wa.me/`
            : "@"
        }${jid.split`@`[0]} *${limit} 💎*`,
    ).join`\n`}
    ║═════════════════
║ ➢ *TOP USUARIOS ${len} PREMIUM 🎟️* 
║ Tú : *${usersLevel.indexOf(m.sender) + 1}* de *${usersLevel.length} Usuarios*
║ ${sortedLim
    .slice(0, len)
    .map(
      ({ jid, premium }, i) =>
        `${i + 1}. ${
          participants.some((p) => jid === p.jid)
            ? `(${conn.getName(jid)}) wa.me/`
            : "@"
        }${jid.split`@`[0]} *${premium ? `✅` : `❌`} 🎟️*`,
    ).join`\n`}
═════════════════
║ ➢ *TOP ${len} TOKENS  ☯️* 
║ Tú : *${usersJoincount.indexOf(m.sender) + 1}* de *${
    usersJoincount.length
  } Usuarios*
║ ${sortedJoincount
    .slice(0, len)
    .map(
      ({ jid, joincount }, i) =>
        `${i + 1}. ${
          participants.some((p) => jid === p.jid)
            ? `(${conn.getName(jid)}) wa.me/`
            : "@"
        }${jid.split`@`[0]} *${joincount} ☯️*`,
    ).join`\n`}
╚════ ≪ •❈• ≫ ════╝
`.trim();
  //await m.reply(text, null, { mentions: conn.parseMention(text) });
  conn.sendMessage(
    m.chat,
    { text: text, mentions: await parseMention(text) },
    { quoted: m },
  );
};
handler.help = ["top"];
handler.tags = ["xp"];
handler.command = ["leaderboard", "lb"];
//handler.register = true
handler.fail = null;
handler.exp = 0;

export default handler;

function sort(property, ascending = true) {
  if (property)
    return (...args) =>
      args[ascending & 1][property] - args[!ascending & 1][property];
  else return (...args) => args[ascending & 1] - args[!ascending & 1];
}

function toNumber(property, _default = 0) {
  if (property)
    return (a, i, b) => {
      return {
        ...b[i],
        [property]: a[property] === undefined ? _default : a[property],
      };
    };
  else return (a) => (a === undefined ? _default : a);
}

function enumGetKey(a) {
  return a.jid;
       }
                            
