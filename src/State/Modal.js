const { DataTypes } = require("sequelize");
const sequelize = require("../DB/Db_config")

const State = sequelize.define('tbl_states', {
    state_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    state_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});


module.exports = State;
