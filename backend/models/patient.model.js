const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define(
    "Patient",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
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
      tableName: "patients",
      timestamps: true,
      underscored: true,
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );

  Patient.associate = function (models) {
    Patient.hasMany(models.Order, {
      foreignKey: "patient_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });
  };

  return Patient;
};
