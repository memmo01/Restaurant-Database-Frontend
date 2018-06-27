const db = require("../models")


module.exports=function(app){

    app.get("/api/list",function(req,res){
        db.places.findAll({}).then(function(results){
            res.json(results)
        })
    })
     

     app.get("/api/:search?/:title?",function(req,res){
        db.places.findAll({
            where:{
                [req.params.search]:req.params.title
            }
        }).then(function(results){
            res.json(results)
        })
    })
    app.get("/api/find/restaraunt/:input?",function(req,res){
        db.places.findAll({
            where:{
                rest_name: req.params.input
            }
        }).then(function(results){
            res.json(results);
        })
    })

    app.post("/api/newRestaurant",function(req,res){
        db.places.create(req.body).then(function(results){
            res.json(results)
            console.log("made it")
        })
    })
    

    app.put("/api/update", function(req,res){
        db.places.update({
            // nationality:req.body.nationality,
            comments:req.body.comments,
            location:req.body.location
        },{
        where:{
            id:req.body.id
        }
    }).then(function(results){
        res.json(results)
    })


    
})
}