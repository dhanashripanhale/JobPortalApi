const { DataTypes } = require("sequelize");
const sequelize = require("../DB/Db_config");

const Village = sequelize.define('tbl_villages', {
    village_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    village_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    village_taluka: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    village_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});


module.exports = Village;
