const express = require('express');

// 引用数据库相关


const app = express();


app.use(require('cors')())
app.use(express.json())

// 
require('./routes/admin')(app);
require('./plugins/db')(app);



app.listen(3000, function(){
    console.log('localhost:3000');
})