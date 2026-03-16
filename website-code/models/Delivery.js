const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Delivery', {
    Delivery_ID: {
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
    Driver_Person_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Driver',
        key: 'Person_ID'
      }
    },
    Status: {
      type: DataTypes.ENUM('ASSIGNED','PICKED_UP','IN_TRANSIT','DELIVERED','FAILED','CANCELLED'),
      allowNull: false
    },
    Pickup_Time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Dropoff_Time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Distance_KM: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    Estimated_Duration: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Delivery',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Delivery_ID" },
        ]
      },
      {
        name: "fk_Delivery_Order1_idx",
        using: "BTREE",
        fields: [
          { name: "Order_ID" },
        ]
      },
      {
        name: "fk_Delivery_Driver1_idx",
        using: "BTREE",
        fields: [
          { name: "Driver_Person_ID" },
        ]
      },
    ]
  });
};
