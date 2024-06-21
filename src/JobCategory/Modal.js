const { DataTypes } = require("sequelize");
const sequelize = require("../DB/Db_config")

const JobCategory = sequelize.define('tbl_jobcategories', {
    jobcategory_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    jobcategory_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jobcategory_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});


module.exports = JobCategory;
