const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Restaurant', {
    Restaurant_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Merchant_Person_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Merchant',
        key: 'Person_ID'
      }
    },
    Name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Phone: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Description: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Logo_URL: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Status: {
      type: DataTypes.ENUM('ACTIVE','INACTIVE','TEMP_CLOSED','SUSPENDED'),
      allowNull: false
    },
    Service_Radius_KM: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Restaurant',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Restaurant_ID" },
        ]
      },
      {
        name: "fk_Restaurant_Merchant1_idx",
        using: "BTREE",
        fields: [
          { name: "Merchant_Person_ID" },
        ]
      },
    ]
  });
};
