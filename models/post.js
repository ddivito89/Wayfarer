//Set up post table
module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {len: [1,45]}
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {len: [1,45]}
      },
      post_img: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {len: [1,45]}
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {len: [1,45]}
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {len: [1,45]}
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {len: [1,45]}
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {len: [1,45]}
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {len: [1,45]}
      },
    }, {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false
    });
    return Post;
  };
