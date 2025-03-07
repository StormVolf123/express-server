// Waiting for the page to load
document.addEventListener("DOMContentLoaded", () => {
  // finding the form from add-animal.ejs
  const form = document.querySelector("form");

  // if we're already on the page
  if (form) {
    form.addEventListener("submit", (event) => {
      // Getting the birht date and death inputs
      const birthdate = new Date(document.getElementById("birthDate").value);
      const deathDateInput = document.getElementById("deathDate");

      // If there is a death date
      if (deathDateInput.value) {
        const deathDate = new Date(deathDateInput.value);

        // debuggin: checking if deathdate is before birthdate
        if (deathDate < birthdate) {
          event.preventDefault();

          //Showing alert
          alert("Error: Dødsdata kan ikke være før fødselsdato!");
        }
      }
    });
  }
});
