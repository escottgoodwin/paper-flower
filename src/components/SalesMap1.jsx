/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create google maps
import fire from '../firebase'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

const mapStyles = {
  width: '100%',
  height: '100%',
};

const db = fire.firestore()

function groupBy(arr, criteria) {
   return arr.reduce(function (obj, item) {

// Check if the criteria is a function to run on the item or a property of it
var key = typeof criteria === 'function' ? criteria(item) : item[criteria];

// If the key doesn't exist yet, create it
  if (!obj.hasOwnProperty(key)) {
    obj[key] = [];
  }

  // Push the value to the object
  obj[key].push(item);

  // Return the object to the next item in the loop
  return obj;

}, {});
};

function personSalesList1(arr){
    let customers = []
    for (const [ key, value ] of Object.entries(arr)) {
      const number = value.map(c => c.price).length
      const customerId = value.map(c => c.customerId)[0]
      const customerLat = value.map(c => c.customerLat)[0]
      const customerLong = value.map(c => c.customerLong)[0]
      const sales = value.map(p => parseFloat(p.price)).reduce((a,b) => a + b, 0)

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
        lat:doc.data().lat,
        long:doc.data().long,
        phone:doc.data().phone
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
        productName:doc.data().productName,
        productId:doc.data().productId,
        price:doc.data().price,
        productImg:doc.data().productImg,
        customer:doc.data().customer,
        customerId:doc.data().customerId,
        customerLat:doc.data().customerLat,
        customerLong:doc.data().customerLong,
        salesmanId:doc.data().salesmanId,
        salesman:doc.data().salesman,
        uid:doc.data().uid
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
  console.log(customers)
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
