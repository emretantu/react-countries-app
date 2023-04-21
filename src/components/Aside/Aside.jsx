import { useEffect, useState } from "react";
import CountryCard from "./CountryCard";

const Aside = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(res => res.json())
      .then(res => {
        setData(
          res.map((currData) =>  {
            const searchTerm =  currData.name.common + " "
            + currData.name.official + " "
            + currData.cca2 + " "
            + currData.cca3 + " "
            + currData.region + " "
            + currData.subregion + " "
            + currData.altSpellings.reduce((acc, cur) => acc + cur + " ", "")
            + (currData.capital !== undefined ? currData.capital.reduce((acc, cur) => acc + cur + " ", "") : "")
            + (currData.continents !== undefined ? currData.continents.reduce((acc, cur) => acc + cur + " ", "") : "")
            + (currData.currencies !== undefined ? Object.keys(currData.currencies).reduce((acc, cur) => acc + cur + " ", "") : "")
            + (currData.currencies !== undefined ? Object.values(currData.currencies).reduce((acc, cur) => acc + cur.name + " " + cur.symbol + " ", "") : "")
            + (currData.languages !== undefined ? Object.keys(currData.languages).reduce((acc, cur) => acc + cur + " ", "") : "")
            + (currData.languages !== undefined ? Object.values(currData.languages).reduce((acc, cur) => acc + cur + " ", "") : "")
            + (currData.timezones !== undefined ? currData.timezones.reduce((acc, cur) => acc + cur + " ", "") : "");
            return {...currData, searchStr: searchTerm};
          })
        )
      })
      .catch(console.error("Fetching or setting data error!"));
  }, []);

  return (
    <>
      {
        data.length === 0
          ? <h1>Loading...</h1>
          : data.map((curData, index) => <CountryCard key={index} flagUrl={curData.flags.png} name={curData.name.official} commonName={curData.name.common} cca2={curData.cca2} cca3={curData.cca3} capital={curData.capital} region={curData.region} />)
      }
    </>
  );
  
}

export default Aside;