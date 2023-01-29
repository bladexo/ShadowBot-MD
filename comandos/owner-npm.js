import fetch from 'node-fetch'
let handler = async (m, { conn, text, args, command, usedPrefix }) => {
if (!text) throw `_Ingresa el nombre del paquete npm_\n_Ejemplo_ : ${prefix}npmsearch whatsapp-web.js`
let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`)
let { objects } = await res.json()
if (!objects.length) return m.reply(`Paquete "${text}" no encontrado`)
let bg = 'https://telegra.ph/file/42ca1bf46a366d929e7ce.jpg'
let txt2 = objects.map(({ package: pkg }) => {
return `*◦ Paquete:* ${pkg.name || '-'}
*🔍 Version:* ${pkg.version || '-'}
*🔗 Enlace:* ${pkg.links.npm || '-'}
*📗 Descripcion:* ${pkg.description || '-'}
*📌 KeyWords:* ${pkg.keywords || '-'}
*📦 Publicado:* ${pkg.date}
*👥 Username:* ${pkg.publisher.username || '-'}
*💳 Gmail:* ${pkg.publisher.email || '-'}
*🖊️ HomePage:* ${pkg.links.homepage || '-'} `
	}).join`\n\n`
          conn.sendHydrated(m.chat, txt2, wm, bg, "https://wa.me/972529277520 💬 ᴄʜᴀᴛs", null,null, [["BY DIEGO-OFC", null], [null, null],[null,null]], m)

}
handler.command = /(npmsh)/i 
handler.rowner = true 
export default handler
