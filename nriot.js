#!/usr/bin/env node

/*****************************************************/
/* By NriotHrreion  Version 0.1.1  NodeJS Tools
/* Copyright (c) 2020 NriotHrreion
/*****************************************************/

"use strict";

/* Import Modules */
const program = require("commander");
const chalk = require("chalk");
const ora = require("ora");
const express = require("express");
const minimist = require("minimist")(process.argv.slice(2));

const tool = require("./lib/tool");
const city = require("./lib/city");
const http = require("http");

/* Set Commands */
program
    .version("0.1.1 Version\nBy-"+ chalk.cyan("NriotHrreion") +"\nCopyright (c) 2020 NriotHrreion")
    .option("-s, server <port>", "Open localhost server")
    .option("-n, nocpiun", "Join Nocpiun")
    .option("-q, query", "Query Function")
    .on("help", function() {
    //help
    });
program.parse(process.argv);

if(program.server) {
    var argv = minimist._;
    var loading = ora("Loading...").start();
    setTimeout(() => {
        loading.succeed("Server Started");
        if(argv) {
            var app = express();
            app.get("/", function(req, res) {
                res.end("HelloWorld");
            })
    
            var server = app.listen(parseInt(argv[1]), function() {
                //server
            });
            console.log("The server is started on "+ chalk.underline("http://localhost:"+ parseInt(argv[1])));
        }
    }, 500);
}

if(program.nocpiun) {
    var join = ora("Loading...").start();
    setTimeout(() => {
        join.warn("ERROR");
        console.log(chalk.red("Cannot Find the Webpage!"));
    }, 500);
}

if(program.query) {
    var query = minimist._;
    if(query[1] == "date" || query[1] == "d") {
        var datequery = ora("Querying...").start();
        setTimeout(() => {
            datequery.succeed();
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();
            console.log('Date: '+ year +'-'+ month +'-'+ day +'-'+ hour +':'+ minute +':'+ second);
        }, 500);
    } else if(query[1] == "weather" || query[1] == "w") {
        var weatherquery = ora("Querying...")
        var cityquery = query[2];
        if(cityquery == undefined) {
            weatherquery.warn("ERROR");
            console.log(chalk.red("City Cannot be Empty! Must enter Chinese cities in Chinese."));
        }
        var citycode = city[cityquery];
        if(typeof(citycode) === "string") {
            var cityurl = "http://www.weather.com.cn/data/cityinfo/"+ citycode +".html";
            weatherquery.succeed();
            console.log(chalk.bold(cityquery));
            getWeatherData(cityurl);
        } else {
            weatherquery.warn("ERROR");
            console.log(chalk.red("City Not Found! Must enter Chinese cities in Chinese."));
        }

        function getWeatherData(url) {
            http.get(url, function(res) {
                var weatherData = "";

                res.on("data", function(data) {
                    weatherData += data.toString("utf8");
                });

                res.on("end", function() {
                    weatherData = JSON.parse(weatherData);
                    console.log("天气: "+ weatherData.weatherinfo.weather);
                    console.log("最低气温: "+ weatherData.weatherinfo.temp1);
                    console.log("最高气温: "+ weatherData.weatherinfo.temp2);
                });
            });
        }
    } else {
        console.log("   d, date  Query date data");
        console.log("   w, weather  Query weather data");
    }
}

