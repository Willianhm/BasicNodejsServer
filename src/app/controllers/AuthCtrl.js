const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const timeoutJWT = 300; // expires in 5min

function AuthCtrl(){};

AuthCtrl.prototype.login = login;
AuthCtrl.prototype.logout = logout;
AuthCtrl.prototype.isAuthenticate = isAuthenticate;

function login (req, res, next){
	UserModel.findByLogin(req.body.user).then( user => {
		if(!user){
			res.status(500).send({ error: 'Usuário não encontrado.' });
		}else{
			if(user.senha != req.body.pwd){
				res.status(500).send({ error: 'Senha incorreta.' });
			}else{
				const token = jwt.sign({ id: user.codigo, login: user.login }, process.env.SECRET, {
				  expiresIn: timeoutJWT 
				});
				res.status(200).send({ auth: true, token: token });
			}			
		}
	});
}

function logout (req, res, next){
	res.status(200).send({ auth: false, token: null });
}

// verifyJWT
function isAuthenticate (req, res, next){
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
  });
}

module.exports = new AuthCtrl();