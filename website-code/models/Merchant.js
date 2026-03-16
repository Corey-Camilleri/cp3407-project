const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Merchant', {
    Person_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Person',
        key: 'Person_ID'
      }
    },
    Business_Name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Business_Type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Tax_ID: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Approval_Status: {
      type: DataTypes.ENUM('PENDING','APPROVED','REJECTED','SUSPENDED'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Merchant',
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
    ]
  });
};
