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
// console.log('Op ==> ', Op);


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
            // console.log('date ==> ', date);
            // console.log('req.body ==> ', req.body);

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

    //验证token,登录验证
    validToken(req, res, next) {

        // console.log('req.url ==> ', req.url);
        // console.log('whiteList.tokenList ==> ', whiteList.tokenList);

        let url = req.url.split('?')[0];
        console.log('登录时token白名单匹配', whiteList.tokenList.indexOf(url));

        if (whiteList.tokenList.indexOf(url) > -1) {

            console.log('需要验证token');

            // console.log('req.headers.cookie ==> ', req.headers.cookie);
            // req.headers.cookie
            // let cookies = utils.transformCookie(myToken);
            // console.log('cookies', cookies);

            // console.log('cookies._abc ==> ', cookies._abc);
            let cookies = myToken;
            //解析token
            utils.verifyString({
                value: cookies,
                salt: config.tokenOptions.tokenSalt,
                fn: (err, decoded) => {
                    console.log('err ==> ', err);
                    if (err) {
                        //如果解析失败
                        res.send({
                            msg: '请先登录',
                            code: 1031
                        });
                    } else {
                        //token验证通过

                        console.log('token验证通过');
                        
                        //将userId传递给下一个中间件或者路由的req请求对象
                        req.userId = decoded.data;
                        console.log("登录的用户ID ==> ",req.userId);
                        next();
                    }
                }
            })

        } else {
            //不需要验证token，直接通过
            console.log('不需要验证token，直接通过');
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

                console.log(req.body.password);
                let password = utils.encodeString(config.saltOptions.passwordSalt + req.body.password);
                // 密码加密
                // let pass = utils.encodeString(config.saltOptions.psswordSalt + 'As19980320');
                console.log('register_password', password);

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
        // console.log('req.body.data ==> ', req.body.email);
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
                console.log('用户输入的密码 ==> ', req.body.password);

                //如果存在用户，则需要验证密码是否正确
                let password = utils.encodeString(config.saltOptions.passwordSalt + req.body.password);
                console.log('password ==> ', password);
                console.log('result[0].dataValues.password ==> ', result[0].dataValues.password);
                if (password == result[0].dataValues.password) {
                    //如果密码正确
                    //生成token
                    let token = utils.signString({
                        value: result[0].dataValues.userId,
                        salt: config.tokenOptions.tokenSalt,
                        expires: config.tokenOptions.expires
                    });
                    global.myToken = token;
                    console.log('token ==> ', token);

                    res.send({
                        msg: '登录成功',
                        code: 1020,
                        token
                    });
                } else {
                    res.send({
                        msg: '邮箱或者密码不正确',
                        code: 1023
                    });
                }
            }
        }).catch(err => {
            console.log('loginErr ==> ', err);
            res.send({
                msg: '登录失败',
                code: 1021
            });
        })
    }
    //添加商品类型
    addType(req, res) {

        //生成类型id
        let typeId = '_ty' + new Date().getTime();

        api.createData('Type', {
            typeId,
            type: req.body.type,
            userId: req.userId
        }).then(result => {
            console.log('result ==> ', result);
            res.send({
                msg: '添加商品类型成功',
                code: 1040
            });
        }).catch(err => {
            console.log('err ==> ', err);
            res.send({
                msg: '添加商品类型失败',
                code: 1041
            });
        })
    }

    //获取商品类型数据
    getTypeData(req, res) {
        api.findDataByLimit('Type', {
                userId: req.userId
            }, null,
            ['updated_at', 'DESC'], Number(req.query.offset), Number(req.query.limit)
        ).then(result => {
            res.send({
                msg: '查询商品类型成功',
                code: 1042,
                result
            });
        }).catch(err => {
            console.log('err ==> ', err);
            res.send({
                msg: '查询商品类型失败',
                code: 1043
            });
        })
    }

    //搜索商品类型
    searchType(req, res) {
        api.findDataByLimit('Type', {
            userId: req.userId,
            type: {
                //模糊查询
                [Op.like]: `%${req.query.type}%`
            }
        }, null, ['updatedAt', 'DESC'], Number(req.query.offset), Number(req.query.limit)).then(result => {
            res.send({
                msg: '搜索商品类型成功',
                code: 1044,
                result
            });
        }).catch(err => {
            console.log('err ==> ', err);
            res.send({
                msg: '搜索商品类型失败',
                code: 1045
            });
        })
    }

    //更新商品类型
    updateType(req, res) {
        api.updateData('Type', {
            type: req.body.type
        }, {
            typeId: req.body.typeId
        }).then(result => {
            res.send({
                msg: '更新商品类型成功',
                code: 1048,
                result
            });
        }).catch(err => {
            console.log('err ==> ', err);
            res.send({
                msg: '更新商品类型失败',
                code: 1049
            });
        })
    }

    //禁用和启用
    toggleTypeStatus(req, res) {
        console.log('状态', req.body.status);

        api.updateData('Type', {
            isEnable: Number(req.body.status)
        }, {
            typeId: req.body.typeId
        }).then(result => {
            //  console.log('result ==> ', result);
            res.send({
                msg: '操作成功',
                code: 1046,
                result
            })
        }).catch(err => {
            console.log('err ==> ', err);
            res.send({
                msg: '操作失败',
                code: 1047
            })
        })
    }

    //获取数据表的记录数
    typeRows(req, res) {
        api.count('Type', {
            userId: req.userId
        }).then(result => {
            res.send({
                msg: '获取商品类型数量成功',
                code: 1050,
                result
            });
        }).catch(err => {
            console.log('err ==> ', err);
            res.send({
                msg: '获取商品类型数量失败',
                code: 1051
            });
        })
    }

    //搜索商品类型数据量
    searchRows(req, res) {
        api.count('Type', {
            userId: req.userId,
            type: {
                [Op.like]: `%${req.query.type}%`
            }
        }).then(result => {
            res.send({
                msg: '搜索商品类型成功',
                code: 1044,
                result
            });
        }).catch(err => {
            console.log('err ==> ', err);
            res.send({
                msg: '搜索商品类型失败',
                code: 1045
            });
        })
    }

    //获取用户信息
    getUserInfo(req, res) {
        console.log("登录传来的用户ID ==> ",req.userId);
        
        api.findData('Business', {
            userId: req.userId,
            isDestroy: 0
        }, ['nickname', 'aviltor']).then(result => {
            console.log('result ==> ', result);
            res.send({
                msg: '查询用户信息成功',
                code: 1060,
                result
            });
        }).catch(err => {
            console.log('err => ', err);
            res.send({
                msg: '查询用户信息失败',
                code: 1061
            });
        })
    }
}
module.exports = new RouterController();