const express = require('express');

// 引用数据库相关


const app = express();

app.set('secret', 'apcesk');

app.use(require('cors')())
app.use(express.json())
// 静态文件托管目录
app.use('/uploads', express.static(__dirname+'/uploads'));

// 
require('./routes/admin')(app);
require('./plugins/db')(app);
require('./routes/web')(app);


app.listen(3000, function(){
    console.log('localhost:3000');
})