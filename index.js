/*
	图书管理系统---入口文件
 */

const express = require('express');
const tp = require('art-template');
const bp = require('body-parser');
const router = require('./router.js');
const path = require('path');
const app = express();

//	1.设置模板引擎
//	
//	静态化我们的public文件下的文件，使其可以直接引用
   //app.use(express.static(path.join(__dirname, 'views')));
//设置模板路径
app.set('views',path.join(__dirname,'views'));
// 设置模板引擎
app.set('view engine','html');
//使express兼容art-template 模板引擎
app.engine('html',require('express-art-template'));

//处理请求参数
//挂载参数处理中间件post
app.use(bp.urlencoded({extended: false}));
//处理json格式的参数
app.use(bp.json());

//	2.启动服务器功能
// a.配置路由
app.use(router);
// b.监听端口
app.listen(4000,()=>{
	console.log('running......');
});