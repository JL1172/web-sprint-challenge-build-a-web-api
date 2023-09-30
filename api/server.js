const express = require('express');

//pull in routes
const ProjectRoute = require("./projects/projects-router");
const ActionRoute = require("./actions/actions-router");
//pull in routes



//instantiating server
const server = express();
//instantiating server



//global middleware
server.use(express.json()); 
//global middleware



//server use routes
server.use("/api/projects", ProjectRoute)
server.use("/api/actions",ActionRoute)
//server use routes

module.exports = server;
