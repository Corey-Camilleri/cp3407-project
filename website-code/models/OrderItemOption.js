const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OrderItemOption', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Order_Item_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Order_Item',
        key: 'Order_Item_ID'
      }
    },
    Option_Name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Price_Delta: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Order_Item_Option',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "fk_Order_Item_Option_Order_Item1_idx",
        using: "BTREE",
        fields: [
          { name: "Order_Item_ID" },
        ]
      },
    ]
  });
};
