const sequelize = require('../config/connection');
const { Comment, Post,  PostTags, Tag, User } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');
const postTagData = require('./postTagData.json');
const tagData = require('./tagData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const post = await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  const comment = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  const tags = await Tag.bulkCreate(tagData, {
    individualHooks: true,
    returning: true,
  });

  const postTags = await PostTags.bulkCreate(postTagData, {
    individualHooks: true,
    returning: true,
  });
  
  process.exit(0);
};

seedDatabase();