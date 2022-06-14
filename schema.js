const mongoose = require("mongoose");

var LandSchema = new mongoose.Schema({
Name: {
type: String,
required: true,
},

currentType:{
type: String,
required: true,
},

currentName: {
type: String,
required: true,
},

ownerLand: {
type: String,
required: true,
},
password: {
    type: String,
    required: true,
    },
fileloc1: {
    type: String,
    required: true,
 },
});

const Landing=mongoose.model("Landing", LandSchema);

module.exports=Landing;