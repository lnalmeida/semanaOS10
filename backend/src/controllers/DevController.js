const axios = require('axios')
const Dev = require('../models/Dev')
const parseArrayAsString = require('../utils/parseArrayAsString')

module.exports = {
    
    async index (request, response) {
        const devs = await Dev.find()
            if(devs) {
                return response.json(devs)
            } else {
                return response.json({"message":"Nenhum Dev encontrado!"})
            }
    },
    
    async show(request, response) {
        const {id} = request.params
        console.log(id)
        const dev = await Dev.findById(id)
    
        if(dev){
            return response.json(dev)
        } else{
            return response.json({"message":"Dev não encontrado!"})
        }
    },

    async store (request, response) {

        const { github_username, techs, latitude, longitude  } = request.body

        let dev = await Dev.findOne({github_username})

        if(dev) {
        return response.json({ "message":"Dev já Cadastrado!"}) 
        } else {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

            const { name = login, avatar_url, bio } = apiResponse.data

            const techsArray = parseArrayAsString(techs)

            const location = {
                type: 'Point',
                coordinates: [parseFloat(longitude), parseFloat(latitude)]
                }

            const dev = await Dev.create({
                name,
                github_username,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
            return response.json(dev)
        }
    },

    async update(request, response) {
        const { id } = request.params
        let dev = await Dev.findById(id)
        const { name, avatar_url, bio, techs, location } = request.body
        //console.log( dev )
        if(dev) {
            const dev = await Dev.findByIdAndUpdate(id, { ...dev,
                name,
                avatar_url, 
                bio,
                techs, 
                location,
            }, {new: true})

             return response.json(dev)
    
            //Dev.save()
        } else {
            return response.json({"message":"Dev não localizado!"})
        }      
    }, 

    async destroy (request, response) {
        const { id } = request.params
        console.log(id)
        const dev = await Dev.findByIdAndDelete(id)

        return response.json({"message":"Registro Apagado!"})
    }
}