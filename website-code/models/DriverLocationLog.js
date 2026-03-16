const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DriverLocationLog', {
    Log_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Driver_Person_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Driver',
        key: 'Person_ID'
      }
    },
    Lat: {
      type: DataTypes.DECIMAL(9,6),
      allowNull: true
    },
    Lng: {
      type: DataTypes.DECIMAL(9,6),
      allowNull: true
    },
    Timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Driver_Location_Log',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Log_ID" },
        ]
      },
      {
        name: "fk_Driver_Location_Log_Driver1_idx",
        using: "BTREE",
        fields: [
          { name: "Driver_Person_ID" },
        ]
      },
    ]
  });
};
