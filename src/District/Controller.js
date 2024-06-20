const { request } = require("express");
const District = require("./Modal");
const sequelize = require("../DB/Db_config");


const index = async (req, res) => {
    try {
        const district = await sequelize.query(
            `    SELECT * FROM tbl_districts 
             INNER JOIN tbl_states
             ON tbl_districts.district_state = tbl_states.state_id 
        `,

            {
                model: District,
                mapToModel: true,
            }
        );
        res.json(district);
    } catch (error) {
        console.error("Error getting District:", error);
        res.status(500).json({ error: "Error getting District" });
    }
};



const store = async (req, res) => {
    try {
        const { district_name, district_state, district_status } = req.body;
        //   return console.log(district_name);
        await District.create({
            district_name, district_state, district_status
        });
        return res.status(200).json({ message: 'District added successfully...', status: 1 })

    } catch (error) {
        console.log("error....");
    }
}


const show = async (req, res) => {
    try {
        const { id } = req.params;
        const district = await District.findByPk(id);
        if (!district) {
            return res.status(404).json({ error: "District not found" });
        }
        res.json(district);
    } catch (error) {
        console.error("Error showing District by id:", error);
        res.status(500).json({ error: "Error showing District by id" });
    }
}


const updated = async (req, res) => {
    try {
        // return console.log(req.body);
        const { district_id, district_name, district_state, district_status } = req.body;
        //  console.log(district_state);
        const district = await District.findByPk(district_id);

// return console.log(district);

        if (!district) {
            return res.status(404).json({ error: "District not found" });
        }

        await district.update({
            district_name: district_name,
            district_state: district_state,
            district_status: district_status,
        })
        return res.json({ message: "District updated successfully!", status: 1 });
    } catch (error) {
        console.error("Error updating State:", error);
        res.status(500).json({ error: "Error updating State" });
    }
}

const deleted = async (req, res) => {
    try {
        const { id } = req.params;
        const district = await District.findByPk(id);
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