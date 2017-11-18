module.exports = {
    doLogin: async(name, pwd) => {
        let data
        if (name == 'test' && pwd == '123') {
            data = {
            	code: 200,
            	data: {
            		title: "个人中心",
            		content: "欢迎进入个人中心"
            	}
            }
        } else {
            data = {
            	code: 201,
            	data: {
            		title: "登录失败",
            		content: "请输入正确的账号信息"
            	}
            }
        }
        return data;
    }
}