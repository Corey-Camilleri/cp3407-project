const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Rating', {
    Rating_ID: {
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
    Customer_Person_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customer',
        key: 'Person_ID'
      }
    },
    Comment: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Rating',
    timestamps: true,
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
        name: "fk_Rating_Customer1_idx",
        using: "BTREE",
        fields: [
          { name: "Customer_Person_ID" },
        ]
      },
      {
        name: "fk_Rating_Order1_idx",
        using: "BTREE",
        fields: [
          { name: "Order_ID" },
        ]
      },
    ]
  });
};
