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
            return {...currData, searchTerm: searchTerm.toLowerCase(), rank: 1};
          })
        )
      })
      .catch(console.error("Fetching or setting data error!"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    const getSortedData = (data, { ascendingOrder, prop }) => {
      if(!prop || !data) return; 
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
    }

    const handleSortData = ({ ascendingOrder, prop }) => {
    if(!prop) return;
    setData(() => {
      getSortedData(data, {ascendingOrder, prop});
    });
  }

  const handleSearch = (queryTermStr) => {
    // generating query terms from query string and their base scores
    const queryTermWords = queryTermStr.trim().toLowerCase().split(" ");
    const queryTerms = queryTermWords.map(word => ({term: word, baseScore: 1}));
    for (let i = 1; i < queryTermWords.length; i++) {
      for (let j = 0; j + i < queryTermWords.length; j++) {
        let term = "";
        for (let k = j; k < i + j + 1; k++) {
          term = term + " " + queryTermWords[k];
        }
        queryTerms.push({term: term.trim(), baseScore: (i+1)**2});
      }
    }
    // term counter function
    const termCounter = (mainStr, subStr) => {
      return mainStr.split(subStr).length - 1;
    }
    // ranking
    let newData = [...data];
    newData =  newData.map((curData) => {
      const searchTerm = curData.searchTerm;
      const rank = queryTerms.reduce((acc, queryTerm) => {
        const count = termCounter(searchTerm, queryTerm.term);
        console.log("count: ", count);
        return acc + count * queryTerm.baseScore;
      }, 0);
      return {...curData, rank};
    })
    setData(getSortedData(newData, {ascendingOrder: false, prop: ["rank"]}));
  }

  return (
    <>
      <Search onSearch={handleSearch} />
      {
        data.length === 0
          ? <h1>Loading...</h1>
          : data
              .filter((curData) => curData.rank)
              .map((curData, index) => (
                <CountryCard
                key={index}
                flagUrl={curData.flags.png}
                name={curData.name.official}
                commonName={curData.name.common}
                cca2={curData.cca2}
                cca3={curData.cca3}
                capital={curData.capital}
                region={curData.region}
                rank={curData.rank} />
              ))
      }
    </>
  );
  
}

export default Aside;