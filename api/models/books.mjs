import { Model, DataTypes } from "sequelize";
import sequelize from "./index.mjs";

class Books extends Model {}
Books.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING },
    author: { type: DataTypes.STRING },
    pages: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    modelName: "Books",
    timestamps: false,
  }
);

export default Books;
