const express = require('express');

//pull in routes
const ProjectRoute = require("./projects/projects-router");
//pull in routes



//instantiating server
const server = express();
//instantiating server



//global middleware
server.use(express.json()); 
//global middleware



//server use routes
server.use("/api/projects", ProjectRoute)
//server use routes

module.exports = server;
