const Tag = require('./Tag');
const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');
const PostTags = require('./postTags');
const Note = require('./Note');



Tag.belongsToMany(Comment, {through: PostTags});

Comment.belongsTo(Tag, {through: PostTags});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.hasMany(Note, {
    foreignKey: 'post_id'
});

Note.belongsTo(Post, {
    foreignKey: 'post_id'
});

module.exports = { Tag, Comment, Post, User, PostTags, Note }