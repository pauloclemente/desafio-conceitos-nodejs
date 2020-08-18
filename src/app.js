const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const project = { id: uuid(), title, url, techs, likes: 0};

  repositories.push(project);

  return response.json(project);

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { title, url, techs} = request.body;

  const { id } = request.params;

  let repository = repositories.find( rep => rep.id === id)

  if(!repository){
    return response.status(400).json({ message: "This repository was not found"})
  }
  
  repository = {...repository, title, url, techs};

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const index = repositories.findIndex( rep => rep.id === id)
  if (index < 0) {
    return response.status(400).json({ message: "This repository was not found"})
  }
  repositories.splice(index,1);
  
  return response.status(204).json().send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const repository = repositories.find( rep => rep.id === id) 
  if(!repository){
    return response.status(400).json({ message: "This repository was not found"})
  }

  repository.likes += 1;

  return response.json(repository);
});

module.exports = app;
