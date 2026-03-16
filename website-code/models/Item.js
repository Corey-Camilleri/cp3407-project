const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Item', {
    Item_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Restaurant_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Restaurant',
        key: 'Restaurant_ID'
      }
    },
    Name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Description: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Base_Price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Is_Available: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    Image_URL: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Item',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Item_ID" },
        ]
      },
      {
        name: "fk_Item_Restaurant1_idx",
        using: "BTREE",
        fields: [
          { name: "Restaurant_ID" },
        ]
      },
    ]
  });
};
