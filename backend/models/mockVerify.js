'use strict';
const { TE, to } = require("../services/util.service");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MockVerify extends Model {
    static associate(models) {
    }
  }
  MockVerify.init({
    fn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ln: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    a: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sol: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ed: {
      allowNull: true,
      type: DataTypes.DATE,
    },
   
    pn: {
      type: DataTypes.DECIMAL(12, 0), // Precision 12, Scale 0 (no decimal places)
      allowNull: true,
    },
    ssn: {
      type: DataTypes.DECIMAL(12, 0), // Precision 12, Scale 0 (no decimal places)
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    in: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ecn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pn1: {
      type: DataTypes.DECIMAL(12, 0), // Precision 12, Scale 0 (no decimal places)
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zc: {
      type: DataTypes.DECIMAL(12, 6), // Up to 9 total digits, with 6 after the decimal point
      allowNull: true,
    },
    undlf: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ecn1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pn2: {
      type: DataTypes.DECIMAL(12, 0), // Precision 12, Scale 0 (no decimal places)
      allowNull: true,
    },
    l: {
      type: DataTypes.DECIMAL(12, 6), // Up to 9 total digits, with 6 after the decimal point
      allowNull: true,
    },
    l1: {
      type: DataTypes.DECIMAL(12, 6), // Up to 9 total digits, with 6 after the decimal point
      allowNull: true,
    },
    ttiawo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true, // Default to active (true)
    },
    bc: {
      type: DataTypes.ENUM('none', 'pass'), // Define the allowed values
      allowNull: true, // Optional: enforce that the field cannot be null
      defaultValue: 'none', // Optional: default value for the status
    },
    r: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sc: {
      type: DataTypes.ENUM('tpe', 'vc','hvsc','rc','cc','uc','fvsc'), // Define the allowed values
      allowNull: true, // Optional: enforce that the field cannot be null
      defaultValue: 'tpe', // Optional: default value for the status
    },
    fvsc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    uc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tpe: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hvsc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pv: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ev: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    btv: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thermal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    options:{
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tae: {
      type: DataTypes.JSON, // Array of strings
      allowNull: true,// Optional: enforce that the field cannot be null
      defaultValue: [], // Default to an empty array
    },
    toc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ed1: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    sr: {
      type: DataTypes.JSON, // Array of strings
      allowNull: true, // Optional: enforce that the field cannot be null
      defaultValue: [], 
    },
    in1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    unp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    uncf: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    toc1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ed2: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    toc2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ed3: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    tol: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ed4: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    thoth: {
      type: DataTypes.ENUM('tenh', 'thirtyh'), // Define the allowed values
      allowNull: true, // Optional: enforce that the field cannot be null
      defaultValue: 'tenh', // Optional: default value for the status
    },
    in2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    in3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    uncf1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    uncf2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    unlf: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tol1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ed5: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    tol2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ed6: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    tol3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ed7: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    in4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    in5: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    in6: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    unlf1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    unlf2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    unlf3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    t: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    t1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    s: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    in7: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ed8: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    in8: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ed9: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    ev: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    t2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pn3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ed10: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    pn4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ed11: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    in9: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ed12: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    c: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tae1: {
      type: DataTypes.JSON, // Array of strings
      allowNull: true,// Optional: enforce that the field cannot be null
      defaultValue: [], // Default to an empty array
    },
    tolcp: {
      type: DataTypes.ENUM('Yes', 'No'), // Define the allowed values
      allowNull: true, // Optional: enforce that the field cannot be null
      defaultValue: 'Yes', // Optional: default value for the status
    },
    p: {
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
    modelName: 'MockVerify',
    tableName: "mock_verifications",
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true,
    underscored: true
  });
  return MockVerify;
};