const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken-promisified')
const {secret} = require('./config')

const generateAccessToken = (id, role) => {
    const payload = {
        id, 
        role
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
    async registration(req, res) {
        try {
            const {username, pwd, role, imageSrc} = req.body
            console.log('Данные приняты', {username, pwd, role, imageSrc})
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
            }
            const hashPwd = bcrypt.hashSync(pwd, 7) 
            const userRole = await Role.findOne({value: 'User'}) || await Role.findOne({value: 'Admin'})
            
            // if (!userRole) {
            //     const newRole = new Role({ value: 'Admin' });
            //     await newRole.save();
            // }
            const user = new User({username: username, password: hashPwd, role: role, image: imageSrc}) 
            console.log("Отправляем запрос на mongoDB: ", user, userRole);
            await user.save()
            
            return res.json({message: 'Пользователь зарегистрирован!'})
        } catch(e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async auth(req, res) {
        try {
            const {username, pwd} = req.body
            const user = await User.findOne({username})
            if (!user) {
                console.log('Пользователь с таким именем не найден')
                return res.status(400)
            }
            const validPassword = bcrypt.compareSync(pwd, user.password);

            if (!validPassword) {
                console.log('Введен неверный пароль')
                return res.status(400)
            }
            const token = generateAccessToken(user._id, user.role)
            console.log("Пользователь авторизирован с токеном", {token}, user)
            return res.json({
                token,
                username: user.username,
                role: user.role,
                image: user.image,
            });
        } catch(e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch(e) {
            
        }
    }
}

module.exports = new authController()