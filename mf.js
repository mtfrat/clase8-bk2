const fs = require('fs')
const express = require('express')

const app = express()

app.use(express.json())

// Función para leer el archivo
let lecturaArchivo = () =>{
    let data = fs.readFileSync("productos.txt",'utf-8')
    let dataObj = JSON.parse(data)
    return dataObj
}

const connectedServer = app.listen(8080, ()=>{
    console.log("Listening on port 8080")
})

app.get('/api/products', (req,res)=>{

    let objects = []
    let datos = lecturaArchivo()

    for(let i in datos){
        objects.push(datos[i])
    }
    res.send(objects)
})

app.get('/api/products/:id', (req,res)=>{

    let productID = Number(req.params.id)
    let data = lecturaArchivo()

    for(let i in data){
        if(data[i].id === productID)
        res.send(data[i])
    }
})

app.post('/api/products', (req,res)=>{
    let data = lecturaArchivo()
    let newId = Object.keys(data).length + 1

    let object = ({"title": "Lápiz", "price": 200,"thumbnail":"https://cdn1.iconfinder.com/data/icons/drawing-tools-5/512/pencil-256.png"})
    object.id = newId
    data.push(object)
    res.send(data)
})

app.delete('/api/products/:id', (req,res)=>{
    let productID = Number(req.params.id)
    let data = lecturaArchivo()

    for(let i in data){
        if(data[i].id === productID)
        data.splice(i, 1)
    }
    res.send(data)
})

app.put('/api/products/:id', (req,res)=>{
    let productID = Number(req.params.id) -1
    let data = lecturaArchivo()

    data[productID].price = 200

    res.send(data)
})