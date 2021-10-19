const e = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3001;
const app = express ();
//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
// express.static('public') allows the server to use the rest of the files for styling and js
app.use(express.static('public'));



function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
  }

  function createNewAnimal(body, animalsArray) {
      const animal = body;
      animalsArray.push(animal);
      fs.writeFileSync(
          path.join(__dirname, '../data/animals.json'),
          JSON.stringify({ animals: animalsArray }, null, 2)
      );
      return animal;     
  }

  function validateAnimal(animal) {
      if (!animal.name || typeof animal.name !== 'string') {
          return false;
      }
      if (!animal.species || typeof animal.species !== 'string') {
          return false;
      }
      if (!animal.diet || typeof animal.diet !== 'string') {
          return false;
      }
      if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)){
      return false;
    } 
    return true;
  }

app.listen(PORT, () => {
    console.log(`APO server now on port ${PORT}`);
});