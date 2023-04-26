import classes from "./CountryCard.module.css"

const CountryCard = ({ flagUrl, name, commonName, cca2, cca3, capital, region, rank }) => {
  
  return (
    <section className={classes["card"]}>
      <img className={classes["card__img"]} src={flagUrl} alt={ `country flag of ${name}` } />
      <header className={classes["card__header"]}>
        <p className={classes["card__name"]}>{name}</p>
        <p className={classes["card__aka"]}><span className={classes["bold"]}>AKA: </span>{ `${commonName}, ${cca2}, ${cca3}` }</p>
        <p className={classes["card__capital"]}><span className={classes["bold"]}>Capital: </span>{capital}</p>
        <p className={classes["card__region"]}><span className={classes["bold"]}>Region: </span>{region}</p>
        <p className={classes["card__rank"]}><span className={classes["bold"]}>Rank: </span>{rank}</p>
      </header>
  </section>
  );

}

export default CountryCard;