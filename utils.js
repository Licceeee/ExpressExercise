const countryExists = (countries, code) => {
  console.log(countries)
    return countries.some((country) => {
      return country.alpha2Code === code || country.alpha3Code === code;
    }); 
  }

const findCountry = (countries, code) => {
    return countries.find(country => 
        country.alpha2Code === code.toUpperCase()
            || 
        country.alpha3Code === code.toUpperCase()
    )
}

module.exports = {
    findCountry: findCountry,
    countryExists: countryExists,
  };