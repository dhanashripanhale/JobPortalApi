const { request } = require("express");
const State = require("./Modal")

const index = async(req,res) => {
    try {
        const states = await State.findAll();
        res.json(states);

        
    } catch (error) {
        
    }
}


const store = async(req,res) => {
    try {
       const {state_name,state_status}=req.body;
    //   return console.log(state_name);
      await State.create({
        state_name,state_status
      });
      return res.status(200).json({message:'State added successfully...',status:1})

    } catch (error) {
        console.log("error....");
    }
}


const show = async (req, res) => {
    try {
        const { id } = req.params;
        const state = await State.findByPk(id);
        if (!state) {
            return res.status(404).json({ error: "State not found" });
        }
        res.json(state);
    } catch (error) {
        console.error("Error showing State by id:", error);
        res.status(500).json({ error: "Error showing State by id" });
    }
}


const updated = async (req, res) => {
    try {
        const { state_id, state_name, state_status } = req.body;
console.log(req.body);
        const state = await State.findByPk(state_id);
        if (!state) {
            return res.status(404).json({ error: "State not found" });
        }

        await state.update({
            state_name,
            state_status,
        })
        return res.json({ message: "State updated successfully!", status: 1 });
    } catch (error) {
        console.error("Error updating State:", error);
        res.status(500).json({ error: "Error updating State" });
    }
}

const deleted = async (req, res) => {
    try {
        const { id } = req.params;
        const state = await State.findByPk(id);
        if (!state) {
            return res.status(404).json({ error: "State not found" });
        }
        await state.destroy();
        return res.json({ message: "State deleted successfully!", status: 1 });
    } catch (error) {
        console.error("Error deleting State:", error);
        res.status(500).json({ error: "Error deleting State:" });
    }
}

module.exports = { index, store, show, updated, deleted };