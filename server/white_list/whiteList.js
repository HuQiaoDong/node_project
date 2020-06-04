module.exports = {

    // 请求域白名单
    hostList: 'http://192.168.0.102:8080',

    //验证邮箱验证码的路径
    mailList: '/register',

    //验证token
    tokenList: [
        '/addType',
        '/getType',
        '/searchType',
        '/typeStatus',
        '/type',
        '/typeRows',
        '/searchRows',
        '/userInfo',
        '/proType',
        '/postProduct',
        '/productStatus',
        '/productRows',
        '/productList',
        '/removeProduct',
        '/productByPid'
    ]
}