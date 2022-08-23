import { useState, useEffect } from "react";
// import axios from "axios";
import { DATA_CHILE } from "./_mock";

const CountryInfo = ({ name, capital, area, languages = {}, flag }) => (
  <div>
    <h1>{name}</h1>
    <p>Capital: {capital}</p>
    <p>Area: {area}</p>
    <p>Languages:</p>
    <ul>
      {Object.values(languages).map(lang => (
        <li key={lang}>{lang}</li>
      ))}
    </ul>

    <img src={flag} alt={name} width="100" height="auto" />
  </div>
);

const CountryList = ({ name }) => <li>{name}</li>;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const countriesHook = () => {
    setCountries([DATA_CHILE]);
    setIsLoading(false);
    // axios.get("https://restcountries.com/v3.1/all").then(response => {
    //   setCountries(response.data);
    //   setIsLoading(false);
    // });
  };
  useEffect(countriesHook, []);

  const handleQuery = event => {
    setQuery(event.target.value);
  };

  const getCountryName = country => country.name.common;
  const filterCountry = countries.filter(country =>
    getCountryName(country)
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const MAX_COUNTRIES_ITEMS = 10;
  const countryLength = filterCountry.length;

  return (
    <div>
      <form>
        find countries
        <input value={query} onChange={handleQuery} disabled={isLoading} />
      </form>

      {isLoading && <span>Loading...</span>}

      {!countryLength && <p>There are no coincidences, please search again</p>}

      {countryLength > MAX_COUNTRIES_ITEMS && (
        <p>Too many matches, specify another filter</p>
      )}

      {countryLength > 1 && countryLength <= MAX_COUNTRIES_ITEMS && (
        <ul>
          {filterCountry.map(country => (
            <CountryList key={country.cca3} name={getCountryName(country)} />
          ))}
        </ul>
      )}

      {countryLength === 1 && (
        <div>
          {filterCountry.map(country => {
            console.log(country);
            return (
              <CountryInfo
                name={getCountryName(country)}
                key={country.cca3}
                capital={country.capital}
                area={country.area}
                languages={country.languages}
                flag={country.flags.svg}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
