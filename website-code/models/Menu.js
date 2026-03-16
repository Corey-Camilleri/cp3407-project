const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Menu', {
    Menu_ID: {
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
    Is_Active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Menu',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Menu_ID" },
        ]
      },
      {
        name: "fk_Menu_Restaurant1_idx",
        using: "BTREE",
        fields: [
          { name: "Restaurant_ID" },
        ]
      },
    ]
  });
};
