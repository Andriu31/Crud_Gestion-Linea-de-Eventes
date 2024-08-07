import { DataTypes } from "sequelize";
import { sequelize } from '../DB/conexion.js';
import { CategoriaModel } from "./CategoriaModel.js";
export const EventoModel = sequelize.define(
    "eventos",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        evento: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hora: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        timestamps: false,
    }
);

CategoriaModel.hasMany(EventoModel, {as: 'eventos', foreignKey: "categoria_id"})
EventoModel.belongsTo(CategoriaModel, {as: 'categoria',foreignKey: "categoria_id"})
