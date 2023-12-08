const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json())

app.post('/', async function(req, res) {
  try {
    let results = await Promise.all(req.body.developers.map(async username => {
      return await axios.get(`https://api.github.com/users/${username}`);
    }));
    let out = results.map(user => ({ 
      name: user.data.name, 
      bio: user.data.bio 
    }));

    return res.send(JSON.stringify(out));
  } catch (err) {
    throw err
  }
});

app.listen(3000);
