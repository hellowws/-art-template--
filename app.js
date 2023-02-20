//引入http模块
const http = require('http')


// 引入router模块，相比之前的路由判断要清晰多了
const getRouter = require('router')
// 引入模板引擎
const template = require('art-template')
//引入path模块
const path = require('path')
//引入queryString模块处理post后的参数
const querystring = require('querystring')
//引入处理date模块
const moment = require('moment')
//导入静态资源处理模块
const serveStatic = require('serve-static')
//获取路由对象
const router = getRouter()

//实现静态资源服务
const serve=serveStatic(path.join(__dirname, 'public'))
 

//配置模板目录
template.defaults.root = path.join(__dirname,'views')
//配置模板变量
template.defaults.imports.moment = moment


//呈递学生档案添加信息页面
router.get('/add',(req,res)=>{
    let html = template('index.art',{

    })
    res.end(html)
})
//呈递学生档案信息页面
router.get('/list',async(req,res)=>{
    //查询学生信息
    let students = await Student.find()

    let html = template('list.art',{
        students:students
    })
    res.end(html)
})
//表单post请求返回数据
router.post('/add',async (req,res)=>{
    let formData = ''
    //req是指对请求进行处理
    req.on('data',param=>{
        formData += param
    })
    req.on('end',async ()=>{
        await Student.create(querystring.parse(formData))
        res.writeHead(301,{
            Location: '/list'
        })
        res.end()
    })
})

// 引入连接数据库模块以及
require('./model/connect')
const Student = require('./model/user')


//创建服务器
const app = http.createServer()
//当客户端访问服务器的时候
app.on('request',(req,res)=>{
    //给router传入req,res参数
    router(req,res,()=>{
        console.log('router被调用了')
    })
    //给静态资源处理服务传入req，res参数
    serve(req,res,()=>{
        console.log('处理资源完成')
    })
})

app.listen(3000)