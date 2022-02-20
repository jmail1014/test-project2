const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Employee extends Model {
  static(body, models) {
    return models.Manager.create({
      id: body.id,
      case_id: body.id,
    }).then(() => {
      return Employee.findOne({
        where: {
          id: body.case_id,
        },
        attributes: ["id", "manager_id", "last_day", "symptom_start"],
        include: [
          {
            include: {
              model: models.manager,
              attributes: ["id"],
            },
          },
        ],
      });
    });
  }
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    manager_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "manager",
        key: "id",
      },
    },
    last_day: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    symptom_start: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "employee",
  }
);

module.exports = Employee;
