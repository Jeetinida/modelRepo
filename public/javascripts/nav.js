// this code will insert nav bar to any page, we just have to add it's css and js in the html files
const navTemplate = `<div class="home-btn"><a href="dashboard">Home</a></div>`;
document.body.insertAdjacentHTML("afterbegin", navTemplate);