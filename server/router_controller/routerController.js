//路由控制器层

//导入API（服务）层
let api = require(__basename + '/api/api.js')

//工具库
let utils = require(__basename + '/utils/utils.js');

//白名单
let whiteList = require(__basename + '/white_list/whiteList.js');
console.log(whiteList);

//导入sequelize模块
const Sequelize = require('sequelize');

//导入moment模块，用于处理日期时间
const moment = require('moment');

let Op = Sequelize.Op;
console.log('Op ==> ', Op);

class RouterController {

    //验证邮箱验证码,中间件
    validMailCode(req, res, next) {
        console.log(whiteList.mailList.indexOf(req.url), req.url);
        // request请求在服务器白名单内
        if (whiteList.mailList.indexOf(req.url) > -1) {
            //需要验证邮箱验证码

            //获取当前时间减去邮箱验证的过期时间
            let currentTime = new Date().getTime() - 5 * 60 * 1000;

            //使用moment处理日期时间
            let date = moment(currentTime).format('YYYY-MM-DD HH:mm:ss');
            console.log('date ==> ', date);
            console.log('req.body ==> ', req.body);

            //根据邮箱和验证码查询
            api.findData('Code', {
                email: req.body.email,
                code: req.body.verifyCode,
                createdAt: {
                    [Op.gte]: date
                }
            }).then(result => {
                // console.log('result ==> ', result);
                if (result.length == 0) {
                    res.send({
                        msg: '验证码已失效或者不正确',
                        code: 1013
                    });
                } else {
                    //验证码验证通过
                    next();
                }
            }).catch(err => {
                console.log('err ==> ', err);
                res.send({
                    msg: '邮箱验证码验证失败',
                    code: 1012
                });
            })
        } else {
            next();
        }

    }

    //注册
    registerController(req, res) {
        // 截取请求参数 req.body
        console.log('req ==> ', req.body);

        console.log('create', api.createData, 'find', api.findData);

        //查询邮箱是否已被注册
        api.findData('Business', {
                email: req.body.email
            }).then(result => {

                //邮箱未被注册过
                if (result.length == 0) {
                    // 生成userId
                    let userId = '_b' + new Date().getTime();
                    console.log('加盐', config.saltOptions.psswordSalt);

                    // 密码加密
                    let password = utils.encodeString(config.saltOptions.psswordSalt + req.body.password);

                    // 添加数据
                    api.createData('Business', {
                        // userId: req.body.userId,
                        // userId,
                        userId,
                        nickname: req.body.nickname,
                        password,
                        email: req.body.email,
                        verifyCode: req.body.verifyCode
                    }).then(result => {
                        res.send({
                            msg: '注册成功',
                            code: 1000
                        });
                    }).catch(err => {
                        res.send({
                            msg: '注册失败',
                            code: 1001
                        });
                    });
                } else {
                    res.send({
                        msg: '该邮箱已被注册',
                        code: 1002
                    });
                }
            }).catch(err => {
                res.send({
                    msg: '注册失败',
                    code: 1001
                });
            })
            // res.send({
            //     msg: '注册测试'
            // });
    };

    //发送邮箱验证码
    sendMailCode(req, res) {
            let code = Math.random().toString().slice(-6);
            // res.send({
            //     msg: '发送邮箱验证码',
            // })
            console.log('code ==> ', code);
            console.log('email ==> ', req.body.email);

            api.createData('Code', {
                email: req.body.email,
                code
            }).then(result => {
                // console.log('result ==> ', result);
                // res.send({
                //     msg: '验证已发至您邮箱',
                //     code: 1010
                // });
                utils.sendMail(req.body.email, code, (err, info) => {
                    if (err) {
                        res.send({
                            msg: '发送邮箱验证码失败',
                            code: 1011
                        });
                    } else {
                        console.log('info ==> ', info);
                        res.send({
                            msg: '验证码已发至您的邮箱',
                            code: 1010
                        });
                    }
                })
            }).catch(err => {
                console.log('err ==> ', err);
                res.send({
                    msg: '发送邮箱验证码失败',
                    code: 1011
                })
            });
        }
        //登录
    login(req, res) {
        api.findData('Business', {
            email: req.body.email,
            isDestroy: 0
        }, ['userId', 'password']).then(result => {
            if (result.length == 0) {
                res.send({
                    msg: '用户不存在',
                    code: 1022
                });
            } else {
                //如果存在用户，则需要验证密码是否正确
                let password = utils.encodeString(config.saltOptions.passwordSalt + req.body.password);
                console.log('password ==> ', password);
                console.log('result[0].dataValues.password ==> ', result[0].dataValues.password);
                if (password == result[0].dataValues.password) {
                    res.send({ msg: '登录成功', code: 1020, token });
                } else {
                    res.send({ msg: '邮箱或者密码不正确', code: 1023 });
                }
            }
        }).catch(err => {
            console.log('err ==> ', err);
            res.send({ msg: '登录失败', code: 1021 });
        })
    }
}
module.exports = new RouterController();