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

    //获取用户信息
    app.get('/userInfo', routerController.getUserInfo);

    //获取商品类型数据表的记录数
    app.get('/typeRows', routerController.typeRows);

    //获取商品数据表的记录数
    app.get('/productRows', routerController.productRows);

    //搜索时获取数据表的记录数
    app.get('/searchRows', routerController.searchRows);

    //获取商品类型
    app.get('/proType', routerController.proType);

    //获取商品列表数据
    app.get('/productList', routerController.productList);

    //查看商品列表信息
    app.get('/productByPid', routerController.productByPid);
    

    //修改商品类型
    app.post('/type', routerController.updateType);

    //商品类型禁用和启用
    app.post('/typeStatus', routerController.toggleTypeStatus);

    //商品列表禁用和启用
    app.post('/productStatus', routerController.toggleProductStatus);

    //发布商品
    app.post('/postProduct', routerController.postProduct)

    //删除商品
    app.post('/removeProduct',routerController.removeProduct)
}