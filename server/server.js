const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port =process.env.PORT || 12001;

app.use(cors());

app.use(bodyParser.json());
app.use('/api', (req, res)=> res.json({"username":"bryan"}));

app.get('/getdata',function(req,res){

    var mysql   = require('mysql');
    var db_config = require('../config/db-config.json');

    var connection = mysql.createConnection({
        host     : db_config.host,
        user     : db_config.user,
        password : db_config.password,
        database : db_config.database
    });

    var name=req.query.name;
    var date=req.query.date;
    var query;

    if(!req.query.date) {

        query="SELECT lat,lng FROM gpsdata where name="+name;

        console.log("no date");
    }

    else{

        query="SELECT lat,lng FROM gpsdata where name="+name+"AND DATE(time)="+date;

    }

    connection.connect();

    try {
        connection.query(query, function(error,results,fields){
            if(error){console.log("getdata error");}
            if(results){
                res.send(results);
                console.log(results);

            }

        });

    }
    catch (err){
        console.log("error");
    }

    connection.end();
});


app.get('/newdata',function(req,res){

    var mysql      = require('mysql');
    var db_config  = require('../config/db-config.json');

    var connection = mysql.createConnection({
        host     : db_config.host,
        user     : db_config.user,
        password : db_config.password,
        database : db_config.database
    });
    var name=req.query.name;
    var lat =req.query.lat;
    var lng=req.query.lng;
    var time=req.query.time;
    connection.connect();
    try{
        connection.query("INSERT INTO gpsdata (name,lat,lng,time) VALUES ("+name+","+lat+","+lng+","+time+")", function(error){
            if(error){

            }
        } );
    }
    catch (err){
        console.log("error");
    }
    res.send("!");
    connection.end();
});

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
});
