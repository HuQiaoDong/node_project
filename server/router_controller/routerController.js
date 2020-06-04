//路由控制器层

//导入API（服务）层
let api = require(__basename + '/api/api.js')

//工具库
let utils = require(__basename + '/utils/utils.js');

//白名单
let whiteList = require(__basename + '/white_list/whiteList.js');
console.log(whiteList);

//导入文件系统模块
const fs = require('fs');

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
                        console.log("登录的用户ID ==> ", req.userId);
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

    //商品类型禁用和启用
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

    //商品列表禁用和启用
    toggleProductStatus(req, res) {
        console.log('状态', req.body.status);

        api.updateData('Product', {
            status: Number(req.body.status)
        }, {
            pid: req.body.pid
        }).then(result => {
            //  console.log('result ==> ', result);
            res.send({
                msg: '操作成功',
                code: 1090,
                result
            })
        }).catch(err => {
            console.log('err ==> ', err);
            res.send({
                msg: '操作失败',
                code: 1091
            })
        })
    }
    //获取商品类型数据表的记录数
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

    //获取商品数据表的记录数
    productRows(req, res) {

        let condition = {
            userId: req.userId
        }

        //商品名称需要进模糊查询 %商品名称%
        if (req.query.name) {
            condition.name = {
                [Op.like]: '%' + req.query.name + '%'
            };
        }

        if (req.query.date) {
            condition.createdAt = {
                [Op.gte]: req.query.date
            };
        }

        if (req.query.type) {
            condition.type = req.query.type;
        }

        if (req.query.status !== undefined) {
            condition.status = req.query.status;
        }

        api.count('Product', condition).then(result => {
            res.send({
                msg: '获取商品类型数量成功',
                code: 1072,
                result
            });
        }).catch(err => {
            console.log('err ==> ', err);
            res.send({
                msg: '获取商品类型数量失败',
                code: 1073
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
        console.log("登录传来的用户ID ==> ", req.userId);

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

    //获取商品类型
    proType(req, res) {
        api.findData('Type', {
            userId: req.userId,
            isEnable: 1
        }, ['typeId', 'type']).then(result => {
            res.send({
                msg: '获取商品类型成功',
                code: 1052,
                result
            });
        }).catch(err => {
            console.log('err ==> ', err);
            res.send({
                msg: '获取商品类型失败',
                code: 1053
            });
        })
    }

    //发布商品
    postProduct(req, res) {
        // console.log('req.body ==> ', req.body);
        //先上传完毕图片，再将数据写入到数据库
        let imgs = ['img', 'imgDetail'];

        let count = 0;

        let isUpload = true;

        for (let i = 0; i < imgs.length; i++) {

            if (!isUpload) {
                return res.send({
                    msg: '发布商品失败',
                    code: 1071
                });
            }

            //获取图片base64
            let base64 = req.body[imgs[i]].replace(/ /g, '+');

            //将base64转换成buffer, 类似二进制文件
            let buffer = new Buffer(base64, 'base64');

            //生成文件名  xxx.png, xxx.jpeg
            let filename = Math.random().toString().slice(2) + '.' + req.body[imgs[i] + 'Type'];

            //使用文件系统图片base64写入服务器
            fs.writeFile(__basename + '/upload/' + filename, buffer, err => {
                if (err) {
                    //如果上传失败
                    isUpload = false;

                    if (i == imgs.length - 1) {
                        res.send({
                            msg: '发布商品失败',
                            code: 1071
                        });
                    }

                } else {

                    req.body[imgs[i]] = filename;

                    delete req.body[imgs[i] + 'Type'];

                    //上传图片成功
                    count++;

                    //已经上传完毕
                    if (count == imgs.length) {
                        //生成商品id
                        req.body.pid = '_pro' + new Date().getTime();

                        //关联用户
                        req.body.userId = req.userId;

                        // console.log('req.body ==> ', req.body);

                        //将数据写入数据库中
                        api.createData('Product', req.body).then(result => {
                            res.send({
                                msg: '发布商品成功',
                                code: 1070,
                                result
                            });
                        }).catch(err => {
                            res.send({
                                msg: '发布商品失败',
                                code: 1071
                            });
                        })
                    }
                }
            })

        }

    }

    // 获取商品列表数据
    productList(req, res) {
        console.log('req.query ==> ', req.query);

        //查询条件
        let condition = {
            userId: req.userId,

            //sql分页查询偏移量
            offset: Number(req.query.offset),

            //sql分页查询数据条目
            limit: Number(req.query.limit)
        };
        //sql语句
        let sql = "SELECT `p`.`user_id`, `p`.`pid`, `p`.`name`, `p`.`status`, `p`.`created_at`, `p`.`updated_at`, `t`.`type` FROM `product` AS `p` INNER JOIN `type` AS `t` ON `p`.`type` = `t`.`type_id` AND `p`.`user_id` = :userId";
        //商品名称需要进模糊查询 %商品名称%
        if (req.query.name) {
            console.log('+=name');

            condition.name = '%' + req.query.name + '%';
            sql += " AND `p`.`name` LIKE :name";
        }

        if (req.query.date) {
            console.log('+=date');
            condition.date = req.query.date;
            sql += " AND `p`.`created_at` >= :date"
        }

        if (req.query.type) {
            console.log('+=type');
            condition.type = req.query.type;
            sql += " AND `p`.`type` = :type";
        }

        if (req.query.status !== undefined) {
            console.log('+=status');
            condition.status = req.query.status;
            sql += " AND `p`.`status` = :status";
        }

        //分页排序
        sql += " ORDER BY updated_at DESC"
        sql += " LIMIT " + condition.offset + "," + condition.limit;

        console.log('condition ==> ', condition);
        console.log('sql ==> ', sql);

        api.query(sql, condition).then(result => {
            res.send({
                msg: '查询商品列表数据成功',
                code: 1080,
                result
            });
        }).catch(err => {
            console.log('err ==> ', err);
            res.send({
                msg: '查询商品列表数据失败',
                code: 1081
            });
        })
    }

    //删除商品
    removeProduct(req, res) {
        console.log('req.body ==> ', req.body.pid);

        api.destroyData('Product', {
            pid: req.body.pid
        }).then(result => {
            res.send({
                msg: '删除成功',
                code: 1074,
                result
            })
        }).catch(err => {
            res.send({
                msg: '删除失败',
                code: 1075
            })
        })
    }
    productByPid(req,res){

        // let pid = req.body.pid;
        api.findData('Product',{
            pid:req.query.pid
        },['name','type','price','count','img','imgDetail','status','desc']).then(result=>{
            res.send({
                msg: '查看搜索数据成功',
                code: 1076,
                result
            })
        }).catch(err=>{
            console.log('err ==> ',err);
            res.send({
                msg: '查看搜索数据成功',
                code: 1077,
            })
        })
        
    }
}
module.exports = new RouterController();