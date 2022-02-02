import { Model, DataTypes } from "sequelize";
import sequelize from "./index.mjs";

class Tags extends Model {
  //   static associate({ Books }) {
  //     this.belongsTo(Books, { foreignKey: "bookId" });
  //   }
}

Tags.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  { sequelize, modelName: "Tags" }
);

export default Tags;
