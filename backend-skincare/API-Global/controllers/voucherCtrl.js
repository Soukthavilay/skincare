const Voucher = require('../models/voucherModel');

const voucherCtrl = {
    createVoucher : async (req, res)=>{
        try {
            const { code, discountPercentage, applicableCategory, expirationDate, description, conditions,priceConditions } = req.body;
            const existingVoucher = await Voucher.findOne({ code });
            if (existingVoucher) {
                return res.status(400).json({ msg: 'Voucher code already exists' });
            }
            const newVoucher = new Voucher({
                code,
                discountPercentage,
                applicableCategory,
                expirationDate,
                description,
                conditions,
                priceConditions,
            });
            await newVoucher.save();
            res.json({ msg: 'Voucher created', voucher: newVoucher });
        } catch (error) {
            return res.status(500).json({ msg: 'Internal Server Error' });
        }
    },
    getVoucher: async (req, res) => {
        try {
            const voucher = await Voucher.find()
            res.json(voucher)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    editVoucher: async (req, res) => {
        try {
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = voucherCtrl;