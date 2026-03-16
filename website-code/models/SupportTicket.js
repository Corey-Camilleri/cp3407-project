const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SupportTicket', {
    Ticket_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Admin_Person_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Admin',
        key: 'Person_ID'
      }
    },
    Customer_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Customer',
        key: 'Person_ID'
      }
    },
    Issue_Type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Status: {
      type: DataTypes.ENUM('OPEN','ASSIGNED','IN_PROGRESS','WAITING_FOR_CUSTOMER','RESOLVED','CLOSED'),
      allowNull: false
    },
    Resolved_At: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Support_Ticket',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Ticket_ID" },
        ]
      },
      {
        name: "fk_Support_Ticket_Admin1_idx",
        using: "BTREE",
        fields: [
          { name: "Admin_Person_ID" },
        ]
      },
      {
        name: "fk_Support_Ticket_Customer1_idx",
        using: "BTREE",
        fields: [
          { name: "Customer_ID" },
        ]
      },
    ]
  });
};
