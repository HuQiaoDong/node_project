//模型集合

//导入商家模型
const Business = require(__basename + '/db_connect/model/business.js');
// console.log('Business ==> ', Business);
const Code = require(__basename + '/db_connect/model/code.js');

module.exports = {
    Business,
    Code
}