module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
  
    Post.associate = (models) => {
      // Associating Post with User
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
      });
  
      // Associating Post with Comments
      Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        onDelete: 'CASCADE',
      });
    };
  
    return Post;
  };
  