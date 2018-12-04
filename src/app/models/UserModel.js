const Database = require('../../config/database');

function UserModel(){};

UserModel.prototype.findByLogin = findByLogin;

function findByLogin (login){
	Database.connect();
	return Database.query("SELECT codigo, login, senha FROM dw_usuario WHERE _sync_delete = 0 AND login = $1", [login]).then( result => { 
		Database.close();
		return !result.length ? null : result[0]; 
	});
}
	
module.exports = new UserModel();