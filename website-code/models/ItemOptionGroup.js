const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ItemOptionGroup', {
    Group_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Item_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Item',
        key: 'Item_ID'
      }
    },
    Name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Min_Select: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Max_Select: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Item_Option_Group',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Group_ID" },
        ]
      },
      {
        name: "fk_Item_Option_Group_Item1_idx",
        using: "BTREE",
        fields: [
          { name: "Item_ID" },
        ]
      },
    ]
  });
};
