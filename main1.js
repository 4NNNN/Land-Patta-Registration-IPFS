
const express = require('express')
var cors = require('cors');
const Landing = require('./schema.js');
const app = express()
const mongoose = require('mongoose');
const downloadsFolder = require('downloads-folder');
// const fs=require('fs');
// const connectDB=require('./connect');
app.use(express.json());
app.use(cors());
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('66d6f8de0872842a71d7', 'b72598bf6bf2cab8655f653439b9af17a3816dabc9048255b3c225b76022babc');

app.post('/', 

async(req,res) =>{


//test Auth
pinata.testAuthentication().then((result) => {
    // console.log(result);
}).catch((err) => {
    console.log(err);
});


//pinning file
const metadata = new Landing ({
Name : req.body.name1,
currentName : req.body.currentName1,
currentType: req.body.currentType1,
ownerLand: req.body.ownerLand1,
password:req.body.password1,
fileloc1:req.body.fileloc1
});

metadata.save((err,doc) => {
    if(!err){
        console.log("inserted succesfully")
    }
    else
    {
        console.log(err);
    }
})
let directory=downloadsFolder();
let d=directory+"\\";
let d1=d+""+metadata.fileloc1;
const sourcePath = d1;
// console.log(sourcePath);
const metadata1={
    Name : metadata.Name,
currentName : metadata.currentName,
currentType: metadata.currentType,
ownerLand: metadata.ownerLand,
password:metadata.password,
}

pinata.pinFromFS(sourcePath, metadata1).then((result) => {
    console.log(result);
    res.status(200).send({IpfsHash: result.IpfsHash,Name:metadata.Name,Submarined:"Submarined"});
}).catch((err) => {
    console.log(err);
});
// console.log(metadata1);
})

//metadata update
app.get('/metadata-hashing', 
function (metavalue) {
//hasing metadata
const metadata = {
    //name: 'Charan - Saravampatti document',
    keyvalues: {
       metakey : metavalue
    }
};

pinata.hashMetadata(hash, metadata).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});

})

//hash file delete
app.get('/file-delete', 
function (hashToUnpin) {
    pinata.unpin(hashToUnpin).then((result) => {
        //handle results here
        console.log(result);
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
})


// mongoose.set("useNewUrlParser",true);
// mongoose.set("useUnifiedTopology",true);
mongoose.connect('mongodb+srv://gokul8:gokul@cluster0.ivgr8.mongodb.net/register?retryWrites=true&w=majority',(err)=>{
    if(err)
    {
        console.log(err)
    }
    else
    {
        console.log("db connected");
    }
})
app.listen(8001,(err)=>{
   if(err){
       console.log(err);
   }
   else
   {
       console.log("server running");
   }
});