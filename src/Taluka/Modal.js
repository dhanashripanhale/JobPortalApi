const { DataTypes } = require("sequelize");
const sequelize = require("../DB/Db_config");

const Taluka = sequelize.define('tbl_talukas', {
    taluka_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    taluka_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    taluka_district: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    taluka_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});


module.exports = Taluka;
