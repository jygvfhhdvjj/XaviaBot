
/*const config = {
    name: "plugins",
    aliases: ["pl", "plg", "plugin"],
    description: "Manage plugins",
    usage: "[reload]/[list]",
    permissions: [2],
    credits: "XaviaTeam"
}

const langData = {
    "en_US": {
        "result.reload": "Reloaded plugins, check console for more details",
        "result.list": "Commands: {commands}\nEvents: {events}\nOnMessage: {onMessage}\nCustoms: {customs}",
        "invalid.query": "Invalid query!",
        "error.unknow": "An error occurred, check console for more details"
    },
    "vi_VN": {
        "result.reload": "Đã tải lại toàn bộ plugin, kiểm tra console để biết thêm chi tiết",
        "result.list": "Lệnh: {commands}\nSự kiện: {events}\nTrình xử lý tin nhắn: {onMessage}\nTùy chỉnh: {customs}",
        "invalid.query": "Lệnh không hợp lệ!",
        "error.unknow": "Đã xảy ra lỗi, kiểm tra console để biết thêm chi tiết"
    },
    "ar_SY": {
        "result.reload": "إعادة تحميل جميع المكونات الإضافية ، تحقق من وحدة التحكم لمزيد من التفاصيل",
        "result.list": "امر: {commands}\الأحداث: {events}\nمعالج الرسائل: {onMessage}\nالعادة: {customs}",
        "invalid.query": "أمر خاطئ!",
        "error.unknow": "حدث خطأ ما ، تحقق من وحدة التحكم لمزيد من التفاصيل"
    }
}

async function onCall({ message, args, getLang }) {
    try {
        const query = args[0]?.toLowerCase();
        if (query === "reload") {
            delete global.plugins;
            global.plugins = new Object({

