
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    user_img:{
      type: DataTypes.STRING
    }
  })
return User;
}
