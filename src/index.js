let addToy = false;
function updatesLikes (id, newNumberOfLikes){
  fetch(`http://localhost:3000/toys/${id}`,{
    method : "PATCH",
    headers:
    {
      "Content-Type" : "application/json",
      Accept : "application/json"
    },
    body: JSON.stringify({
      "likes": newNumberOfLikes
    })
  })
}
//   .then(res=>res.json())
//   .then(updatedToy => console.log(updatedToy));
// }

// GET request 
document.addEventListener("DOMContentLoaded", () => {
  fetch (" http://localhost:3000/toys",) // fetch returns a promise 
.then(res => res.json ()) // res contains all the information returned from the promise made by fetch . res.json returns the json part from the body 
.then(toys => toys.forEach(toy => createCardElement(toy)))
// Adding a New Toy
const form = document.querySelector("form.add-toy-form")
form.addEventListener("submit", (event) =>{
event.preventDefault(); // to prevent page refreshing or reloading 
const formData =Object.fromEntries(new FormData(event.target));
console.log(formData)
sendItOut(formData)
})
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
})
})

// Access the list of toys from an API (mocked using JSON Server) and render each of them in a "card" on the page
// Hook up a form that enables users to add new toys. Create an event listener so that, when the form is submitted, the new toy is persisted to the database and a new card showing the toy is added to the DOM
// Create an event listener that gives users the ability to click a button to "like" a toy. When the button is clicked, the number of likes should be updated in the database and the updated information should be rendered to the DOM

function createCardElement (toy){
  let card = document.createElement('div') // We are creating a div element 
  card.classList.add("card")
  let h2 = document.createElement("h2")
  h2.textContent = toy.name
  let img = document.createElement("img")
  img.src = toy.image
  img.classList.add("toy-avatar");
  let p =document.createElement("p")
  p.textContent =`${toy.likes} likes`
  let button = document.createElement("button")
  button.addEventListener("click", ()=> {
    //update likes element 
    p.textContent = `${toy.likes += 1} Likes`;
    //patch 
    updatesLikes(toy.id , toy.likes)
  })
  button.classList.add("like-btn" )
  button.id = toy.id
  button.textContent ="Like ❤️" 
  card.append(h2,img,p,button)
  document.getElementById("toy-collection").appendChild(card)
  }

// POST request 
function sendItOut(newToy){
  fetch ("http://localhost:3000/toys",{
  method : "POST",
  headers: {
  "Content-Type":"application/json",
  Accept: "application/json",
  },
  body: JSON.stringify({
    name:newToy.name,
    image:newToy.image,
    "likes": 0
  })
})
.then(
  (res)=>res.json()
)
.then(responseToy => createCardElement(responseToy))
}