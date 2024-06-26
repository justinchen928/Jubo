const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "patients",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      formatted_created_at: {
        type: DataTypes.VIRTUAL,
        get() {
          return moment(this.getDataValue("created_at"))
            .tz("Asia/Taipei")
            .format("YYYY-MM-DD HH:mm:ss");
        },
      },
      formatted_updated_at: {
        type: DataTypes.VIRTUAL,
        get() {
          return moment(this.getDataValue("updated_at"))
            .tz("Asia/Taipei")
            .format("YYYY-MM-DD HH:mm:ss");
        },
      },
    },
    {
      tableName: "orders",
      timestamps: true,
      underscored: true,
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );

  Order.associate = function (models) {
    Order.belongsTo(models.Patient, {
      foreignKey: "patient_id",
      targetKey: "id",
      onDelete: "CASCADE",
    });
  };

  return Order;
};
