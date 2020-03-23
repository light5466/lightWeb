/*
	封装操作数据库的通用api
 */

const mysql = require('mysql');

exports.base = (sql,data,callback) => {
	// 创建数据库连接
	let connection = mysql.createConnection({
	  host     : 'localhost',//数据库所在的服务器的域名或者IP地址
	  user     : 'root',
	  password : '66326520',
	  database : 'test',//数据库名称
	  port : '3306'
	});
	 // 执行连接操作
	connection.connect();
	 // 操作数据库------查询
	connection.query(sql,data, function (error, results, fields) {
	  if (error) throw error;
	  callback(results);
	});
	 // 关闭数据库
	connection.end();
}