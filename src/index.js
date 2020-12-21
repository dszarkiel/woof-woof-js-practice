const allDogsAPI = "http://localhost:3000/pups"
const dogBar = document.querySelector("#dog-bar")


document.addEventListener("DOMContentLoaded", e => {
    fetchNavDogs();
})

function fetchNavDogs() {
    fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(dogs => {
        dogs.forEach(showDogName)
    })
}

function showDogName(dog) {
    let dogSpan = document.createElement("span")
    dogSpan.dataset.id = dog.id
    dogSpan.textContent = dog.name 

    dogBar.append(dogSpan)
}

dogBar.addEventListener("click", e => {
    let dogId = e.target.dataset.id

    getDogDetails(dogId);
})

function getDogDetails(dogId) {
    fetch(`http://localhost:3000/pups/${dogId}`)
    .then(response => response.json())
    .then(dog => {showDogDetails(dog)})
}

function showDogDetails(dog) {
    let dogInfo = document.querySelector("#dog-info")
    dogInfo.textContent = ""

    let dogImg = document.createElement("img")
    dogImg.src = dog.image

    let dogName = document.createElement("h2")
    dogName.textContent = dog.name

    let dogButton = document.createElement("button")
    dogButton.dataset.id = dog.id

    if (dog.isGoodDog === true) {
        dogButton.textContent = "Good Dog!"
    } else {
        dogButton.textContent = "Bad Dog!"
    }
    dogInfo.append(dogImg, dogName, dogButton)
    dogButton.addEventListener("click", e => {
        changeDogStatus(e.target)
    })
}

function changeDogStatus(dog) {
    dogId = dog.dataset.id
    
    if (dog.textContent === "Good Dog!") {
        dog.textContent = "Bad Dog!"
        fetch(`http://localhost:3000/pups/${dogId}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify( { isGoodDog: false } )
        })
    } else {
        dog.textContent = "Good Dog!"
        fetch(`http://localhost:3000/pups/${dogId}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify( { isGoodDog: true } )
        })
    }
}
