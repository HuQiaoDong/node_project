// 导入加密模块
const crypto = require('crypto');

// 导入发邮件模块
const nodemailer = require('nodemailer');

//导入生成和解析token模块
const jsonwebtoken = require('jsonwebtoken');

//创建发邮件配置
let transporter = nodemailer.createTransport(config.emailOptions);
// let transporter = nodemailer.createTransport({
//     //主机
//     host: 'smtp.126.com', //邮箱域名

//     // 端口,25端口在阿里云服务禁用，推荐用465端口
//     port: 465,

//     //当端口为465，需要设置为true
//     secure: true,

//     //身份验证
//     auth: {
//         user: 'huqiaodong@126.com',
//         pass: 'ZURZCQWXPWPKDEHU',
//     }
// })


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
            from: config.emailOptions.auth.user,

            //收邮件地址
            to: emails,

            //主题
            subject: '邮箱验证码',

            text: `您的验证码为：${code}，5分钟内有效`
        }, callback)

    }

    //将cookie转换成普通对象
    transformCookie(cookie) {
        console.log('cookie ==> ', cookie);

        let cookies = cookie.split('; ');
        let cookiesObject = {};
        cookies.forEach(v => {
            let c = v.split('=');
            cookiesObject[c[0]] = c[1];
        });

        return cookiesObject;
    }

    //签名字符串, 生成token
    signString(o) {
        /*
        {
          value: 被签名的字符串,
          salt: 加盐,
          expires: 过期时间
        }
        */

        //过期时间写法
        //60 ==> '60s'
        //'100' ==> '100ms'
        //'2 days' ==> '2天'
        //'10h' ==> '10小时'
        //'7d' ==> '7天'
        return jsonwebtoken.sign({
            //被签名的字符串，建议被签名字符是唯一
            data: o.value
        }, o.salt, {
            expiresIn: o.expires
        })
    }

    //解析签名字符串, 解析token
    verifyString(o) {
        /**
         * {
         *   value: token字符串,
         *   salt: 加盐,
         *   fn: 回调函数
         * }
         * 
         * fn(err, decoded) {}
         */

        jsonwebtoken.verify(o.value, o.salt, o.fn);
    }
}

//导出
module.exports = new Utils();