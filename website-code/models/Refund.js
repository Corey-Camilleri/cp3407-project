const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Refund', {
    Refund_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Payment_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Payment',
        key: 'Payment_ID'
      }
    },
    Amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Reason: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Status: {
      type: DataTypes.ENUM('REQUESTED','APPROVED','REJECTED','PROCESSED'),
      allowNull: false
    },
    Processed_At: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Refund',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Refund_ID" },
        ]
      },
      {
        name: "fk_Refund_Payment1_idx",
        using: "BTREE",
        fields: [
          { name: "Payment_ID" },
        ]
      },
    ]
  });
};
