const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Manager extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Manager.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        len: [4],
      },
    },
  },
  {
    hooks: {
      async beforeCreate(newManagerData) {
        newManagerData.password = await bcrypt.hash(
          newManagerData.password,
          10
        );
        return newManagerData;
      },

      async beforeUpdate(updatedManagerData) {
        updatedManagerData.password = await bcrypt.hash(
          updatedManagerData.password,
          10
        );
        return updatedManagerData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "manager",
  }
);

module.exports = Manager;
