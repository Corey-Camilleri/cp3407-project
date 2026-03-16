const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RestaurantRatingId', {
    Rating_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Rating',
        key: 'Rating_ID'
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
      unique: "fk_Restaurant_Rating_ID_Order1"
    }
  }, {
    sequelize,
    tableName: 'Restaurant_Rating_ID',
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
        name: "Restaurant_Rating_Order_ID_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Order_ID" },
        ]
      },
      {
        name: "fk_Restaurant_Rating_Rating1_idx",
        using: "BTREE",
        fields: [
          { name: "Rating_ID" },
        ]
      },
      {
        name: "fk_Restaurant_Rating_ID_Restaurant1_idx",
        using: "BTREE",
        fields: [
          { name: "Restaurant_ID" },
        ]
      },
    ]
  });
};
