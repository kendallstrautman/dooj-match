/*
 - make it so that when longer options are selected on landing
 that the width of the input element grows to give space
*/

let   isHidden

const centerSection1 = document.querySelector('section.center-content')
      searchBtn = document.querySelector('h2.search')
      bostonBtn = document.querySelector('img.boston-icon')
      doojLogo = document.querySelector('img.logo-name')
      loaderSection = document.querySelector('section.loader')
      // formTag = document.querySelector('form.form')
      locationTag = document.querySelector('input.location')
      housingTag = document.querySelector('select.housing')
      activityTag = document.querySelector('select.activity')
      enjoysTag = document.querySelector('select.enjoys')
      resultsSection = document.querySelector("section.results")
      petTag = document.querySelector("div.petProfile")
      nameTag = document.querySelector("h1.doojName")
      infoList = document.querySelector("ul.doojInfo")
      inputTag = document.querySelector("input.location")
      resultsNum = 10

      httpSolve = "https://cors-anywhere.herokuapp.com/"
      apiUrl = httpSolve + "http://api.petfinder.com/pet.find?key=c715fdd4f4f563f91c16bcb257961ca7&animal=dog&count=10&output=basic&format=json&location="
      // apiUrl = httpSolve + "https://api.petfinder.com/pet.getRandom?key=c715fdd4f4f563f91c16bcb257961ca7&animal=dog&output=basic&format=json&location="
      gifUrl = "https://api.giphy.com/v1/stickers/random?api_key=L7c4MF0M0eLssZC0GoKIb4Df9yeZimZq&tag=dog&fmt=json&rating=g"


      /*
      problem is that the call returns an object, not an array
      need to use keys to convert the obj to an array but having trouble
      getting the values of the properties within that array. could do a simple
      loop or use reduce here???? to convert the obj to an array and return the 
      desired object with all the correct data.

      const getPetData = (zipcode) => {
        return fetch(apiUrl + zipcode)
          .then(response => response.json())
          .then(data => {
            const petObj = data.petfinder.pet
            console.log(Object.keys(petObj).map((key, index) => {
              return {
                
              }
            })) 
          })
          .catch(error => console.error(error))
      }
      */


   
const getPetData = (zipcode) => {
  return fetch(apiUrl + zipcode)
  	.then(response => response.json())
  	.then(data => {
    	return data.petfinder.pets.pet.map(pet => {
        return {
          name: pet.name.$t,
          age: pet.age.$t,
          size: pet.size.$t,
          image: pet.media.photos.photo[2].$t,
          breed: pet.breeds.breed.$t,
          sex: pet.sex.$t,
          description: pet.description.$t
        }
      })
  	})
  	.then(cleanData => {
      resultsSection.style = ""
      resultsSection.innerHTML = ""

      //add a math random here to pick a random dog from the data
      randomNum = Math.floor(Math.random() * Math.floor(resultsNum))
      console.log(cleanData[randomNum])
      const pet = cleanData[randomNum]

        resultsSection.innerHTML =
        `
				<section class="resultsLoaded">
				<div class="petProfile">
          <img class="petImg" src="${pet.image}">
          <h1 class="doojName">
            ${pet.name}
          </h1>
          <img class="downArrow" src="assets/down_arrow.png">
          <ul class="doojInfo">
            <li>sex: ${pet.sex}</li>
            <li>breed: ${pet.breed}</li>
            <li>age: ${pet.age}</li>
            <li>size: ${pet.size}</li>
          </ul>
				</div>
				</section>
				`
  	})
  	.catch(error => console.error(error))
}


/* -- this code loads multiple pets - could convert to a grid

const getPetData = (zipcode) => {
  return fetch(apiUrl + zipcode)
  	.then(response => response.json())
  	.then(data => {
      //can map work on just one result???? 
    	return data.petfinder.pets.pet.map(pet => {
        return {
          name: pet.name.$t,
          age: pet.age.$t,
          size: pet.size.$t,
          image: pet.media.photos.photo[2].$t,
          breed: pet.breeds.breed.$t,
          sex: pet.sex.$t,
          description: pet.description.$t
        }
      })
  	})
  	.then(cleanData => {
      resultsSection.innerHTML = ""
      console.log(cleanData)
      //add a math random here to pick a random dog from the 
      //results and then add the info- JUST ONE DOG 
      //or refactor url to just give one random dooj


    	cleanData.forEach(pet => {
        resultsSection.innerHTML +=
        `
				<section class="results">
				<div class="petProfile">
          <img src="${pet.image}">
          <h1 class="doojName">
            ${pet.name}
          </h1>
          <ul class="doojInfo">
            <li>sex: ${pet.sex}</li>
            <li>breed: ${pet.breed}</li>
            <li>age: ${pet.age}</li>
            <li>size: ${pet.size}</li>
          </ul>
				</div>
				</section>
				`
      })
  	})
  	.catch(error => console.error(error))
}
*/

const loader = () => {
   return fetch(gifUrl)
    .then(response => response.json())
    .then(data => {
      return data.data.images.original.url
    })
    .then(src => {

      console.log(src)
      addLoader(src)
    })
    .catch(error => console.error(error))

}


//change the loader to be a real gif - couldnt hack the giphy api

const addLoader = src => {
  centerSection1.innerHTML = ''
  centerSection1.innerHTML +=
  `
  <img src="assets/giphy(3).gif">
  `
}

// let loader = () => {
//    return fetch(gifUrl)
//     .then(response => response.json())
//     .then(data => {
//       return data.data.id
//     })
//     .then(id => {
//       let cleanGifUrl = "https://i.giphy.com/media/" + id + "/giphy-downsized.gif"
//       console.log(cleanGifUrl)
//       return cleanGifUrl
//     })
//
// }


//add an event listener that waits for the searchBtn clicked
//could add some more conditions here on the select options
//check for whether the user inputed location or zip, if not, alert
//if at least the zipcode is entered, fetch the api

searchBtn.addEventListener('click', () => {
  if (locationTag.value == '') {
    alert('please fill in your city or zip')
  } else {
    searchBtn.classList.add(isHidden)
    const zipcode = locationTag.value
          housing = housingTag.value
          activity = activityTag.value
          enjoys = enjoysTag.value

    //update api call variables here - make the call

    console.log(zipcode, housing, activity, enjoys)
    // centerSection1.classList.add('isHidden')

    getPetData(zipcode)

    loader()

    event.preventDefault()


  }
  console.log('click')

})

inputTag.addEventListener('click', () => {
  inputTag.setAttribute("placeholder", "zipcode")
})
