//引入http模块
const http = require('http')
//创建服务器
const app = http.createServer()
//当客户端访问服务器的时候
app.on('request',(re1,res)=>{
    res.end('ok')
})

app.listen(3000)