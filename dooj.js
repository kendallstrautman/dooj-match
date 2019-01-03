/* NOTES & TODO's ***************************************************************

 - add funny conditionals based on user input that adjust the api url

*/

/*----------------------ALTERNATIVES----------------------------------------- */

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

/* this code calls the giphy api, but the returned img has branding on it,
so opted to just load in gifs 

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

*/


//TRY to get all the text to lowerCase - maybe do in the ajax call
  // console.log(nameTag.textContent.cleanPetDataCase())

  // let infoListItems = []
  
  // infoList.forEach(li => {
  //   infoListItems.push(li.textContent)
  // })

  // console.log(infoListItems.cleanPetDataCase())

/*---------------------GLOBAL VARIABLES------------------------------------- */

let   isHidden

const centerSection1 = document.querySelector('section.center-content')
      searchBtn = document.querySelector('h2.search')
      contactBtn = document.querySelector('h2.contact')
      bostonBtn = document.querySelector('img.boston-icon')
      sidebarTextTag = document.querySelector('h2.sidebarText')
      doojLogo = document.querySelector('img.logo-name')
      loaderSection = document.querySelector('section.loader')
      breakTag = document.getElementById('break1')
      locationTag = document.querySelector('input.location')
      housingTag = document.querySelector('select.housing')
      activityTag = document.querySelector('select.activity')
      enjoysTag = document.querySelector('select.enjoys')
      resultsSection = document.querySelector("section.results")
      inputTag = document.querySelector("input.location")
      resultsTag = document.querySelector("section.results")
      resultsNum = 10

      httpSolve = "https://cors-anywhere.herokuapp.com/"
      apiUrl = httpSolve + "http://api.petfinder.com/pet.find?key=c715fdd4f4f563f91c16bcb257961ca7&animal=dog&count=10&output=basic&format=json&location="
      // apiUrl = httpSolve + "https://api.petfinder.com/pet.getRandom?key=c715fdd4f4f563f91c16bcb257961ca7&animal=dog&output=basic&format=json&location="
      gifUrl = "https://api.giphy.com/v1/stickers/random?api_key=L7c4MF0M0eLssZC0GoKIb4Df9yeZimZq&tag=dog&fmt=json&rating=g"

/*----------------------ADJUST SELECT OPTION PADDING IOS SAFARI--------------------*/

if (
  navigator.userAgent.indexOf('Safari') != -1 
  && navigator.userAgent.indexOf('Chrome') == -1
) {
  
  console.log('Safari-Mode')

  housingTag.addEventListener("change", () => {
    //when someone selects housing, check which value it is, 
    //if its a shorter one, update the padding

    const selection = housingTag.value

    if(selection.length > 8) {
      console.log(housingTag.classList)
      housingTag.classList.add('housingLrg') 
      housingTag.classList.remove('housingMed', 'housingSml')
    } else if (selection.length > 4) {
      housingTag.classList.add('housingMed')
      housingTag.classList.remove('housingLrg', 'housingSml')
    } else {
      housingTag.classList.add('housingSml')
      housingTag.classList.remove('housingMed', 'housingLrg')
    }

  })

  activityTag.addEventListener("change", () => {
    const selection = activityTag.value

    if(selection.length > 12) {
      activityTag.classList.add('activityLrg')
      activityTag.classList.remove('activityMed', 'activitySml')
    } else if (selection.length > 8) {
      activityTag.classList.add('activityMed')
      activityTag.classList.remove('activityLrg', 'activitySml')
    } else {
      activityTag.classList.add('activitySml')
      activityTag.classList.remove('activityLrg','activityMed')
    }

  })

  enjoysTag.addEventListener("change", () => {
    const selection = enjoysTag.value
    console.log(selection.length)
    
    if(selection.length > 10) {
      enjoysTag.classList.add('enjoysLrg')
      enjoysTag.classList.remove('enjoysMed', 'enjoysSml')
    } else if (selection.length > 6) {
      enjoysTag.classList.add('enjoysMed')
      enjoysTag.classList.remove('enjoysSml', 'enjoysLrg')
    } else {
      enjoysTag.classList.add('enjoysSml')
      enjoysTag.classList.remove('enjoysMed', 'enjoysLrg')
    }
  })
}



/*----------------------API CALL------------------------------------------ */

/*----------PET OBJECT MANIPULATION*/


const cleanPetData = (pet) => {

  //initialize an empty array to hold new key values
  let cleanPet = []

  //iterate over each key in the pet obj
  Object.keys(pet).forEach(key => {

    //convert value to lowercase, add to cleanPet array
    let newValue = pet[key] && pet[key].toLowerCase()
    cleanPet.push(newValue)

    //account for variability in petfinder data, make full words
    cleanPet.forEach(value => {

      if (value == undefined) {
        value = 'unknown'
      } //if its the name, add 'meet' to it
      else if (value == cleanPet[0] && value.length < 10) {
        value = "meet " + value
      } //if its not the name, lets update the data
      else if (value !== cleanPet[0]) {
        if(value == 'f') {
          value += 'emale'
        } else if (value == 'm' && value == cleanPet[5]) {
          value += 'ale'
        } else if (value == 's' ) {
          value += 'mall'
        } else if (value == 'm' && value == cleanPet[2]) {
          value += 'edium'
        } else if (value == 'l') {
          value += 'arge'
        } 
      }

      pet[key] = value
    })

    return pet

  })
}

/*--------------------------------------*/


//lets get the pet data from petfinder api and update the dom
const getPetData = (zipcode) => {

  //call the petfinderapi with proper zipcode
  return fetch(apiUrl + zipcode)

    //convert the response to json
    .then(response => response.json())

    //take that json and iterate over each pet to get the exact info, return obj
  	.then(data => {
    	return data.petfinder.pets.pet.map(pet => {
        return {
          name: pet.name.$t,
          age: pet.age.$t,
          size: pet.size.$t,
          image: pet.media.photos.photo[2].$t,
          breed: pet.breeds.breed.$t,
          sex: pet.sex.$t,
          contact: pet.contact.email.$t
          // description: pet.description.$t
        }
      })
    })
    
    //with this clean data, update the dom
  	.then(cleanData => {
      
      resultsSection.style = ""
      resultsSection.innerHTML = ""

      //add a math random here to pick a random dog from the data
      randomNum = Math.floor(Math.random() * Math.floor(resultsNum))
      const pet = cleanData[randomNum]

      cleanPetData(pet)

      localStorage.setItem("contact", pet.contact)

      //set a 1.5s timeout so the dom gets updated after the loader runs
      window.setTimeout( () => {

        //takesthe loader off
        loaderOut()
        
        //update the dom with the pet profile
        resultsSection.innerHTML =
        `
        
        <section class="resultsLoaded">
            <div class="petProfile">
              <div class="imgWrap">
                  <img class="petImg" src="${pet.image}">
              </div>
              <div class="nameWrap">
                <h1 class="doojName">
                  ${pet.name}
                </h1>
                <img class="downArrow" src="assets/down_arrow.png">
              </div>
              <ul class="doojInfo isHidden">
                <li>sex: ${pet.sex}</li>
                <li>breed: ${pet.breed}</li>
                <li>age: ${pet.age}</li>
                <li>size: ${pet.size}</li>
                <li class="contactBtnMobile"><a href="mailto:${pet.contact}"> contact shelter</a></li>
              </ul>
            </div>
          </a>
				</section>
        `
      }, 1500)
  
    })
    
    //if an error occurs, catch it and print to console
  	.catch(error => console.error(error))
}

/*-----------------LOADER -------------------------------------------------*/

let randomNum = Math.floor(Math.random() * Math.floor(4))

//pick a random gif to load 
const whichGif = () => {
  //set gif variables
  const path = "assets/gifs/"
  const frenchPug = path + "giphy_french_pug.gif"
        callWaiting = path + "giphy_phone.gif"
        pomPom = path + "giphy_pom.gif"
        happyPug = path + "giphy_pug.gif"

  //set gif array
  let gifs = [frenchPug, callWaiting, pomPom, happyPug]

  //return the random gif 
  return gifs[randomNum]
}

//start the loader
const loaderIn = () => {

  //clear the landing content
  centerSection1.innerHTML = ''
  sidebarTextTag.innerHTML = "wingardium caninosa..."

  //pick a gif, convert to string
  let gif = whichGif().toString()

  //update the dom with gif and blob
  centerSection1.innerHTML +=
      `
      <div class="loaderWrap">
        <img class="blob" src="assets/blob1.png">
        <img class="gif" src="${gif}">
      </div>
      `
}

//stop the loader
const loaderOut = () => {

  //clear the gif from the dom
centerSection1.innerHTML = ''

  if(window.innerWidth >= 1024) {
    contactBtn.removeAttribute('hidden')
    contactAnchor = document.querySelector("a.contactEmail")
    contactAnchor.setAttribute('href', `mailto:${localStorage.getItem('contact')}`)
    sidebarTextTag.classList.add('sidebarResults')
    sidebarTextTag.innerHTML = "here's to forever..."
  }

}


/*---------------LANDING PAGE EVENT-LISTENERS---------------------------------*/ 

doojLogo.addEventListener("click", () => {
  document.location.reload()
})



//Listen for input tag click
inputTag.addEventListener('click', () => {

  //add 'zipcode' to element to cue user
  inputTag.setAttribute("placeholder", "zipcode")

})

//listen for the search button to be clicked 
searchBtn.addEventListener('click', () => {

  //if user hasn't entered, zip, throw alert 
  if (locationTag.value == '') 
  {
    alert('please fill in your city or zip')
  } 
  else 
  {
    //hide the search button
    searchBtn.classList.add('isHidden')

    //set the variables to get info from api
    const zipcode = locationTag.value
          housing = housingTag.value
          activity = activityTag.value
          enjoys = enjoysTag.value

    //start loader      
    loaderIn()

    //make api call & update dom
    getPetData(zipcode)

    //prevent the weird form bx from firing
    event.preventDefault()

  }
})

/*-------------RESULTS PAGE EVENT-LISTENERS---------------------------------*/

//listen for a click on the down arrow, then reveal the dooj info 
//and remove the arrow. also add 'isScroll' to petProfile div 

const showResults = () => {
  //set variables   
  const petTag = document.querySelector("div.petProfile")
  infoList = document.querySelector("ul.doojInfo")
  arrowTag = document.querySelector("img.downArrow")
  nameTag = document.querySelector("h1.doojName") 
  contactBtnMobile = document.querySelector('li.contactBtnMobile')

  //hide arrow
  arrowTag.classList.add('isHidden')
  arrowTag.style = "padding-top: 0;"

  //show pet info
  infoList.classList.remove('isHidden')
  infoList.classList.add('isVisible')

  if(window.innerWidth < 1024) {
    //allow scroll for the pet profile on mobile
    petTag.classList.add('isScroll')
    nameTag.style = ('padding: 35px 0 5px 0')
  } else {
    contactBtnMobile.setAttribute('hidden', true)
  }
}

  //listen for touchstart - for mobile / tablet
resultsTag.addEventListener('touchstart', () => {
    showResults()
})

  //listen for down arrow click
resultsTag.addEventListener('click', () => {
    showResults()
})




