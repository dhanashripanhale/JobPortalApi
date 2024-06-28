const { request } = require("express");
const Job = require("./Modal");
const sequelize = require("../DB/Db_config");
const path = require("path");
const fs = require('fs');


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
        const { job_name, company_name, job_des, job_experience, job_salary, job_district, job_type, job_jobcategory, job_status } = req.body;
        let company_logo = null;

        // Check if company_logo file exists in request
        if (req.files && req.files.company_logo) {
            company_logo = req.files.company_logo;
            
            // Define upload path for company_logo
            const uploadPath = path.join(process.cwd(), 'public/images/company_logo', company_logo.name);

            // Move file asynchronously to uploadPath
            await company_logo.mv(uploadPath, (err) => {
                if (err) {
                    console.error('Error moving file:', err);
                    throw new Error('Error moving file.');
                }
            });
        }

        // Create job in database
        const newJob = await Job.create({
            job_name,
            company_name,
            company_logo: company_logo ? company_logo.name : null,
            job_des,
            job_experience,
            job_salary,
            job_district,
            job_type,
            job_jobcategory,
            job_status,
        });

        return res.status(200).json({ message: 'Job added successfully...', status: 1 });

    } catch (error) {
        console.error('Error in storing job:', error);
        return res.status(500).json({ message: 'Failed to store job.', status: 0 });
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
    try {
        const { job_id, job_name, company_name, job_des, job_experience, job_salary, district_id, job_type, jobcategory_id, job_status } = req.body;
        const job = await Job.findByPk(job_id);

        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        let company_logo = job.company_logo;

        // Check if new company_logo file exists in request
        if (req.files && req.files.company_logo) {
            const newLogo = req.files.company_logo;

            // Define upload path for new company_logo
            const uploadPath = path.join(process.cwd(), 'public/images/company_logo', newLogo.name);

            // Delete old company_logo if it exists
            if (company_logo) {
                const oldLogoPath = path.join(process.cwd(), 'public/images/company_logo', company_logo);
                fs.unlink(oldLogoPath, (err) => {
                    if (err) {
                        console.error('Error deleting old file:', err);
                    } else {
                        console.log('Old file deleted successfully');
                    }
                });
            }

            // Move new file asynchronously to uploadPath
            await newLogo.mv(uploadPath, (err) => {
                if (err) {
                    console.error('Error moving new file:', err);
                    throw new Error('Error moving new file.');
                }
            });

            // Update company_logo to new file name
            company_logo = newLogo.name;
        }

        await job.update({
            job_name: job_name,
            company_name: company_name,
            company_logo: company_logo,
            job_des: job_des,
            job_experience: job_experience,
            job_salary: job_salary,
            job_district: district_id,
            job_jobcategory: jobcategory_id,
            job_type: job_type,
            job_status: job_status,
        });

        return res.json({ message: "Job updated successfully!", status: 1 });
    } catch (error) {
        console.error("Error updating Job:", error);
        res.status(500).json({ error: "Error updating Job" });
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