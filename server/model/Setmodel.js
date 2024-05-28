const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelSet = new Schema({
    company:{
        type: String,
        required: true
    },
    setname:{
            type: String,
            required: true
    },
    group:{
        type: String,
        required: true
    },
    Priceaverage:{
        type: String,
        required: true
    },
    Profitaverage:{
        type: String,
        required: true
    },
    Averagedividend:{
        type: String,
        required: true
    },
    margin:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('ModelSet', ModelSet);