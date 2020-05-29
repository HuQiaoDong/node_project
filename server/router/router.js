const routerController = require(__basename + '/router_controller/routerController.js');

module.exports = app => {

    //验证邮箱验证码
    app.use(routerController.validMailCode);

    //验证token，验证登录
    app.use(routerController.validToken);

    //注册
    app.post('/register', routerController.registerController)

    //发送邮箱验证码
    app.post('/sendmail', routerController.sendMailCode)

    //登录
    app.post('/login', routerController.login);

    //添加商品类型
    app.post('/addType', routerController.addType);

    //获取商品类型
    app.get('/getType', routerController.getTypeData);

    //搜索商品类型
    app.get('/searchType', routerController.searchType);

    //修改商品类型
    app.post('/type', routerController.updateType);

    //禁用和启用
    app.post('/typeStatus', routerController.toggleTypeStatus);
}