
const express = require('express');
const app =express()
const cors = require('cors');

const mongoose = require('mongoose');
app.use(express.json());
app.use(cors);

//database connection
mongoose.connect("mongodb://0.0.0.0:27017/api_dev")
.then(()=>{
    console.log("Connected to database")
}
)
.catch((err)=>{
    console.log(err)
})

//Schema creation
const productsSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is Mandatory"]
    },
    price:{
        type:Number,
        required:[true,"Price is Mandatory"],
        min:1
    },
    quantity:{
        type:Number,
        required:[true,"Quantity is Mandatory"],
    },
    category:{
        type:String,
        enum:["Clothing","Electronics","Footwear"]
    }
},{timestamps:true})

//Model creation

const productModel = mongoose.model("products",productsSchema);


//Endpoint to fetch all products

app.get("/products",(req,res)=>{
    productModel.find()
    .then((products)=>{
        res.send(products)
    })
    .catch((err)=>{
        console.log(err)
        res.send({message:"Some problem"})
    })
})


//endpoint fetching single product
app.get("/products/:id",(req,res)=>{
    productModel.findOne({_id:req.params.id})
    .then((products)=>{
        res.send(products)
    })
    .catch((err)=>{
        console.log(err)
        res.send({message:"Some problem"})
    })
})

//endpoint for posting product
app.post("/products",(req,res)=>{
    let product=req.body;
    productModel.create(product)
    .then((document)=>{
        res.send({data:document, message:"Product Inserted successfully"})
    })
    .catch((err)=>{
        console.log(err)
        res.send({message:"Some problem"})
    })
})



//endpoint for updating product


app.put("/products/:id",(req,res)=>{
    let product = req.body;
    productModel.updateOne({_id:req.params.id},product)
    .then((product)=>{
        res.send({data:product,message:"Product updated successfully"})
    })
    .catch((err)=>{
        console.log(err)
        res.send({message:"Some problem"})
    })
})




//endpoint for delete product

app.delete("/products/:id",(req,res)=>{

    productModel.deleteOne({_id:req.params.id})
    .then((product)=>{
        res.send({data:product,message:"Product deleted successfully"})
    })
    .catch((err)=>{
        console.log(err)
        res.send({message:"Some problem"})
    })
})

app.listen(5000,()=>{
    console.log("Server is running on 8000 port")
})