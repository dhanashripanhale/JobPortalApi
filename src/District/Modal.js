const { DataTypes } = require("sequelize");
const sequelize = require("../DB/Db_config")

const District = sequelize.define('tbl_districts', {
    district_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    district_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    district_state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    district_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});


module.exports = District;
