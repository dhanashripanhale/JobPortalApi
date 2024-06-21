const { request } = require("express");
const JobCategory = require("./Modal")

const index = async(req,res) => {
    try {
        const jobcategory = await JobCategory.findAll();
        res.json(jobcategory);

        
    } catch (error) {
        
    }
}


const store = async(req,res) => {
    try {
       const {jobcategory_name,jobcategory_status}=req.body;
    //   return console.log(state_name);
      await JobCategory.create({
        jobcategory_name,jobcategory_status
      });
      return res.status(200).json({message:'Job Category added successfully...',status:1})

    } catch (error) {
        console.log("error....");
    }
}


const show = async (req, res) => {
    try {
        const { id } = req.params;
        const jobcategory = await JobCategory.findByPk(id);
        if (!jobcategory) {
            return res.status(404).json({ error: "Job Category not found" });
        }
        res.json(jobcategory);
    } catch (error) {
        console.error("Error showing Job Category by id:", error);
        res.status(500).json({ error: "Error showing Job Category by id" });
    }
}


const updated = async (req, res) => {
    try {
        const { jobcategory_id, jobcategory_name, jobcategory_status } = req.body;
console.log(req.body);
        const jobcategory = await JobCategory.findByPk(jobcategory_id);
        if (!jobcategory) {
            return res.status(404).json({ error: "Job Category not found" });
        }

        await jobcategory.update({
            jobcategory_name,
            jobcategory_status,
        })
        return res.json({ message: "Job Category updated successfully!", status: 1 });
    } catch (error) {
        console.error("Error updating Job Category:", error);
        res.status(500).json({ error: "Error updating Job Category" });
    }
}

const deleted = async (req, res) => {
    try {
        const { id } = req.params;
        const jobcategory = await JobCategory.findByPk(id);
        if (!jobcategory) {
            return res.status(404).json({ error: "Job Category not found" });
        }
        await jobcategory.destroy();
        return res.json({ message: "Job Category deleted successfully!", status: 1 });
    } catch (error) {
        console.error("Error deleting Job Category:", error);
        res.status(500).json({ error: "Error deleting Job Category:" });
    }
}

module.exports = { index, store, show, updated, deleted };