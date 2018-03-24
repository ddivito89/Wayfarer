//Set up post table
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 250]
      }
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 250]
      }
    },
    post_img: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 99]
      }
    },
    categories: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 250]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 250]
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 250]
      }
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 250]
      }
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 250]
      }
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 250]
      }
    }
  }, {
    freezeTableName: true
  });
  return Post;
};
