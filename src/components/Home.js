import React from 'react'
import "./Home.scss"
import Dashhead from './Dashhead/Dashhead';
import GoogleMapReact from 'google-map-react';
import axios from 'axios'
import moment from 'moment'
import OwnMarker from './utils/Marker/OwnMarker';
import Marker from './utils/Marker/Marker'
import {connect} from 'react-redux'
const Home = (props) => {
    const [location,setLocation]=React.useState(null)
    const [data,setData]=React.useState([])
    const divref = React.useRef(null)
    const [error,setError] = React.useState("")

    const getLocation = async ()=>{
      window.navigator.geolocation.getCurrentPosition((loca)=>{
        console.log(loca)
        setLocation({center:{lat:loca.coords.latitude,lng:loca.coords.longitude},zoom:18})
      },(err)=>setError(err.message));
    }

    React.useEffect(()=>{
      getLocation()
      axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/event/all-event-bids`,{headers:{token:props.user.user}})
      .then(res=>{
       
        if(res.data.result.length>0){
          setData(res.data.result)
        }
      }).catch(err=>{
        console.log(err);
      })
    },[])

    console.log(location)

    return (
        <div className="homeclass">
            <div className="row">
            
            <div className="col-2">
            <Dashhead  id="1" />
            </div>

            <div className="col-10" ref={divref}>
            <h1 className="heading">
               Nearest Events
            </h1>
            {location&&<div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyApu8IT6wCh_NXaoMzhOaUzWNvt3fuFm2Y'}}
          defaultCenter={location.center}
          defaultZoom={location.zoom}
        >
           <OwnMarker 
      lat = {location.center.lat}
      lng={location.center.lng}
      text="My Location"
      />
          {data.map((marker,index)=>(
            <Marker
            key={index}
            lat={marker.location.latitude}
            lng={marker.location.longitude}
            text={marker.name}
          />
          ))}
        </GoogleMapReact>
      </div>}

        <div className="event row">
        {
          data.length>0?(
            data.map((item,index)=>(
              <div key={index} className={item.status.toLowerCase()!=="over"?"col-5 shadow event-item":"col-5 shadow event-item-grey"} onClick={()=>props.history.push('eventdetail',item)}>
                <div className="row">
                    <p className="event-heading">{item.name} </p>
                    <p className="bids-subs">Bids  {item.totalBids}</p>
                    <p className="bids-subs">Subs  {item.totalSubs}</p>
                </div>
                <p className="red-status">{item.status}</p>
                  <p className="description">{item.description}</p>
                  <p>{item.eventAddress}</p>
                <p className="green-status">{moment.parseZone(item.start).local().format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
                <p className="red-status">{moment.parseZone(item.end).local().format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
            </div>
            ))
          ):null
        }
        </div>



          {/* this is the end of col12 */}
            </div>
            </div>
        </div>
    );
}
const mapStateToProps = ({EventUser})=>{
  return {
      user:EventUser
  }
}
export default connect(mapStateToProps)(Home);