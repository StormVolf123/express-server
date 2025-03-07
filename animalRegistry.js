// Creating a In-memory storage for our animals
const animals = [];

// creating a nextId to keep track of the next ID's given
let nextId = 1;

// Add new animal
function addAnimal(name, species, birthDate, deathDate = null) {
  // getting todays date:
  const today = new Date().toISOString().split("T")[0];

  // Animal object
  const animal = {
    id: nextId++,
    name: name,
    species: species,
    dateAdded: today,
    birthDate: birthDate,
    deathDate: deathDate,
    age: calculateAge(birthDate, deathDate),
  };

  // Add to animal array
  animals.push(animal);

  return animal;
}

// Calculate age based on birth date and optional death date
function calculateAge(birthDate, deathDate = null) {
  const birth = new Date(birthDate);
  const end = deathDate ? new Date(deathDate) : new Date(); // Use current date if animal is alive

  // Calculate the difference in years
  let age = end.getFullYear() - birth.getFullYear();

  // Adjust age if the birthday hasn't occurred yet this year
  if (
      end.getMonth() < birth.getMonth() ||
      (end.getMonth() === birth.getMonth() && end.getDate() < birth.getDate())
  ) {
      age--;
  }

  return age;
}

// Function to get all animals
function getAllAnimals() {
  return animals;
}

// Function to search animals by name
function searchAnimals(name) {
  return animals.filter((animal) =>
    animal.name.toLowerCase().includes(name.toLowerCase())
  );
}


// Exporting all the functions so we can reuse them in other files
module.exports = {
    addAnimal,
    getAllAnimals,
    searchAnimals
};
