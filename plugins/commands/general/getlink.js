/*
const config = {
    name: "getlink",
    description: "getlink",
    usage: "[reply]",
    cooldown: 3,
    permissions: [0, 1, 2],
    credits: "XaviaTeam"
}

const langData = {
    "vi_VN": {
        "replyMessage": "Vui lòng reply tin nhắn",
        "noAttachment": "Không có tệp đính kèm",
        "noSupportedAttachment": "Không có tệp đính kèm hỗ trợ, chỉ hỗ trợ ảnh và ảnh động",
        "uploadFailed": "Lấy link thất bại",
        "error": "Đã xảy ra lỗi"
    },
    "en_US": {
        "replyMessage": "Please reply a message",
        "noAttachment": "No attachment",
        "noSupportedAttachment": "No supported attachment, only support photo and animated image",
        "uploadFailed": "Upload failed",
        "error": "An error occured"
    },
    "ar_SY": {
        "replyMessage": "الرجاء الرد على الرسالة",
        "noAttachment": "لا يوجد مرفق",
        "noSupportedAttachment": "لا يوجد مرفق مدعوم ، يدعم فقط الصور والصورة المتحركة",
        "uploadFailed": "فشل الرفع",
        "error": "حدث خطأ"
    }
}

const supportedType = ["photo", "animated_image"];

function upload(url) {
