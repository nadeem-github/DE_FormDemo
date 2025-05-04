'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AssetMap extends Model {
    static associate(models) {
    }
  }
  AssetMap.init({
    station_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    port_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false,
    },
    lng: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false,
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
    }
  },
    {
      sequelize,
      modelName: 'AssetMap',
      tableName: "asset_maps",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });
  return AssetMap;
};