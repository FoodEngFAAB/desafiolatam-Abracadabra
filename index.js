//Exportar módulos
const express = require('express')
const fs = require('fs')
const { nextTick } = require('process')

//Almacena en constante app
const app = express()
//Configura el puerto
const port = 3000

//REQ 1 Crear un servidor con Express que escuche el puerto PORT
app.listen(port, () => {
    console.log(`El servidor está inicializado en el puerto ${port}`)
})

//REQ 2 Definir la carpeta “assets” como carpeta pública del servidor.
app.use(express.static("assets"))

//REQ 3 Crear en el servidor un arreglo de usuarios y devolverlo en formato JSON a través de la ruta /abracadabra/usuarios.
app.get("/abracadabra/usuarios", (req, res) => {
    res.sendFile(__dirname + '/usuarios.json')
})

//REQ 4 Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el usuario recibido como parámetro “usuario” existe en el arreglo de usuarios creado en el servidor.
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const { usuario } = req.params
    const users = JSON.parse(fs.readFileSync('./usuarios.json', 'utf-8'))
    const userList = users.usuarios.filter((i) => i == usuario)
    //REQ 4 En caso de ser exitoso, permitir el paso a la ruta GET correspondiente (next()), de lo contrario devolver la imagen “who.jpeg”.
    usuario == userList ? next() : res.redirect('/who.jpeg')
})

//En caso de ser exitoso, permitir el paso a la ruta GET correspondiente
app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

//REQ 5 Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el número generado de forma aleatoria.
app.get("/abracadabra/conejo/:n", (req, res) => {
    const num = Math.floor(Math.random() * (4 - 1)) + 1
    const number = req.params.n
    //En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la imagen de Voldemort.
    num == number ? res.sendFile(__dirname + '/assets/conejito.jpg') : res.sendFile(__dirname + '/assets/voldemort.jpg')
})

//REQ 6 Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...” al consultar una ruta que no esté definida en el servidor.
app.get("*", (req, res) => {
    //res.send(`<center><h1 style="color:#1954EF">Esta página no existe<br><br> &#128550 &#128551 &#128556 &#128552 &#128553 &#128555 &#128557 <br><br>404 Page Not Found<br><br> &#129300</h1> <h2>¿O será error entre la silla y el computador?<br><br>&#9748</h2><center>`)
    const n = Math.floor(Math.random() * (5 - 1)) + 1
    const file = `/assets/404Error0${n}.jpeg`
    res.sendFile(__dirname + file)
})