const routerController = require(__basename + '/router_controller/routerController.js');

module.exports = app => {

    //验证邮箱验证码
    app.use(routerController.validMailCode);

    //注册
    app.post('/register', routerController.registerController)

    //发送邮箱验证码
    app.post('/sendmail', routerController.sendMailCode)

    //登录
    app.post('/login', routerController.login);
}