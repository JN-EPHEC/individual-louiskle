import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Course extends Model {}

Course.init(
  {
    titre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Course",
  }
);

export default Course;
