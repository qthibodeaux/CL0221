'use strict';
const { v4: uuid } = require('uuid');
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
    static associate({User, Story}) {
      // define association here
      this.belongsTo(User, {foreignKey:'ReadingListId'})
      this.hasMany(Story, {foreignKey:'story_id'})
    }
  };
  ReadingList.init({
    userId: DataTypes.INTEGER,
    storyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ReadingList',
  });
  ReadingList.beforeCreate(readingList => readingList.id = uuid())
  return ReadingList;
};