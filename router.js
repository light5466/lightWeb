/*
	路由模块
*/

const express = require('express');
const router = express.Router();
const service = require('./service.js');

//路由处理
//渲染主页面
router.get('/',service.showIndex);
// 提交登录
router.post('/login',service.login);



// 添加图书页面
router.get('/add',service.add);

// 加入图书
router.post('/addBook',service.addBook);

// 跳转到编辑页面
router.get('/edit',service.edit);

// 编辑提交图书
router.post('/editBook',service.editBook);

// 删除操作
router.get('/delete',service.delete);

module.exports = router;