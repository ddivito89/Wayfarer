
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    subject: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    text: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    post_img: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    latitude: {
      type: DataTypes.DOUBLE
    },
    longitude: {
      type: DataTypes.DOUBLE
    },
  })
return Post;
}
