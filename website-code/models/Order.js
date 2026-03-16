const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Order', {
    Order_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Customer_Person_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customer',
        key: 'Person_ID'
      }
    },
    Restaurant_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Restaurant',
        key: 'Restaurant_ID'
      }
    },
    Delivery_Address_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Address',
        key: 'Address_ID'
      }
    },
    Order_Status: {
      type: DataTypes.ENUM('PENDING','CONFIRMED','PREPARING','OUT_FOR_DELIVERY','DELIVERED','CANCELLED'),
      allowNull: false
    },
    Subtotal: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Tax: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Delivery_Fee: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Service_Fee: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Tip: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Total: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Order',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Order_ID" },
        ]
      },
      {
        name: "fk_Order_Customer1_idx",
        using: "BTREE",
        fields: [
          { name: "Customer_Person_ID" },
        ]
      },
      {
        name: "fk_Order_Restaurant1_idx",
        using: "BTREE",
        fields: [
          { name: "Restaurant_ID" },
        ]
      },
      {
        name: "fk_Order_Address1_idx",
        using: "BTREE",
        fields: [
          { name: "Delivery_Address_ID" },
        ]
      },
    ]
  });
};
