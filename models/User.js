module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8],  // Passwords must be at least 8 characters long
        },
      },
    });
  
    User.associate = (models) => {
      // Associating User with Posts and Comments
      User.hasMany(models.Post, {
        foreignKey: 'userId',
        onDelete: 'CASCADE', 
      });
  
      User.hasMany(models.Comment, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    };
  
    return User;
  };
  