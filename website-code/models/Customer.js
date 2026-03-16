const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Customer', {
    Person_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Person',
        key: 'Person_ID'
      }
    },
    Default_Address_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Address',
        key: 'Address_ID'
      }
    },
    Loyalty_Points: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Preferred_Payment_Method: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Customer',
    timestamps: false,
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
        name: "fk_Customer_Default_Address1",
        using: "BTREE",
        fields: [
          { name: "Default_Address_ID" },
        ]
      },
    ]
  });
};
