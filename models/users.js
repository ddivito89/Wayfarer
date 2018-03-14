//Set up user table
module.exports = function(sequelize, DataTypes) {
    var users = sequelize.define("users", {
      username: {
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {len: [1,45]}
      },
      user_img: {
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {len:[1,45]}
      },
    });
    return users;
  };