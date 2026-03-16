const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Person', {
    Person_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    First_Name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Last_Name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: "Email_UNIQUE"
    },
    Phone: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Password_Hash: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Account_Status: {
      type: DataTypes.ENUM('ACTIVE','SUSPENDED','DEACTIVATED','BANNED'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Person',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Person_ID" },
        ]
      },
      {
        name: "Email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Email" },
        ]
      },
    ]
  });
};
