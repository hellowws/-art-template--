//连接数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/playground')
    .then(()=>{console.log('数据库连接成功')})
    .catch((err)=>{console.log(err)})