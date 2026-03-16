const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OrderStatusHistory', {
    History_ID: {
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
    Status: {
      type: DataTypes.ENUM('PLACED','CONFIRMED','PREPARING','READY_FOR_PICKUP','OUT_FOR_DELIVERY','DELIVERED','CANCELLED','REFUNDED'),
      allowNull: false
    },
    Changed_At: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Changed_By_Person_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Person',
        key: 'Person_ID'
      }
    }
  }, {
    sequelize,
    tableName: 'Order_Status_History',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "History_ID" },
        ]
      },
      {
        name: "fk_Order_Status_History_Order1_idx",
        using: "BTREE",
        fields: [
          { name: "Order_ID" },
        ]
      },
      {
        name: "fk_Order_Status_History_Person1_idx",
        using: "BTREE",
        fields: [
          { name: "Changed_By_Person_ID" },
        ]
      },
    ]
  });
};
