import Button from "../Button";
import WeatherInfo from "../WeatherInfo";

const CountryInfo = ({
  name,
  capital,
  area,
  languages = {},
  flag,
  lat,
  lon
}) => (
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
    <WeatherInfo capital={capital} lat={lat} lon={lon} />
  </div>
);

const CountryList = ({ name, onClick }) => {
  return (
    <div>
      <li>
        {name} <Button onClick={onClick} text="See Country" />
      </li>
    </div>
  );
};

export { CountryInfo, CountryList };
