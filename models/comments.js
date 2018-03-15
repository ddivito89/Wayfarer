//Set up comments table
module.exports = function(sequelize, DataTypes) {
  var comments = sequelize.define("comments", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 45]
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 11]
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 11]
      }
    }
  }, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false
  });
  return comments;
};
