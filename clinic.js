var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");
var port = process.env.PORT || 8080;
app.use(express.urlencoded({extended:true}));
app.set("view engine","hbs");
app.use(express.static(path.join(__dirname,"/public/")));
app.get("",function(_,res){
    res.render("clinic");
});
app.get("/gettraetment.hbs",function(_,res){
    res.render("gettraetment");
});
app.get("/pay.hbs",function(_,res){
    res.render("pay");
});
app.get("/takeappointment.hbs",function(_,res){
    res.render("takeappointment");
});
app.get("/api",function(req,res){
    a = fs.readFileSync(__dirname+"/medicine.json","utf-8");
    res.json(a);
});

app.post("/get_treat",function(req,res){
    var dis = req.body.disease;
    var age = req.body.age;
    var name = req.body.patient;
    var gender = req.body.gender;
    dis=dis.split(",");
    var obj = fs.readFileSync(__dirname+"/medicine.json","utf-8");
    obj = JSON.parse(obj);
    if(dis.some(function(val){return val=="headache"||val=="bodyache"||val=="sneezing"||val=="nose";})==true){
        res.render("treatment",{
            name:name,
            age:age,
            gender:gender,
            sym:dis,
            med1:obj.diominic,
            num1:obj.num3,
            time1:obj.time_1,
            med2:obj.mox,
            num2:obj.num3,
            time2:obj.time_1
        });
    }
   else if(dis.some(function(val){return val=="abdomindpain"|| val=="vomiting" ||val=="vomilting"||val=="diarrhea"||val=="diariya";})==true){
        res.render("treatment",{ 
            name:name,
            age:age,
            gender:gender,
            med1:obj.cyclopam,
            num1:obj.num3,            
            sym:dis,
            time1:obj.time_1,
            med2:obj.aciloc,
            num2:obj.num2,
            time2:obj.time_1,
            med3:obj.osono,
            num3:obj.num2,
            time3:obj.time_3            
        });
    }
    else if(dis.some(function(val){return val=="backpain"||val=="pain"||val=="acvte";})==true){
        res.render("treatment",{ 
            name:name,
            age:age,
            gender:gender,
            med1:obj.akilos,            
            sym:dis,
            num1:obj.num3,
            time1:obj.time_2,
            med2:obj.aciloc,
            num2:obj.num3,
            time2:obj.time_2,
            med3:obj.dangel,
            num3:obj.num1
        });
    }
    else if(dis.some(function(val){return val=="heartburn"||val=="hyperacidity"||val=="belching"||val=="stomachpain";})==true){
        res.render("treatment",{ 
            name:name,
            age:age,
            gender:gender,
            med1:obj.aciloc,
            num1:obj.num3,            
            sym:dis,
            time1:obj.time_2,
            med2:obj.digenegel,
            num2:obj.num1,
            time2:obj.time_1
        });
    }
    else{
        res.render("gettraetment",{ name:name,
            age:age,
            gender:gender});
    }
});
app.post("/get_coords",function(req,res){
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    console.log(latitude,longitude);
    res.render("success");
});
app.post("/set_details",function(req,res){
    var pname = req.body.pname;
    var pnumber = req.body.pnumber;
    console.log(pname,pnumber);
    res.render("takeappointment");
});
app.listen(port,function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("server is running on "+port);
    }
});