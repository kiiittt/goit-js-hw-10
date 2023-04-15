import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('input');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

let countryName;

searchInput.addEventListener('input', debounce(() => {
    fetchCountries() 
        .then((data) => renderCountriesList(data))
        .catch((error) => {
            Notiflix.Notify.failure('Oops, there is no country with that name')
            countryList.innerHTML = ''
            countryInfo.innerHTML = ''
        })
}, DEBOUNCE_DELAY));

function fetchCountries() {
    countryName = searchInput.value;
    countryName.trim();
    return fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
};

fetchCountries()
    .then((data) => renderCountriesList(data))
    .catch((error) => {
        Notiflix.Notify.failure('Oops, something went wrong')
    })

function renderCountriesList(data) {
  countryList.innerHTML = data.map((item) => {
    return `<li class='no-bullets'>
    <div class="info-flex">
    <img src="${item.flags.svg}" class="biggerIcon">
    <p>${item.name.official}</p>
    </div>
  </li>`;
  })
  
  if (countryName.length < 2) {
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    countryList.innerHTML = ''
    countryInfo.innerHTML = ''
  }
  if (countryName.length > 3) {
    countryList.innerHTML = ''

    countryInfo.innerHTML = `<div class="info-flex"><img src="${data[0].flags.svg}" class="biggerIcon"><h3 class="biggerFont">${data[0].name.official}</h3></div>
  <li class='no-bullets'><b>Capital: </b> ${data[0].capital}</li>
  <li class='no-bullets'><b>Population: </b> ${data[0].population}</li>
  <li class='no-bullets'><b>Languages: </b> ${Object.values(data[0].languages).toString().split(',').join(', ')}</li>
  `;
  }
}

