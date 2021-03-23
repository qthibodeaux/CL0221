'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReadingList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ReadingList.init({
    userId: DataTypes.INTEGER,
    storyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ReadingList',
  });
  return ReadingList;
};