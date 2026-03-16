const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Category', {
    Category_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Menu_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Menu',
        key: 'Menu_ID'
      }
    },
    Name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Sort_Order: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Category',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Category_ID" },
        ]
      },
      {
        name: "fk_Category_Menu1_idx",
        using: "BTREE",
        fields: [
          { name: "Menu_ID" },
        ]
      },
    ]
  });
};
