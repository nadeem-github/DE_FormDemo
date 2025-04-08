'use strict';
const { TE, to } = require("../services/util.service");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VertualRem extends Model {
    static associate(models) {
    }
  }
  VertualRem.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tribute_memory: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tribute_message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    regiment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rem_symbol: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
    }
  },
    {
    sequelize,
    modelName: 'VertualRem',
    tableName: "vertual_rems",
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true,
    underscored: true
  });
  return VertualRem;
};