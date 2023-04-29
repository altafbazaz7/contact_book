import {MapContainer, TileLayer, useMap, Circle, Popup} from 'react-leaflet'
import {CountryType, MapProps} from '../../Types/covidDataType'




function Map({countries, center, zoom}: MapProps) {
   const foundUSA = countries.find((item : any) => item.country === "USA")
   const biggestCases = foundUSA?.cases
   
   const looksNormalMaxRadiusCoefficient = 5000000000 / ( biggestCases || 100000000 ) 
   
   function SetCenter({newCenter, newZoom}: {newCenter: [number, number], newZoom: number}) {
      const map = useMap();
      map.setView(newCenter, newZoom);
      return null;
   }

   const showDataOnMap = (data: Array<CountryType>) => {
      return data && data.map(country => ( country.countryInfo.lat &&
         <Circle
            key={country.country}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color="#CC1034"
            fillColor="#CC1034"
            radius={
               Math.sqrt(country.cases) * looksNormalMaxRadiusCoefficient
            }
         >
            <Popup>
               <div className='info-container'>
                  <div
                     className="info-flag"
                     style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                  ></div>
                  <div className="info-name">{country.country}</div>
                  <div className="info-confirmed">
                     Confirmed cases: {country.cases}
                  </div>
               </div>
            </Popup>
         </Circle>
      ))
   }
   
   return (
      <div className='map'> 
         <MapContainer 
            center={[30, 15]}   
            zoom={3}
         >
            <SetCenter newCenter={center} newZoom={zoom}/>
            <TileLayer
               attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />            
            {showDataOnMap(countries)}
         </MapContainer>
      </div>
   )
}

export default Map
