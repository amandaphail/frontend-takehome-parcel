const BASE_URL = 'http://localhost:3000'

const submit = document.querySelector('.location')

async function getSearchResults(query) {
  try {
    const searchResult = await axios.get(`${BASE_URL}/api/v1/search.json?query=${query}`)
    
    console.log(searchResult)
  } catch (err) {
    console.log("Error Message:", err.message)
  }
}



getSearchResults("kitten")
//will have user input here on submit
//display on page: name, info