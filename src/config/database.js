const pg = require('pg');
let pool;

module.exports = {
	connect: connect,
	query:  query,
	close:  close
}

function connect(){
	pool = new pg.Pool({
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		host: process.env.DATABASE_HOST,
		port: process.env.DATABASE_PORT,
		database: process.env.DATABASE_DATABASE
	});
}

function query(sql, params){
	return new Promise((resolve, reject) => {
		pool.query(sql, params || []).then((res) => {
			resolve(res.rows);
		})
		.catch((err) => {
			reject(err);
		});
    });
}

function close(){
	pool.end();
}