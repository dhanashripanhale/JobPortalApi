const { request } = require("express");
const Job = require("./Modal");
const sequelize = require("../DB/Db_config");


const index = async (req, res) => {
    try {
        const job = await sequelize.query(
            `    SELECT * FROM tbl_jobs j
             LEFT JOIN tbl_jobcategories jc ON j.job_jobcategory = jc.jobcategory_id 
             LEFT JOIN tbl_districts d ON j.job_district = d.district_id 
             
           
        `,
            {
                model: Job,
                mapToModel: true,
            }
        );
        res.json(job);
    } catch (error) {
        console.error("Error getting Job:", error);
        res.status(500).json({ error: "Error getting Job" });
    }
};



const store = async (req, res) => {
    try {
        const { job_name,company_name,job_des,job_experience,job_salary,job_district, job_type,job_jobcategory, job_status } = req.body;
        //   return console.log(district_name);
        await Job.create({
            job_name,company_name,job_des,job_experience,job_salary,job_district,job_type, job_jobcategory, job_status
        });
        return res.status(200).json({ message: 'Job added successfully...', status: 1 })

    } catch (error) {
        console.log("error....");
    }
}


const show = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findByPk(id);
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }
        res.json(job);
    } catch (error) {
        console.error("Error showing Job by id:", error);
        res.status(500).json({ error: "Error showing JOb by id" });
    }
}


const updated = async (req, res) => {
    // console.log(rejob
    try {
        const { job_id, job_name,company_name,job_des,job_experience,job_salary,district_id,job_type,jobcategory_id, job_status } = req.body;
        const job = await Job.findByPk(job_id);


        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        await job.update({
            job_name: job_name,
            company_name:company_name,
            job_des:job_des,
            job_experience:job_experience,
            job_salary:job_salary,
            job_district:district_id,
            job_jobcategory: jobcategory_id,
            job_type:job_type,
            job_status: job_status,
        })
        return res.json({ message: "Job updated successfully!", status: 1 });
    } catch (error) {
        console.error("Error updating JOb:", error);
        res.status(500).json({ error: "Error updating JOb" });
    }
}

const deleted = async (req, res) => {
    try {
        const { id } = req.params;
        const district = await Job.findByPk(id);
        if (!district) {
            return res.status(404).json({ error: "District not found" });
        }
        await district.destroy();
        return res.json({ message: "District deleted successfully!", status: 1 });
    } catch (error) {
        console.error("Error deleting District:", error);
        res.status(500).json({ error: "Error deleting District:" });
    }
}

module.exports = { index, store, show, updated, deleted };