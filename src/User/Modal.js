const { DataTypes } = require("sequelize");
const sequelize = require("../DB/Db_config")

const User = sequelize.define('tbl_users', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    user_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_addr: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_mob: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_emr_mob: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_pass: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_conf_pass: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_Aadhar: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  
    user_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});


module.exports = User;
