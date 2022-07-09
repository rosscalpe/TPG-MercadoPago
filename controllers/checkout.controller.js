const mp = require('../modules/mercadoPago');
module.exports = {
    // Step 8
    process: async (req,res) => {
        try {
            let items = req.session.cart.map(item => Object({...item,currency_id:'ARS',unit_price:item.price}));
            let link = await mp(items, 12, 0);
            return res.redirect(link.body.init_point);
        } catch (error) {
            console.log(error)
        }
    },
    // Step 9
    feedback: (req, res) => {
        const { status } = req.query;
        return res.send(status)
    }
};