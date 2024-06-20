const { request } = require("express");
const sequelize = require("../DB/Db_config");
const Taluka = require("./Modal");


const index = async (req, res) => {
    try {
      const taluka = await sequelize.query(
        `    SELECT * FROM tbl_talukas 
             INNER JOIN tbl_districts
             ON tbl_talukas.taluka_district = tbl_districts.district_id 
        `,
  
        {
          model: Taluka,
          mapToModel: true,
        }
      );
      res.json(taluka);
    } catch (error) {
      console.error("Error getting Taluka:", error);
      res.status(500).json({ error: "Error getting Taluka" });
    }
  };



  const store = async(req,res) => {
    try {
       const {taluka_name,taluka_district,taluka_status}=req.body;
    //   return console.log(taluka_name);
      await Taluka.create({
        taluka_name,taluka_district,taluka_status
      });
      return res.status(200).json({message:'Taluka added successfully...',status:1})

    } catch (error) {
        console.log("error....");
    }
}


const show = async (req, res) => {
    try {
        const { id } = req.params;
        const taluka = await Taluka.findByPk(id);
        if (!taluka) {
            return res.status(404).json({ error: "Taluka not found" });
        }
        res.json(taluka);
    } catch (error) {
        console.error("Error showing Taluka by id:", error);
        res.status(500).json({ error: "Error showing Taluka by id" });
    }
}


const updated = async (req, res) => {
    try {
        const { taluka_id, taluka_name,taluka_district,taluka_status } = req.body;

        const taluka = await Taluka.findByPk(taluka_id);
        if (!taluka) {
            return res.status(404).json({ error: "Taluka not found" });
        }

        await taluka.update({
            taluka_name,
            taluka_district,
            taluka_status,
        })
        return res.json({ message: "Taluka updated successfully!", status: 1 });
    } catch (error) {
        console.error("Error updating State:", error);
        res.status(500).json({ error: "Error updating State" });
    }
}

const deleted = async (req, res) => {
    try {
        const { id } = req.params;
        const taluka = await Taluka.findByPk(id);
        if (!taluka) {
            return res.status(404).json({ error: "Taluka not found" });
        }
        await taluka.destroy();
        return res.json({ message: "Taluka deleted successfully!", status: 1 });
    } catch (error) {
        console.error("Error deleting Taluka:", error);
        res.status(500).json({ error: "Error deleting Taluka:" });
    }
}

module.exports = { index, store, show, updated, deleted };