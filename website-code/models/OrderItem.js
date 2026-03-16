const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OrderItem', {
    Order_Item_ID: {
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
    Item_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Item',
        key: 'Item_ID'
      }
    },
    Item_Name_Snapshot: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Unit_Price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Notes: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Order_Item',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Order_Item_ID" },
        ]
      },
      {
        name: "fk_Order_Item_Order1_idx",
        using: "BTREE",
        fields: [
          { name: "Order_ID" },
        ]
      },
      {
        name: "fk_Order_Item_Item1_idx",
        using: "BTREE",
        fields: [
          { name: "Item_ID" },
        ]
      },
    ]
  });
};
