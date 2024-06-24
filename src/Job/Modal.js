const { DataTypes } = require("sequelize");
const sequelize = require("../DB/Db_config")

const Job = sequelize.define('tbl_jobs', {
    job_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    job_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    job_jobcategory: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    job_des: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    job_salary: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    job_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    job_district: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    job_experience: {
        type: DataTypes.STRING,
        allowNull: false,
    },
   
    job_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});


module.exports = Job;
