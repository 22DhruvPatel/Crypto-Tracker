import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const API_URL = 'https://api.blockchain.com/v3/exchange';
const app = express();
const port = 3000;
const API_KEY = 'bbc19f15-f39d-4bb2-86d5-5089fe79fe45';

app.set('view engine', 'ejs'); // Set EJS as the view engine

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index'); // Render the index.ejs file
});

app.get('/price', async (req, res) => {
  const symbol = req.query.cryptoName;
  if (!symbol) {
    return res.status(400).send('Error: cryptoName query parameter is required');
  }

  try {
    const response = await axios.get(`${API_URL}/l2/${symbol}`, {
      headers: {
        'X-API-Token': API_KEY,
      },
    });

    const price = response.data.asks[0].px.toString(); // Convert price to string
    res.render('index', { price }); // Render the index.ejs template with price data
  } catch (error) {
    res.status(404).send('Error: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
