const express = require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

var app = express();
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/todo");
const todoSchema = new mongoose.Schema({
    task:String
})
const item=mongoose.model("todoList",todoSchema);

//Home Page Router
app.get("/",function(req,res){
   item.find({},function(err,finditems){
       if(err) 
        console.log("Error in displaying");
        else 
            res.render("list",{ejes:finditems});
   });

});

app.post("/",function(req,res){
    const userItem=req.body.todo;
    const todo4=new item({
        task:userItem
    })
    todo4.save();
    res.redirect("/");
});

app.post("/delete",function(req,res){
    var userdata=req.body.checkbox1;
    item.findByIdAndRemove(userdata,function(err){
        if(!err){
            console.log("deleted");
            res.redirect("/")
        }
         
        
    });
})

app.listen(3000,function(){
    console.log("server running on port no: 3000")
})