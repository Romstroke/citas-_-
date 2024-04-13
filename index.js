// codigo utilizando axios para leer una api
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;
const chalk = require('chalk');
const _ = require('lodash');
// importando un objeto con propiedad v4 y este tiene un metodo uuidv4
const { v4: uuidv4 } = require('uuid')
const moment = require('moment');
// const fechaExacta = moment("2005-05-07T06:24:59.656Z");
// console.log(fechaExacta.format('MMMM Do YYYY, h:mm:ss a')) //formato a usar (revisar length de los meses)

const usuariosRegistrados = [];

//7 mujeres y 4 hombres
// https://randomuser.me/api/?results=10

//const numeros = [1, 2, 3, 4, 5, 6];
// const usuariosPorGenero = _.partition(usuariosRegistrados, (usuario) => usuario.gender == male)

// console.log("Arreglo final: ", arregloFinal);
// console.log("Arreglo final[0]: ", arregloFinal[0]);
// console.log("Arreglo final[1]: ", arregloFinal[1]);

app.use(express.json());

// Ruta para obtener datos de Random User API

// nombre: Vicenta - Apellido: Marin - ID: 37adc3 - Timestamp: November 4th 2021, 7:32:35 pm

app.get('/randomuser', async (req, res) => {
  try {
    //leyendo una api con Axios
    const response = await axios.get('https://randomuser.me/api/?results=11');
    const objectData = response.data;
    const userData = objectData.results;
    // console.log('Fecha registro: ', userData[0].registered.date);
    
    userData.forEach(user => {
      const segundos = Math.floor(Math.random() * 60) +1;
      const fechaRegistro = moment().add(segundos,'seconds').format('MMMM Do YYYY, h:mm:ss a');
      const usuarioCreado = `Nombre: ${user.name.first} - Apellido: ${user.name.last} - ID: ${uuidv4().slice(0, 6)} - Timestamp: ${fechaRegistro}\n`;
      usuariosRegistrados.push(usuarioCreado);
    });
    // const usuariosHombre = _.partition(usuariosRegistrados, (usuario) => usuario.gender == 'male');
    // const usuariosMujer = _.partition(usuariosRegistrados, (usuario) => usuario.gender == 'female');
    // console.log(
    //   `
    //   Mujeres:

    //   ${usuariosMujer.join('')}

    //   Hombres:

    //   ${usuariosHombre.join('')}

    //   `
    //   );
    
    console.log(chalk.blue.bgWhite.bold(usuariosRegistrados.join('')));
    // console.log('users:', usuariosRegistrados);
    // conversion a Json, devuelve un objeto con un usuario
    res.json(userData);
  } catch (error) {
    console.error('Error fetching random user data:', error);
    res.status(500).json({ error: 'Error fetching random user data' });
  }
});

//levantando servidor con puerto
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});