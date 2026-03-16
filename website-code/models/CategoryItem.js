const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CategoryItem', {
    Item_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Item',
        key: 'Item_ID'
      }
    },
    Category_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Category',
        key: 'Category_ID'
      }
    }
  }, {
    sequelize,
    tableName: 'Category_Item',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Item_ID" },
          { name: "Category_ID" },
        ]
      },
      {
        name: "fk_Item_has_Category_Category1_idx",
        using: "BTREE",
        fields: [
          { name: "Category_ID" },
        ]
      },
    ]
  });
};
