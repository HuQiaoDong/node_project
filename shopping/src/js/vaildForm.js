class VaildForm {
    constructor() {
        this.data = {
            email: {
                reg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                // reg: /^\d&/,
                tips: "请输入您常用的E-mail邮箱号",
                error: "对不起，您填写的E-mail格式不正确！正确的格式：yourname@gmail.com"
            },
            nickname: {
                reg: /^[\u4E00-\u9FA5A-Za-z0-9_\ ]{3,20}$/i,
                // reg: /^\d&/,
                tips: "3~20个字符，由中文、英文字母和下划线组成",
                error: "对不起，用户名格式不正确。这确的格式如：“robert_yao” 或者 “创业街商户”。"
            },
            password: {
                reg: /^[a-zA-Z0-9\_\-\~\!\%\*\@\#\$\&\.\(\)\[\]\{\}\<\>\?\\\/\'\"]{6,20}$/,
                // reg: /^\d&/,
                tips: "6~20个字符，由英文字母，数字和特殊符号组成。",
                error: "对不起，您填写的密码有误。"
            },
            verifyCode: {
                reg: /^\d{6}$/,
                tips: "请输入6位验证码",
                error: "验证码有误"
            }
        };
        // this.verifyRes = [];
    }
    verify(data) {
        // this.verifyRes = [];
        let verifyRes = [];
        for (let key in this.data) {
            let o = this.data[key].reg.test(data[key]);
            // console.log(o);
            verifyRes.push(o);
        }
        console.log('res == >', verifyRes);
        return verifyRes;
    }
    valid(o) {
        for (let key in o) {
            if (!this.data[key].reg.test(o[key])) {
                return {
                    pass: false
                };
            }
        }
        return true
    }
}
export var vaildForm = new VaildForm();