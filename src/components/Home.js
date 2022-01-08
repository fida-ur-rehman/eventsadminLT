import React from 'react'
import "./Home.scss"
import Dashhead from './Dashhead/Dashhead';
import GoogleMapReact from 'google-map-react';
import axios from 'axios'
import moment from 'moment'
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Home = (props) => {
    const [location,setLocation]=React.useState({center:{lat:59.95,lng:30.33},zoom:11})
    const [data,setData]=React.useState([])
    const divref = React.useRef(null)
    console.log(divref);
    React.useEffect(()=>{
      axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/event/all-event-bids`,{headers:{token:process.env.REACT_APP_TOKEN}})
      .then(res=>{
       
        if(res.data.result.length>0){
          setData(res.data.result)
        }
      }).catch(err=>{
        console.log(err);
      })
    },[])

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
            <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCon5_1FtHKMlr3goiHqkWjaD63WSCvxJE'}}
          defaultCenter={location.center}
          defaultZoom={location.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>

        <div className="event row">
        {
          data.length>0?(
            data.map((item,index)=>(
              <div key={index} className="col-5 shadow event-item" onClick={()=>props.history.push('eventdetail',item)}>
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

export default Home;