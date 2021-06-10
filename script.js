const BASE_URL = 'http://localhost:3000'

// const submit = document.querySelector('.submit')
const listing = document.querySelector('.listing')
const form = document.querySelector('.search-section')
const input = document.querySelector('#blank')
const savedPageButton = document.querySelector('#saved')


// localStorage.clear()

async function getSearchResults(query) {
  try {
    const searchResult = await axios.get(`${BASE_URL}/api/v1/search.json?query=${query}`)
    
    // console.log(searchResult.data)
    listResults(searchResult.data)

  } catch (err) {
    console.log("Error Message:", err.message)
  }
}


function listResults(results) {
  console.log(results)
  removeItems()

  const list = document.createElement('div')
  list.classList.add('list')
  listing.appendChild(list)

  const resultsTitle = document.createElement('h1')
  resultsTitle.classList.add('h1')
  resultsTitle.innerText = "Gem Results"
  list.appendChild(resultsTitle)


  results.forEach((result) => {

    const ul = document.createElement('ul')
    ul.classList.add('item')
    list.appendChild(ul)


    const gemName = document.createElement('li')
    gemName.innerText = result.name
    gemName.classList.add("gemName")
    ul.appendChild(gemName)

    const gemInfo = document.createElement('li')
    gemInfo.innerText = result.info
    gemInfo.classList.add('gemInfo')
    ul.appendChild(gemInfo)

    const saveButton = document.createElement('button')
    saveButton.innerHTML = 'Save'
    saveButton.classList.add('save')

    saveButton.onclick = function () {
      savedItems(result)
    };
    ul.appendChild(saveButton)

  })

}


function savedItems(result) {


  const savedGem = {
    name: result.name,
    info: result.info,
  }

  let savedGems =  JSON.parse(localStorage.getItem('savedGems') || '[]');
  console.log("# of saved gems: " + savedGems.length);

  
  savedGems.push(savedGem);

  localStorage.setItem('savedGems', JSON.stringify(savedGems));

  // console.log("Added gem" + savedGem.name);

  // savedGems.forEach(function(gem, index) {
  //     console.log("[" + index + "]: " + gem.savedGemName);
  //   });
  
console.log(savedGems)


  // localStorage.setItem('savedGemName', result.name);
  // localStorage.setItem('savedGemInfo', result.info);

}

function listSavedItems() {
  removeItems()
  // const name = localStorage.getItem('savedGemName');
  // const info = localStorage.getItem('savedGemInfo');
  const savedGems = JSON.parse(localStorage.getItem('savedGems') || '[]');
  // console.log(savedGems)
  // console.log(savedGems[0].name)


  // let myStorage = window.localStorage;
  // console.log(myStorage)

  const list = document.createElement('div')
  list.classList.add('list')
  listing.appendChild(list)


  const savedTitle = document.createElement('h1')
  savedTitle.classList.add('h1')
  savedTitle.innerText = "Your Saved Gems"
  list.appendChild(savedTitle)

  if (savedGems.length > 0) {
    console.log("gem exists")

    
    const removeAllButton = document.createElement('button')
    removeAllButton.innerHTML = 'Delete All'
    removeAllButton.classList.add('delete')

    removeAllButton.onclick = function () {
      removeAllItems()
    };
    list.appendChild(removeAllButton)


    //map over local storage array to get each saved gems info
    savedGems.forEach((gem) => {
      console.log(gem.name)

    const ul = document.createElement('ul')
    ul.classList.add('item')
    list.appendChild(ul)

    const savedName = document.createElement('li')
    savedName.innerText = gem.name
    savedName.classList.add("savedName")
    ul.appendChild(savedName)

    const savedInfo = document.createElement('li')
    savedInfo.innerText = gem.info
    savedInfo.classList.add('savedInfo')
    ul.appendChild(savedInfo)

    const removeButton = document.createElement('button')
    removeButton.innerHTML = 'Delete'
    removeButton.classList.add('delete')

    removeButton.onclick = function () {
      removeItem()
    };
    ul.appendChild(removeButton)
  })
  
  } else {
    console.log("gem does not exist")
    const noSaved = document.createElement('h3')
    noSaved.classList.add('h3')
    noSaved.innerText = "You do not have any saved gems!"
    list.appendChild(noSaved)
  }
}

function removeItem() {
  localStorage.removeItem('savedGemName');
  localStorage.removeItem('savedGemInfo');
  listSavedItems()
}

function removeAllItems() {
  localStorage.clear();
  listSavedItems()
}



form.addEventListener('submit', (event) => {
  event.preventDefault()
  getSearchResults(input.value)
})

savedPageButton.addEventListener('click', (event) => {
  event.preventDefault()
  listSavedItems()
})


function removeItems() {
  while (listing.firstChild) {
    listing.removeChild(listing.firstChild)
  }
}
