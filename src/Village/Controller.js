const { request } = require("express");
const Village = require("./Modal");
const sequelize = require("../DB/Db_config");



const index = async (req, res) => {
    try {
      const village = await sequelize.query(
        `    SELECT * FROM tbl_villages 
             INNER JOIN tbl_talukas
             ON tbl_villages.village_taluka = tbl_talukas.taluka_id 
        `,
  
        {
          model: Village,
          mapToModel: true,
        }
      );
      res.json(village);
    } catch (error) {
      console.error("Error getting Village:", error);
      res.status(500).json({ error: "Error getting Villsage" });
    }
  };



  const store = async(req,res) => {
    try {
       const {village_name,village_taluka,village_status}=req.body;
    //   return console.log(village_name);
      await Village.create({
        village_name,village_taluka,village_status
      });
      return res.status(200).json({message:'Village added successfully...',status:1})

    } catch (error) {
        console.log("error....");
    }
}


const show = async (req, res) => {
    try {
        const { id } = req.params;
        const village = await Village.findByPk(id);
        if (!village) {
            return res.status(404).json({ error: "Village not found" });
        }
        res.json(village);
    } catch (error) {
        console.error("Error showing Village by id:", error);
        res.status(500).json({ error: "Error showing Village by id" });
    }
}


const updated = async (req, res) => {
    try {
        const { village_id, village_name,village_taluka,village_status } = req.body;

        const village = await Village.findByPk(village_id);
        if (!village) {
            return res.status(404).json({ error: "Village not found" });
        }

        await village.update({
            village_name,
            village_taluka,
            village_status,
        })
        return res.json({ message: "Village updated successfully!", status: 1 });
    } catch (error) {
        console.error("Error updating State:", error);
        res.status(500).json({ error: "Error updating State" });
    }
}

const deleted = async (req, res) => {
    try {
        const { id } = req.params;
        const village = await Village.findByPk(id);
        if (!village) {
            return res.status(404).json({ error: "Village not found" });
        }
        await village.destroy();
        return res.json({ message: "Village deleted successfully!", status: 1 });
    } catch (error) {
        console.error("Error deleting Village:", error);
        res.status(500).json({ error: "Error deleting Village:" });
    }
}

module.exports = { index, store, show, updated, deleted };