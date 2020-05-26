// 连接mysql数据库
const Sequelize = require('sequelize');

//配置数据库
// const sequelize = new Sequelize('myserver', 'root', 'As19980320', {
//     host: 'localhost',
//     dialect: 'mysql',
// });
module.exports = new Sequelize(config.mysqlOptions.database, config.mysqlOptions.user, config.mysqlOptions.password, {

    // 数据库地址
    host: config.mysqlOptions.host,

    // 数据库类型
    dialect: config.mysqlOptions.dialect,

    // 时区
    timezone: config.mysqlOptions.timezone,
    pool: config.mysqlOptions.pool
        // {
        //     // 最大连接数
        //     max: 10,

    //     // 最小连接数
    //     min: 0,

    //     //连接超时30s，自动释放
    //     acquire: 30000,

    //     // 闲置时间，10s自动释放
    //     idle: 10000
    // }
});