/*
	业务模块
 */
const data = require('./data.json');
const path = require('path');
const fs = require('fs');
const db = require('./db.js');

// 计算图书编号
/*let maxBookId = ()=>{
	let arr = [];
	data.forEach((item)=>{
		arr.push(item.id);
	});
	return Math.max.apply(null,arr);
}*/

//渲染主页面
exports.showIndex = (req,res)=>{
	/*let sql = `select * from book`;
	db.base(sql,null,(results)=>{
		res.render('index',{list: results});
	});*/
	res.render('login',{});
	//res.render('index',{list: data});	//data = {list : data}
}

// 登录实现
exports.login = (req,res)=>{
	let flag = req.body.flag;
	let name = req.body.name;
	let password = req.body.password;
	if (flag == 1) {
		// 管理员
		let sql = `select adminPassword from adminTable where adminName = ?`;
		let data = [name];
		db.base(sql,data,(results)=>{
			if (results.adminPassword == password) {
				res.render('adminindex',{list: results});
			}else{
				res.render('login',{list: "密码或用户名错误"});
			}
			
		});
	}else if (flag == 2) {
		// 用户
		let sql = `select userPassword from userTable where userName = ?`;
		let data = [name];
		db.base(sql,data,(results)=>{
			if (results.userPassword == password) {
				res.render('userindex',{list: results});
			}else{
				res.render('login',{list: "密码或用户名错误"});
			}
		});
	}	
}

// 添加图书
exports.add = (req,res)=>{
	res.render('add',{});
}

// 加入图书
exports.addBook = (req,res)=>{
	let info = req.body;
	let book = {};
	for(let key in info) {
		book[key] = info[key];
	}

	let sql = `insert into book set ?`;
	db.base(sql,book,(results)=>{
		if (results.affectedRows == 1) {
			res.redirect('/');
		}
	});
	/*book.id = maxBookId() + 1;
	data.push(book);

	// 把内存中的数据写入文件
	fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(data),(err)=>{
		if (err) {
			console.log('server error!');
		}
		// 成功则跳入主页面
		res.redirect('/');	//重定向
	});*/
}

// 修改图书
exports.edit = (req,res)=>{
	let id = req.query.id;
	let sql = `select * from book where id=?`;
	let data = [id];
	db.base(sql,data,(results)=>{
		res.render('edit',results[0]);
	});
	/*let book = {};
	data.forEach((item)=>{
		if (id == item.id) {
			book = item;
			return;
		}
	});
	res.render('edit',book);*/
}

//编辑提交图书
exports.editBook = (req,res)=>{
	let info = req.body;

	let sql = `update book set name=?,author=?,category=?,description=? where id=?`;
	let data = [info.name,info.author,info.category,info.description,info.id];
	db.base(sql,data,(results)=>{
		if (results.affectedRows == 1) {
			res.redirect('/');
		}
	});
	/*data.forEach((item)=>{
		if (info.id == item.id) {
			for(let key in info){
				item[key] = info[key];
			}
		}
	});
	// 把内存中的数据写入文件
	fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(data),(err)=>{
		if (err) {
			console.log('server error!');
		}
		// 成功则跳入主页面
		res.redirect('/');	//重定向
	});*/
}

//删除操作
exports.delete = (req,res)=>{
	let id = req.query.id - 1;
	let sql = `delete from book where id=?`;
	let data = [id];
	db.base(sql,data,(results)=>{
		if (results.affectedRows == 1) {
			res.redirect('/');
		}
	});
	/*data.splice(id,1);

	//让id重新排序
	for (var i = 0; i < data.length; i++) {
		data[i].id = i + 1;
	}
	// 把内存中的数据写入文件
	fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(data,null,4),(err)=>{
		if (err) {
			console.log('server error!');
		}
		// 成功则跳入主页面
		res.redirect('/');	//重定向
	});*/
}