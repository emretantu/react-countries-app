import { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import Search from "./Search";

const Aside = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(res => res.json())
      .then(res => {
        setData(
          res.map((currData) =>  {
            const searchTerm =  currData.name.common + " " + currData.name.common + " "
            + currData.name.official + " " +currData.name.official + " "
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
            return {...currData, searchTerm: searchTerm.toLowerCase()};
          })
        )
      })
      .catch(console.error("Fetching or setting data error!"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    const handleSortData = ({ ascendingOrder, prop }) => {
    prop = prop || ["rank"];
    setData(() => {
      const newData = [...data];
      newData.sort((a, b) => {
        let propA = a;
        let propB = b;
        for (const el of prop) {
          propA = propA[el];
          propB = propB[el];
        }
        if (propA < propB) {
          if (ascendingOrder) {
            return -1;
          }
          return 1;
        }
        if (propA > propB) {
          if (ascendingOrder) {
            return 1;
          }
          return -1;
        }
        return 0;
      });
      return newData;
    });
  }

  const handleSearch = (queryTermStr) => {
    const queryTermWords = queryTermStr.trim().split(" ");
    const queryTerms = queryTermWords.map(word => ({term: word, baseScore: 1}));
    for (let i = 1; i < queryTermWords.length; i++) {
      for (let j = 0; j + i < queryTermWords.length; j++) {
        let term = "";
        for (let k = j; k < i + j + 1; k++) {
          term = term + " " + queryTermWords[k];
        }
        queryTerms.push({term: term.trim(), baseScore: i+1});
      }
    }
    console.log(queryTerms);
  }

  return (
    <>
      <Search onSearch={handleSearch} />
      {
        data.length === 0
          ? <h1>Loading...</h1>
          : data.map((curData, index) => <CountryCard key={index} flagUrl={curData.flags.png} name={curData.name.official} commonName={curData.name.common} cca2={curData.cca2} cca3={curData.cca3} capital={curData.capital} region={curData.region} />)
      }
    </>
  );
  
}

export default Aside;