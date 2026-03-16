const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DriverRating', {
    Rating_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Rating',
        key: 'Rating_ID'
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
    Score: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    Order_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Order',
        key: 'Order_ID'
      },
      unique: "fk_Driver_Rating_Order1"
    }
  }, {
    sequelize,
    tableName: 'Driver_Rating',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Rating_ID" },
        ]
      },
      {
        name: "Driver_Rating_Order_ID_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Order_ID" },
        ]
      },
      {
        name: "fk_Driver_Rating_Rating1_idx",
        using: "BTREE",
        fields: [
          { name: "Rating_ID" },
        ]
      },
      {
        name: "fk_Driver_Rating_Driver1_idx",
        using: "BTREE",
        fields: [
          { name: "Driver_Person_ID" },
        ]
      },
    ]
  });
};
