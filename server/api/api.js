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
    findData(modelName, condition, attrs, orderBy) {
            //modelName:模型名称,string
            //condition:查询条件,object
            //attrs:查询字段,array
            //orderBy: 排序, array ==> [排序的字段, 降序或者升序] ASC: 升序排序，DESC： 降序排序
            //offset: 偏移数据量, number
            //limit: 查询数据量, number
            console.log(orderBy);

            return model[modelName].findAll({
                where: condition,
                attributes: attrs,
                order: orderBy,
                // offset,
                // limit
            })
        }
        //更新数据
    updateData(modelName, values, condition) {
        //modelName: 模型名称, string
        //values: 需要设置的数据, object
        //condition: 条件, object
        return model[modelName].update(values, {
            where: condition
        });
    }
}
module.exports = new API();