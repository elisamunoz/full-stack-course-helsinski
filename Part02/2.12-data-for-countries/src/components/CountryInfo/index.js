import Button from "../Button";

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
