function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => console.log('An error occurred while fetching data:', error));
}