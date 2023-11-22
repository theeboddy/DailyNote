const {Schema, model} = require('mongoose')

const Comment = new Schema({
    username:{type:String, ref: 'User'},
    role: {type: String, ref: 'User'},
    image: {type: Object, required: true, ref:'User'},
    body: {type: String, required: true}
})

module.exports = model('Comment', Comment)