// import { Model } from "sequelize/types";
// let model = require(__basename + '/db_connect/model/model.js')
console.log('model ==> ', model);

class API {
    //添加数据
    createData(modelName, o) {
        //modelName:模型名称
        //o:创建的数据
        return model[modelName].create(o);
    }
    findData(modelName, condition, attrs) {
        //modelName:模型名称,string
        //condition:查询条件,object
        //attrs:查询字段,array
        return model[modelName].findAll({
            where: condition,
            attributes: attrs
        })
    }
}
module.exports = new API();