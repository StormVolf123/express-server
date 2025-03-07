// Creating the main server (express)

// importing express and animalRegristry
const express = require("express");
const path = require("path"); // Node's path module
const animalRegistry = require("./animalRegistry");

// Creating a new express application
const app = express();

// Telling express to use EJS as the template engine
app.set("view engine", "ejs");

// Adding middleware to parse form data when you add new animals
app.use(express.urlencoded({ extended: true })); // parsing form data

// using express.static to serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Adding sample animals to start with
animalRegistry.addAnimal("Storm", "Tiger", "2011-07-10");
animalRegistry.addAnimal("Klaus", "Zebra", "2020-01-20");

// Defining a route for the homepage: telling express to find the 'index' in the view folder
app.get("/", (req, res) => {
  // checking if there is a search query
  const searchTerm = req.query.search;

  //Getting the animals
  const animals = searchTerm
    ? animalRegistry.searchAnimals(searchTerm)
    : animalRegistry.getAllAnimals();

  // Renderring tghe page with animals and the serch term ( if there is any)
  res.render('index', {
    animals: animals,
    searchTerm: searchTerm || ""
  }); // showcasing our animals array
});

// Routing to display the add animal form
app.get("/add-animal", (req, res) => {
  res.render("add-animal");
});

// Routing to process the form submission when addin a new animal
app.post("/add-animal", (req, res) => {
  const { name, species, birthDate, deathDate } = req.body;

  animalRegistry.addAnimal(name, species, birthDate, deathDate || null);

  // redirecting back to the homepage
  res.redirect("/");
});

// Telling the app to listen for requests on port 3000
app.listen(3000, () => {
  console.log("Server er started, besøg http://localhost:3000");
});
