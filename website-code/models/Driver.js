const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Driver', {
    Person_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Person',
        key: 'Person_ID'
      }
    },
    License_Number: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Vehicle_Type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Background_Check_Status: {
      type: DataTypes.ENUM('PENDING','APPROVED','REJECTED'),
      allowNull: false
    },
    Is_Online: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    Rating_Avg: {
      type: DataTypes.DECIMAL(3,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Driver',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Person_ID" },
        ]
      },
    ]
  });
};
