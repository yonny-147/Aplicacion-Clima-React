import { useState } from "react"

export const WeatherApp = () => {

  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = 'eebe8627a8cf62e3440cbc0ce3141d12'
  const difKelvin = 273.15
  const [ciudad, setCiudad ] = useState('')
  const [dataClimate, setDataClimate] = useState(null)

  const handleChangeCity = (e) => {
    setCiudad(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(ciudad.length > 0) fetchClimate()
  }
  const fetchClimate = async () => {
    try{
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
      const data = await response.json()
      setDataClimate(data)
    }catch(err){
      console.error("Ocurrio el siguiente problema:",err)
    }
  }
  return (
    <div className="container">
      <h1>Aplicación del clima</h1>
        <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              value={ciudad} 
              onChange={handleChangeCity}
            />
            <button type="submit">Buscar</button>
        </form>
        {
          dataClimate && (
            <>
              <p>Ciudad: {dataClimate.name}</p>
              <p>Temperatura: {parseInt(dataClimate?.main?.temp - difKelvin)}ºC</p>
              <p>Condicion meteorologica: {dataClimate?.weather[0].description}</p>
              <img src={`https://openweathermap.org/img/wn/${dataClimate.weather[0].icon}@2x.png`}/>
            </>
            )
        }
    </div>
  )
}
