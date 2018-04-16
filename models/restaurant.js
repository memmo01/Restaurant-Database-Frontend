module.exports=function(sequelize,DataTypes){
    var restaurant = sequelize.define("places",{
        nationality:DataTypes.STRING,
        category:DataTypes.STRING,
        rest_name:DataTypes.STRING,
        location:DataTypes.STRING,
        cost:DataTypes.STRING,
        rating:DataTypes.INTEGER,
        comments:DataTypes.TEXT,
        visited:DataTypes.STRING,
        
    },{
        timestamps: false,
    }
)
    return restaurant;
}