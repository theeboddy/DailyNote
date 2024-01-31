const Post = require('./models/Post')

class postController {
    async posts(req, res) {
        try {
            const {title, body, image, id, comments, author} = req.body
            console.log('заголовок и боди:', title, body)
            if (image == null) {
                return res.status(422).json({message: 'Вы не выбрали изображение'})
            }
            if (!title) {
                return res.status(422).json({message: 'Вы не ввели название'})
            }
            if (!body) {
                return res.status(422).json({message: 'Вы не ввели содержание записи'})
            }
            const post = new Post({title: title, body: body, image: image, id: id, comments: comments, username: author})
            await post.save()
            console.log('Пост зарегестрирован в базу данных!', post.title, post.body, post.id, post.comments, post.author)
            return res.status(200)
        } catch(e) {

        }
    }

    async getPosts(req, res) {
        try {
            const posts = await Post.find().populate('comments');
            return res.status(200).json(posts);
        } catch (e) {
            console.log(e);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deletePost(req, res) {
        try {
            const postId = req.params.id
            await Post.findOneAndDelete({id: postId})
            console.log(`Пост с id ${postId} удален из базы данных`);
            return res.status(200)
        } catch(e) {
            console.log(e);
            return res.status(500)
        }
    }

    async getPostById(req, res) {
        try {
            const postId = req.params.id;
            const post = await Post.findOne({ id: postId }).populate('comments');
    
            if (!post) {
                return res.status(404).json({ message: 'Пост не найден' });
            }
    
            return res.status(200).json({ post });
        } catch (e) {
            console.error('Ошибка при получении поста по id:', e);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async addComment(req, res) {
        try {
            const postId = req.params.postId;
            const { username, role, image, body } = req.body;

            const post = await Post.findOne({ id: postId });

            if (!post) {
                return res.status(404).json({ message: 'Пост не найден' });
            }
            post.comments.push({
                username: username,
                role: role,
                image: image,
                body: body
            });

            await post.save();

            return res.status(200).json({ post });
        } catch (e) {
            console.error('Ошибка при добавлении комментария:', e);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getComments(req, res) {
        try {
            const postId = req.params.postId;

           
            const post = await Post.findOne({ id: postId }).populate('comments');

            if (!post) {
                return res.status(404).json({ message: 'Пост не найден' });
            }

            return res.status(200).json({ comments: post.comments });
        } catch (e) {
            console.error('Ошибка при получении комментариев:', e);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new postController()