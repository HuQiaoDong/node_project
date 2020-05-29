//数据库配置
exports.mysqlOptions = {
        // 数据库名称
        database: 'myserver',

        // 数据库用户名
        user: 'root',

        // 数据库密码
        password: 'As19980320',

        //数据地址
        host: 'localhost',

        // 数据库类型
        dialect: 'mysql',

        // 时区
        timezone: '+08:00',

        // 设置连接池
        pool: {

            // 最大连接数
            max: 10,

            // 最小连接数
            min: 0,

            //连接超时30s，自动释放
            acquire: 30000,

            // 闲置时间，10s自动释放
            idle: 10000
        }
    }
    //服务器配置
exports.serverOptions = {
    host: 'http://127.0.0.1',
    port: 9000
}

//加盐配置
exports.saltOptions = {
    //密码加盐
    psswordSalt: '_psw'
}

//token的过期时间
exports.tokenOptions = {
    expires: '5d',
    //token加盐
    tokenSalt: '_tk'
}