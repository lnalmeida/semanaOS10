import React, { useState, useEffect } from 'react'

function DevForm ({ onSubmit }) {
      const [github_username, setGithubUsername] = useState('')
      const [techs, setTechs] = useState('')
      const [mapLatitude, setMapLatitude] = useState('')
      const [mapLongitude, setMapLongitude] = useState('')

        useEffect(() => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {
                        latitude,
                        longitude
                    } = position.coords
                    setMapLongitude(longitude)
                    setMapLatitude(latitude)
                }, (err) => {
                    console.log(err)
                }, {
                    timeout: 30000,
                }
            )
        }, [])

        async function handleSubmit(e) {
            e.preventDefault()
            await onSubmit({
                github_username,
                techs,
                latitude: mapLatitude,
                longitude: mapLongitude,
            })
                setGithubUsername('')
                setTechs('')
        }

    return (
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário GitHub</label>
            <input 
              name="github_username" 
              id="github_username" 
              required
              value={github_username}
              onChange={e => setGithubUsername(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
              name="techs" 
              id="techs" 
              required 
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
          </div>       

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type="number" 
                name="latitude"  
                id="latitude" 
                required 
                value={mapLatitude}
                onChange={e => setMapLatitude(e.target.value)}
              />
            </div>  

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                type="number" 
                name="longitude"  
                id="longitude" 
                required 
                value={mapLongitude}
                onChange={e => setMapLongitude(e.target.value)}
              />
            </div>  
          </div>
         
         <button type="submit">Salvar</button>
        </form>
    )
}

export default DevForm