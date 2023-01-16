const Tag = require('./Tag');
const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');l


Post.hasOne(Tag, {through: postTags});

Post.hasMany(Comment, {
    foreignKey: 'id'
});

Comment.belongsTo(Post, {
    foreignKey: 'id'
});

Tag.belongsTo(Post, {
    foreignKey: 'id'
});

User.hasMany(Post, {
    foreignKey: 'id'
});

Post.belongsTo(User, {
    foreignKey: 'id'
});