import { loadImage, createCanvas } from "canvas";
import { join } from "path";

export const config = {
    name: "اوباما",
    version: "0.0.2-xaviabot-port",
    description: "",
    usage: "[نص]",
    cooldown: 10
};

export function wrapText(ctx, text, maxWidth) {
    return new Promise(resolve => {
        if (ctx.measureText(text).width < maxWidth) return resolve([text]);
        if (ctx.measureText('W').width > maxWidth) return resolve(null);
        const words = text.split(' ');
        const lines = [];
        let line = '';
        while (words.length > 0) {
            let split = false;
            while (ctx.measureText(words[0]).width >= maxWidth) {
                const temp = words[0];
                words[0] = temp.slice(0, -1);
                if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
                else {
                    split = true;
                    words.splice(1, 0, temp.slice(-1));
                }
            }
            if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) line += `${words.shift()} `;
            else {
                lines.push(line.trim());
                line = '';
            }
            if (words.length === 0) lines.push(line.trim());
        }
        return resolve(lines);
    });
}

export async function onCall({ message, args }) {
    try {
        const { senderID } = message;

        let pathImg = join(global.cachePath, `__obama_${senderID}_${Date.now()}.png`);
        let text = args.join(" ");

        if (!text) return message.reply(" أدخل النص المطلوب عرضه على الصورة. ");

        await global.downloadFile(pathImg, "https://i.imgur.com/C29INyg.png");

        let baseImage = await loadImage(pathImg);
        let canvas = createCanvas(baseImage.width, baseImage.height);
        let ctx = canvas.getContext("2d");
        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
        ctx.font = "320 30px Arial";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "start";
        let fontSize = 220;
        while (ctx.measureText(text).width > 2600) {
            fontSize--;
            ctx.font = `320 ${fontSize}px Arial, sans-serif`;
        }
        const lines = await wrapText(ctx, text, 570);
        ctx.fillText(lines.join('\n'), 40, 115);//comment
        ctx.beginPath();
        const imageBuffer = canvas.toBuffer();
        global.writeFile(pathImg, imageBuffer);

        await message.reply({ attachment: global.reader(pathImg) }).catch(console.error)
        global.deleteFile(pathImg);
    } catch (e) {
        console.error(e);
        message.reply("Error");
    }
}
