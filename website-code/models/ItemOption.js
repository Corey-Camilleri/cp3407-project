const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ItemOption', {
    Option_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Group_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Item_Option_Group',
        key: 'Group_ID'
      }
    },
    Name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Price_Delta: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Item_Option',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Option_ID" },
        ]
      },
      {
        name: "fk_Item_Option_Item_Option_Group1_idx",
        using: "BTREE",
        fields: [
          { name: "Group_ID" },
        ]
      },
    ]
  });
};
