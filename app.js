
const express=require("express");

const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

});
app.post("/",function(req,res){
    
    const city=req.body.cityName;
    const id="fb0f67e1c898c3c3ed964362608578d0";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+id+"&&units="+units;
    https.get(url,function(response){
        console.log(response.statusCode);
        
        response.on("data",function(data){
            const wheather=JSON.parse(data);
            console.log(wheather);
            const temp=wheather.main.temp;
            const description=wheather.weather[0].description;
            const icon=wheather.weather[0].icon;
            const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            console.log(temp);
            res.write("<P>The wheather is currently "+description+"</p>");
            res.write("<h1>The tempreture at "+city+" is "+temp+"degrees celcious</h1>");

            res.write("<img src="+imageurl+">");
            res.send()
            // const object={
            //     name:"Rafi",
            //     favouritefood:"chicken"
            // }
            // console.log(JSON.stringify(object));
    
    });
    
  });
});

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});