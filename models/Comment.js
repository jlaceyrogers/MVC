module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
  
    Comment.associate = (models) => {
      // Associating Comment with User
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
      });
  
      // Associating Comment with Post
      Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
      });
    };
  
    return Comment;
  };
  