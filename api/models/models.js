import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize.js";

class Tags extends Model {}
class Books extends Model {}

Books.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    pages: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Books",
    timestamps: false,
  }
);

Tags.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  { sequelize, modelName: "Tags" }
);

Books.belongsToMany(Tags, {
  through: "BookTags",
  as: "tags",
});

Tags.belongsToMany(Books, {
  through: "BookTags",
  as: "books",
});

export { Books, Tags };
