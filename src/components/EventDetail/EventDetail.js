import React from 'react';
import "./EventDetail.scss"
import Dashhead from '../Dashhead/Dashhead';
import moment from 'moment'
import GoogleMapReact from 'google-map-react';
import Profile from '../images/profile.png'
import ModalExampleBasic from '../utils/ModalExampleBasic';

const AnyReactComponent = ({ text }) => <div>{text}</div>;




const EventDetail = (props) => {
    let event = props.location.state
    console.log("props",props);

    const handleDelete = ()=>{
        
    }
    return (
        <div>
            <div className="row">
            
            <div className="col-2">
            <Dashhead id="1" />
            </div>

            <div className="event-detail col-10">
            <h1 className="heading">{event.name}</h1>
            <div className="event-info row">
                <p className="red-status eventstatus">{event.status}</p>
                <p className="green-status eventtype">{event.type}</p>
            </div>

            <div className="service row">
            {
                event.reqServices.length > 0?(
                    event.reqServices.map(item=><span className="servicetag"><i class="fas fa-tags"></i> {item}</span>)
                ):null
            }
            </div>
           

            <div style={{ height: '50vh', width: '100%' }}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCon5_1FtHKMlr3goiHqkWjaD63WSCvxJE'}}
                defaultCenter={{lat:event.location.latitude,lng:event.location.longitude}}
                defaultZoom={25}
                >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                />
                </GoogleMapReact>
            </div>

            <div className="organizerinfo">
            <p>Organiser Name: {event.organiserName}</p>
            <p>Email : {event.email}</p>
            <p>Organiser Address : {event.address}</p>
            <p>Organiser Mobile No : {event.mobileNo}</p>
            </div>
            <p className="green-status">{moment.parseZone(event.start).local().format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
                <p className="red-status">{moment.parseZone(event.end).local().format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
            <p className="description">
                {event.description}
            </p>
            
            <p>
                {event.eventAddress}
            </p>
            {
                //`${process.env.DEVELOPMENT}/api/user/image/${item.userId.img}`
            }
            {
                event.bids.length>0?(
                    event.bids.map(item=>(
                        <div key={item._id} className="shadow-sm bid-container">
                            <div className="row">

                                <div className="col-1">
                                <img className="profile" src={Profile} alt={item.userId._id} />
                                </div>

                                <div className="col-4">
                                <h2 className="name">{item.userId.name}</h2>
                                <p className="email">{item.userId.email}</p>
                                <p className="mobile">{item.userId.mobileNo}</p>
                                <p className="org">{item.userId.organisation}</p>
                                </div>

                                <p className="status col-2">{item.status}</p>
                                <p className="price col-2">{item.totalPrice}$</p>
                                {/* <p className="col-2">
                                <ModalExampleBasic component={<span className="bid"><i class="fa fa-trash" aria-hidden="true"></i></span>}
                                title="Delete Bid"
                                description="Are you sure, you want to delete this bid?"
                                handleDelete = {handleDelete}
                                /></p> */}
                                {
                                    // <span className="bid"><i class="fa fa-trash" aria-hidden="true"></i></span>
                                }
                                
                                
                            </div>
                            
                            
                            <p className="description">{item.description}</p>
                            <div className="services-div">
                                {
                                    item.services.length>0?(
                                        item.services.map((service,ind)=>(
                                            <div key={ind} className="row service-container">
                                                <p className="col-1">{ind+1}</p>
                                                <p className="col-3">{service.category}</p>
                                                <p className="col-3">{service.subCategory}</p>
                                                <p className="col-2">{service.quantity}</p>
                                                <p className="col-3">{service.price}$</p>
                                            </div>
                                        ))
                                    ):null
                                }
                            </div>
                        </div>
                    ))
                ):null
            }
            

            </div>

            </div>
        </div>
    );
}

export default EventDetail;