module.exports = {
    doLogin: async(name, pwd) => {
        let data
        if (name == 'test' && pwd == '123') {
            data = `Hello, ${name}!`
        } else {
            data = '用户名或密码错误'
        }
        return data;
    }
}