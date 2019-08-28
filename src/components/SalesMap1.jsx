import React from "react";
import fire from '../firebase'
import { groupBy } from '../util'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

import { Card, CardBody, Row, Col } from "reactstrap";

const mapStyles = {
  width: '100%',
  height: '100%',
};

const db = fire.firestore()

function personSalesList1(arr){
    let customers = []
    for (const [ key, value ] of Object.entries(arr)) {
      const number = value.map(c => c.price).length
      const customerId = value.map(c => c.customerId)[0]
      const customerLat = value.map(c => c.customerLat)[0]
      const customerLong = value.map(c => c.customerLong)[0]
      const sales = value.map(p => parseFloat(p.cartTotal)).reduce((a,b) => a + b, 0)

      let item = {customerId:customerId, name:key, customerLat:customerLat, customerLong:customerLong, sales:sales, number:number,msg: key + ' - $' + sales}
      customers.push(item)
    }

    return customers
}



class SalesMap1 extends React.Component {

  state = {
    showingInfoWindow: false,
    customers:[],
    activeMarker: {},
    selectedPlace: {},

  };

  componentDidMount(){

  // Initial call for sales list
  const sales = []

  const customers = []
  db.collection('customers').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      const customer = {
        name: doc.data().name,
        ...doc.data()
      }
      customers.push(customer)
    })
      this.setState({customers})
  })

  db.collection('sales').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {

      const sale = {
        docId:doc.id,
        ...doc.data()
      }
      sales.push(sale)
    });

    const groupedCust = groupBy(sales,'customer')
    const customers = personSalesList1(groupedCust)

    this.setState({
      customers
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });

  }

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

  onMapClicked = (props) => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  }
  };

  render() {

  const { customers } = this.state

    return (

          <Row>
            <Col md="12">
              <Card>

                <CardBody>
                  <div
                    id="map"
                    className="map"
                    style={{ position: "relative", overflow: "hidden" }}
                  >

                  <Map
                    google={this.props.google}
                    zoom={12}
                    style={mapStyles}
                    initialCenter={{ lat: 33.732248, lng: -116.382486 }}
                    onClick={this.onMapClicked}
                  >

                  {customers.map((store, index) =>

                    <Marker key={index} id={index}
                    position={{
                     lat: store.customerLat,
                     lng: store.customerLong
                   }}
                   title={store.msg}
                   name={store.msg}
                   sales={store.sales}
                   onClick={this.onMarkerClick}
                   />


                 )
                 }
                 <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}>
                  <div>
                    <h5>{this.state.selectedPlace.name}</h5>
                  </div>
              </InfoWindow>

                  </Map>


                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDyLUwGFi9V44ALq6o68gxAfwR-m8OA_X4'
})(SalesMap1);
