nodejs
http
path
ejs
express
设置静态目录
设置模板引擎
路由

项目后台服务器架构
express

//CORS 跨域资源共享
//app.all(_)表示所有请求路径必须经过
app.all('_', (req, res, next) => {

    //允许跨域地址
    res.header("Access-Control-Allow-Origin", "http://www.kangliuyong.com:10000");

    //*表示允许所有域请求，在实际开发中，一般指定允许某个域请求，如上面设置
    //res.header("Access-Control-Allow-Origin", "*");

    //如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    //该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    //该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可
    //res.header('Access-Control-Allow-Credentials', true);

    next();

});

post: 用于修改、添加、删除数据，一般用于具有用户敏感信息的请求，对字符进行编码传输
get: 用于获取数，以明文形式传输的

sequelize: 一款基于 nodejs 的异步 ORM 框架，用于操作数据库

sequelize 简化在不同电脑开发创建数据表结构的繁琐工作

参考连接
https://itbilu.com/nodejs/npm/sequelize-docs-v5.html#getting-started

安装 sequelize
npm install --save sequelize

安装 mysql2
npm install --save mysql2

数据库连接池
1、数据库连接池负责分配，管理和释放数据库的连接，它允许应用程序重复使用一个现有的数据库连接，而不是重建一个数据库连接

2、最小连接数：是连接池一直保持数据库连接，所以如果应用程序对数据库连接的使用量不大，将会有大量的数据库连接资源被浪费

3、最大连接数：是连接池能申请的最大连接数，如果数据库的连接请求超过次数，后面的数据库连接将被加入到等待队列中，这会影响以后的数据库操作

nodejs
commonJS 规范
一个文件，只有一个 module.exports, 可以有多个 exports
exports 相当于给 module.exports 添加属性

es6 规范
一个文件，只有 export default {}, 可以有一个 export const 变量名称 = ...

nodejs 截取参数
对于 post，需要使用 req.body 获取请求体参数
需要安装 body-parser 处理 post 请求体

对于 get，需要使用 req.query 获取请求参数(查询参数)

加密模块 crypto

发邮件 nodemailer
需要在你的邮箱平台申请授权码

处理日期时间模块 moment

前后端分离一般使用 token 验证身份(登录验证)
token: 用于身份验证
token 其实就是一串被加密字符串

前端使用一个正确的账号和密码跟后台服务器换取一个合法 token 值，后台服务器将生成的 token 返回给前端，前端使用 cookie 将 token 保存，以便访问需要验证登录的其他页面

token 模块 jsonwebtoken

场景值
注册: 100x
发邮件: 101x
登录: 102x
token 验证: 103x
商品类型: 104x,105x

自营商城

邮箱
/^\w+([-+.]\w+)_@\w+([-.]\w+)_\.\w+([-.]\w+)\*\$/

商家后台管理系统 技术选型(jquery + bootstrap, vue + bootstrap)
注册
登录
商品类型管理
商品管理
  
 数据统计
订单管理
权限管理
用户管理
财务管理

ajax 方案
axios
npm install axios vue-axios --save

    对于post请求，参数需要写在data
    对于get请求，参数需要写在params

设置基础请求路径
axios.defaults.baseURL = 'http://192.168.53.2:10002'

设置 post 请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

携带 cookie
axios.defaults.withCredentials = true

添加 axios 请求拦截器, 该方法在请求之前触发
axios.interceptors.request.use(config => {
// console.log('config ==> ', config);

if (config.method === 'post') {
//进行 data 参数序列化
if (config.data) {
let dataString = '';

      for (let key in config.data) {
        dataString += key + '=' + config.data[key] + '&'
      }

      config.data = dataString.slice(0, -1);

    }

}

return config;

}, err => {

return Promise.reject(err);
})

处理了 cookie 模块 vue-cookies
