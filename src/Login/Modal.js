const { DataTypes } = require("sequelize");
const sequelize = require("../DB/Db_config")

const Login = sequelize.define('tbl_logins', {
  
    login_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
   
    user_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
 
});


module.exports = Login;
