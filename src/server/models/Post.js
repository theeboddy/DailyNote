const {Schema, model} = require('mongoose')

const Comment = new Schema({
    username:{type:String, ref: 'User'},
    role: {type: String, ref: 'User'},
    image: {type: Object, required: true, ref:'User'},
    body: {type: String, required: true}
})

const Post = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    image: {type: Object, required: true},
    id: {type: Number, unique:true, required: true},
    username: {type: String, required: true, ref: 'User'},
    comments: [Comment]
})

module.exports = model('Post', Post)