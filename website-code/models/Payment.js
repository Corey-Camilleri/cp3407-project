const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Payment', {
    Payment_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Order_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Order',
        key: 'Order_ID'
      }
    },
    Provider: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Provider_Transaction_ID: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Currency: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Status: {
      type: DataTypes.ENUM('PENDING','AUTHORIZED','PAID','FAILED','REFUNDED','PARTIALLY_REFUNDED'),
      allowNull: false
    },
    Paid_At: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Payment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Payment_ID" },
        ]
      },
      {
        name: "fk_Payment_Order1_idx",
        using: "BTREE",
        fields: [
          { name: "Order_ID" },
        ]
      },
    ]
  });
};
