const mongoose = require('mongoose');
const mongoURI ="mongodb+srv://yogiindoria0002:yogi123@cluster1.pv8eha6.mongodb.net/Database"

const dbConnect = ()=>{mongoose.connect(mongoURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('db is connected'))
.catch(err=>console.log('not connected due to ',err.message));}

module.exports= dbConnect;

