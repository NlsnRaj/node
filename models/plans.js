const mongoose = require('mongoose');
const plans = mongoose.Schema({
    plan_name: {
        type: String
    },
    plan_amount: {
        type: String
    }
});
module.exports=mongoose.model('Plans',plans)