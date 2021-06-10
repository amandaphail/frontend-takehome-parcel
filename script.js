const BASE_URL = 'http://localhost:3000'

// const submit = document.querySelector('.submit')
const listing = document.querySelector('.listing')
const form = document.querySelector('.search-section')
const input = document.querySelector('#blank')
const savedPageButton = document.querySelector('#saved')

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
  
  localStorage.setItem('savedGemName', result.name);
      localStorage.setItem('savedGemInfo', result.info);
      const name = localStorage.getItem('savedGemName');
      const info = localStorage.getItem('savedGemInfo');
      
      alert(`Saved ${name} - ${info} to localStorage`)

      // localStorage.clear();
}

function listSavedItems() {
  removeItems()
  const name = localStorage.getItem('savedGemName');
  const info = localStorage.getItem('savedGemInfo');

  const list = document.createElement('div')
  list.classList.add('list')
  listing.appendChild(list)

  const savedTitle = document.createElement('h1')
  savedTitle.classList.add('h1')
  savedTitle.innerText = "Saved Gems"
  list.appendChild(savedTitle)

  const ul = document.createElement('ul')
    ul.classList.add('item')
    list.appendChild(ul)


    const savedName = document.createElement('li')
    savedName.innerText = name
    savedName.classList.add("savedName")
    ul.appendChild(savedName)

    const savedInfo = document.createElement('li')
    savedInfo.innerText = info
    savedInfo.classList.add('savedInfo')
    ul.appendChild(savedInfo)

    const removeButton = document.createElement('button')
    removeButton.innerHTML = 'Delete'
    removeButton.classList.add('delete')

    removeButton.onclick = function () {
      removeItem()
    };
    ul.appendChild(removeButton)
  
}

function removeItem() {
  // console.log(name, info)
  localStorage.removeItem('savedGemName');
  localStorage.removeItem('savedGemInfo');

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
