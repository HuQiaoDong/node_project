// 导入加密模块
const crypto = require('crypto');

// 导入发邮件模块
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    //主机
    host: 'smtp.126.com', //邮箱域名

    // 端口,25端口在阿里云服务禁用，推荐用465端口
    port: 465,

    //当端口为465，需要设置为true
    secure: true,

    //身份验证
    auth: {
        user: 'huqiaodong@126.com',
        pass: 'ZURZCQWXPWPKDEHU',
    }
})

class Utils {

    //加密方法
    encodeString(value) {
        let md5 = crypto.createHash('md5');
        return md5.update(value).digest('hex');
    }


    sendMail(emails, code, callback) {
        // emails:收邮件地址.string，比如534664357@qq.com
        //callback:发邮件完成后，执行的回调函数,callback

        //取随机数后6位数字
        // let code = Math.random().toString().slice(-6);
        // console.log(code);
        // console.log('email ==> ', emails);

        // console.log(transporter);

        transporter.sendMail({

            //发邮件地址
            from: 'huqiaodong@126.com',

            //收邮件地址
            to: emails,

            //主题
            subject: '邮箱验证码',

            text: `您的验证码为：${code}，5分钟内有效`
        }, callback)

    }
}

//导出
module.exports = new Utils();