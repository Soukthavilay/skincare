const Band = require('../models/bandModel');

const bandCtrl = {
    createBand: async (req, res) => {
        try {
            const { name ,logo} = req.body;
            // if (!logo)
            //     return res.status(400).json({ msg: "No pictures to upload" });
            const band = await Band.findOne({ name: name });
            if (band) {
                return res.status(400).json({ msg: "This band has already existed." });
            }
            const newBand = new Band({
                name: name,
                logo:logo
            });
            await newBand.save();
            res.json({ msg: "band created!", newBand });
            } catch (error) {
            res.status(500).json({ message: error.message });
            }
    },
    updateBand: async(req, res) => {
        try {
            const { bandId, name, logo } = req.body;
        
            // Find the band by its ID
            const band = await Band.findById(bandId);
        
            // Check if the band exists
            if (!band) {
                return res.status(404).json({ msg: 'Band not found' });
            }
        
            // Update the band's name and logo
            band.name = name;
            band.logo = logo;
        
            // Save the updated band
            await band.save();
        
            // Return the updated band
            res.json({ msg: 'Band updated', band });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getBand : async (req, res) =>{
        try {
            const band = await Band.find();
            res.json(band)
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = bandCtrl;