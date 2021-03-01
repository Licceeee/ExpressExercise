const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 9000;
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
const routes = require('./CountryRouter')

app.use('/api/v1/countries', routes);


app.get('/', (req, res) => {
    res.render('pages/index', {
        title: "Country Bucket List API",
    });
})


app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))