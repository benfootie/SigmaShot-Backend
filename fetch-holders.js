const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Allow requests from your frontend domain
app.use(cors({
  origin: 'https://benfootie.github.io'
}));

app.get('/api/fetch-holders', async (req, res) => {
  const { contractAddress, pageIndex, pageSize } = req.query;
  const apiKey = process.env.BLOCKVISION_API_KEY;

  const url = `https://api.blockvision.org/v2/monad/collection/holders?contractAddress=${contractAddress}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json',
        'x-api-key': apiKey
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});