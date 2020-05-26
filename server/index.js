// 服务器入口

//设置基本路径, global表示全局对象，全局属性可以省略global
global.__basename = __dirname;

//导入数据库配置
global.config = require(__basename + '/config/config.js');
console.log('数据库配置', config);

//连接mysql数据库,全局属性保存连接实例，以便后续创建模型
global.sequelize = require(__basename + '/db_connect/dbConnect.js');

// 导入所有模型
global.model = require(__basename + '/db_connect/model/model.js')

//导入express
const express = require('express');

//导入body-parser
const bodyParser = require('body-parser');

//导入白名单
const whiteList = require(__basename + '/white_list/whiteList.js');
console.log('白名单列表', whiteList);

//导入路由
//导入路由
const router = require(__basename + '/router/router.js');
console.log('路由', router);

//创建express实例
let app = express();
// 允许跨域

// 设置解析post请求体
//将请求体解析为json格式
app.use(bodyParser.json());

//extended:false可以接受任何数据类型,true:可以接受字符串或者数组
app.use(bodyParser.urlencoded({
    extended: false
}))

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//验证跨域白名单挂载
// console.log(whiteList.indexOf('http://127.0.0.1:8080'));

app.use((req, res, next) => {
    //跨域白名单验证
    console.log('请求', req.headers.origin);
    console.log('-----------------------------');

    // console.log('req ==> ', req.body);

    if (whiteList.hostList.indexOf(req.headers.origin) === -1) {
        return res.send({
            msg: '请求域不合法'
        });
    }
    console.log('通过');

    next();
});

//加载路由，将express实例方法作为实参传入router.js文件中
router(app);


//监听端口
app.listen(9000, () => {
    console.log('the server running http://127.0.0.1:9000');
})

//测试数据库连接状态
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });