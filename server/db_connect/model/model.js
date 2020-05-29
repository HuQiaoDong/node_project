//模型集合

//导入商家模型
const Business = require(__basename + '/db_connect/model/business.js');

//导入邮箱验证码模型, 记录邮箱验证码
const Code = require(__basename + '/db_connect/model/code.js');

//导入商品类型模型，保存商品类型数据
const Type = require(__basename + '/db_connect/model/type.js');

module.exports = {
    Business,
    Code,
    Type
}