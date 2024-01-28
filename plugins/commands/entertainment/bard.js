/*import Bard from "bard-ai";
import path from "path";

const config = {
    name: "بارد",
    description: "اسئل الذكاء الاصطناعي Bard",
    usage: "",
    cooldown: 3,
    permissions: [0, 1, 2],
    credits: "XaviaTeam",
};

const bard = new Bard({
    "__Secure-1PSID": process.env.BARD_1PSID,
    "__Secure-1PSIDTS": process.env.BARD_1PSIDTS
});

if (!global.bard_data) {
    global.bard_data = new Map();
}

async function onCall({ message, args }) {
    const { reply, messageReply, senderID } = message;

    if (!global.bard_data.has(senderID)) {
        global.bard_data.set(senderID, bard.createChat());
    }
		if ((args[0] === "reset" || args[0] === "clear") && args.length == 1) {
			global.bard_data.delete(senderID);
			return reply("تم حذف بيانات الدردشة الخاصة بك");
		}

  
    /**
     * @type {import("bard-ai").Chat}
     */
    const chat = global.bard_data.get(senderID);

    if (
        messageReply &&
        messageReply.attachments &&
        messageReply.attachments[0] &&
        messageReply.attachments[0].type === "photo"
    ) {
        const { url } = messageReply.attachments[0];
        const pathImage = path.resolve(
            global.cachePath,
            `${senderID}_${Date.now()}.jpg`
        );

        try {
            await global.downloadFile(pathImage, url);

            /**
             * @type {import("bard-ai").IAskResponseJSON}
             */
            const response = await chat.ask(args.join(" "), {
                format: "json",
                image: pathImage,
            });

            const msg = {
                body: response.content,
                attachment: [],
            };

            if (response.images?.length > 0) {
                for (const img of response.images) {
                    const imgStream = await global
                        .getStream(img.url)
                        .catch(() => null);
                    if (imgStream) {
                        msg.attachment.push(imgStream);
                    }
                }
            }

            return reply(msg);
        } catch (error) {
            console.error(error);
        } finally {
            if (global.isExists(pathImage)) {
                global.deleteFile(pathImage);
            }
        }
    }

    /**
     * @type {import("bard-ai").IAskResponseJSON}
     */
    const response = await chat.ask(args.join(" "), {
        format: "json",
    });

    const msg = {
        body: response.content,
        attachment: [],
    };

    if (response.images?.length > 0) {
        for (const img of response.images) {
            const imgStream = await global.getStream(img.url).catch(() => null);
            if (imgStream) {
                msg.attachment.push(imgStream);
            }
        }
    }

    return reply(msg);
}

export default {
    config,
    onCall,
};
