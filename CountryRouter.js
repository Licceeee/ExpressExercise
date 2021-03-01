const express = require('express');

const { validationResult } = require('express-validator');

const { validateName, validatealpha2Code,
        validatealpha3Code, validateVisited } = require('./validators') 

const { findCountry, countryExists } = require('./utils');
const countries = require('./countries')

const router = express.Router();

// ------------------------------------------------------- GET
// localhost:9000/api/v1/countries/?sort=true&visited=false
router.get('/', (req, res) => {
    let newList = countries
    if (req.query.sort === "true") {
        const sorted = countries.sort((b, a) => {
            if (a.name > b.name) {
                return -1;
            } if (b.name > a.name) {
                return 1;
            }
            return 0
        })
        newList = sorted
    }
    if (req.query.visited === "true") {
        newList = newList.filter((country) => country.visited === true)
    } else if (req.query.visited === "false"){
        newList = newList.filter((country) => country.visited === false)
    } 
    res.render('pages/list', {
        title: "Country Bucket List API",
        newList: newList,
    });
    // res.send(newList);
});

// ------------------------------------------------------- GET:CODE
router.get('/:code', (req, res) => {
    const country = findCountry(countries, req.params.code)
    if (country) {
        res.send(country)
    } 
    res.status(404).send("Country does not exist")
})

// ------------------------------------------------------- PUT:CODE
router.put('/:code', 
    [validateName, validatealpha2Code, validatealpha3Code, validateVisited], 
    (req, res) => {
        
    const errors = validationResult(req) 
        if(!errors.isEmpty()){ 
            return res.send({errors}) 
        }
    
    const {name, alpha2Code, alpha3Code, visited} = req.body

    const country = findCountry(countries, req.params.code)

    if (!country) {
        res.status(404).send("No such country")
    } else {
        if (countryExists(countries, alpha2Code) 
                || 
            countryExists(countries, alpha3Code)) {
            res.status(404).send(
                `The country ${name} ${alpha2Code} - ${alpha3Code}, already exists.`)
        } else {
            country.name = name
            country.alpha2Code = alpha2Code
            country.alpha3Code = alpha3Code
            country.visited = visited
            res.status(200).send(country);
        }
    }
})

// ------------------------------------------------------- POST
router.post('/',
    [validateName, validatealpha2Code, validatealpha3Code, validateVisited], 
    (req, res) => {
    const errors = validationResult(req) 
        if(!errors.isEmpty()){ 
        return res.send({errors}) 
    } 
    const {name, alpha2Code, alpha3Code, visited} = req.body 

    const newCountry = {
        id: countries.length + 1,
        name: name,
        alpha2Code: alpha2Code,
        alpha3Code: alpha3Code,
        visited: visited,
    }
    console.log(newCountry)


    if (countryExists(countries, newCountry.alpha3Code) 
            || 
        countryExists(countries, newCountry.alpha2Code))
        {
            res.status(404).send("Country already exists");
        } else {
            try {
                countries.push(newCountry)
                res.render('pages/list', {
                    title: "Country Bucket List API",
                    newList: countries,
                });

                res.status(201).send(countries)
                
            } catch (error) {
                res.status(404).send(error);
            }
        }

 })

// ------------------------------------------------------- DELETE:CODE
router.delete('/:code', (req, res) => {
    const country = findCountry(countries, req.params.code)
    if (!country) return res.status(404).send("No such country")
    country.visited = !country.visited

    res.status(200).send(country)
})

// ------------------------------------------------------- DELETE:CODE:HARD
router.delete('/:code/hard', (req, res) => {
    const country = findCountry(countries, req.params.code)
    if (!country) return res.status(404).send("No such country")
    const index = countries.indexOf(country)
    countries.splice(index, 1)
    res.status(200).send(countries)
})


module.exports = router;















