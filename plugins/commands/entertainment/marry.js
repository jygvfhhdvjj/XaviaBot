
import { join } from "path";
import { loadImage, createCanvas } from "canvas";

export const config = {
    name: "زواج",
    version: "0.0.1-xaviabot-port-refactor",
    credits: "kudos",
    description: "",
    usage: "[@تاغ]",
    cooldown: 5
};

const marryPath = join(global.assetsPath, "marrywi.png");
export async function onLoad() {
    global.downloadFile(marryPath," https://i.ibb.co/VDrz7Q9/336377253-520155543604186-3362317639442779902-n.png");
}


export async function makeImage({ one, two }) {
    const template = await loadImage(marryPath);

    let avatarPathOne = join(global.cachePath, `avt_${one}.png`);
    let avatarPathTwo = join(global.cachePath, `avt_${two}.png`);

    await global.downloadFile(avatarPathOne, global.getAvatarURL(one));
    await global.downloadFile(avatarPathTwo, global.getAvatarURL(two));

    const avatarOne = await loadImage(avatarPathOne);
    const avatarTwo = await loadImage(avatarPathTwo);

    const avatarOneCircle = await global.circle(avatarOne, avatarOne.width / 2, avatarOne.height / 2, avatarOne.width / 2);
    const avatarTwoCircle = await global.circle(avatarTwo, avatarTwo.width / 2, avatarTwo.height / 2, avatarTwo.width / 2);

    const canvas = createCanvas(template.width, template.height);
    const ctx = canvas.getContext("2d");

