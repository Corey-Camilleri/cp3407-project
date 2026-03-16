const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Address', {
    Address_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Person_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Person',
        key: 'Person_ID'
      }
    },
    Address_Type: {
      type: DataTypes.ENUM('CUSTOMER','RESTAURANT'),
      allowNull: true
    },
    Street: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    City: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    State: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Zip: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Lat: {
      type: DataTypes.DECIMAL(9,6),
      allowNull: true
    },
    Lng: {
      type: DataTypes.DECIMAL(9,6),
      allowNull: true
    },
    Instructions: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Address',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Address_ID" },
        ]
      },
      {
        name: "fk_Address_Person1_idx",
        using: "BTREE",
        fields: [
          { name: "Person_ID" },
        ]
      },
    ]
  });
};
