import { Model, DataTypes } from "sequelize";
import sequelize from "./index.mjs";
import Tags from "./tags.mjs";

class Books extends Model {
  // static associate({ Tags }) {
  //   this.belongsTo(Tags, { foreignKey: "bookId" });
  // }
}
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

// Books.hasMany(Tags);

export default Books;
