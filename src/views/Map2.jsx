import React from "react";
// react plugin used to create google maps
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

import fire from '../firebase'
const db = fire.firestore()


const MapWrapper = withScriptjs(
  withGoogleMap(props => (
    <>
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 33.732248, lng: -116.382486 }}
      defaultOptions={{
        scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
        styles: [
          {
            featureType: "water",
            stylers: [
              {
                saturation: 43
              },
              {
                lightness: -11
              },
              {
                hue: "#0088ff"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              {
                hue: "#ff0000"
              },
              {
                saturation: -100
              },
              {
                lightness: 99
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#808080"
              },
              {
                lightness: 54
              }
            ]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ece2d9"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ccdca1"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#767676"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#ffffff"
              }
            ]
          },
          {
            featureType: "poi",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [
              {
                visibility: "on"
              },
              {
                color: "#b8cb93"
              }
            ]
          },
          {
            featureType: "poi.park",
            stylers: [
              {
                visibility: "on"
              }
            ]
          },
          {
            featureType: "poi.sports_complex",
            stylers: [
              {
                visibility: "on"
              }
            ]
          },
          {
            featureType: "poi.medical",
            stylers: [
              {
                visibility: "on"
              }
            ]
          },
          {
            featureType: "poi.business",
            stylers: [
              {
                visibility: "simplified"
              }
            ]
          }
        ]
      }}
    >

      {props.customers.map((item,index) => (
        <>
					<Marker
					    key={index}
					    position={{ lat: item.customerLat, lng: item.customerLong}}
					    onClick={() => props.handleToggleOpen(item)}
              animation={2}
              icon={{
                  url: 'https://i.dlpng.com/static/png/1372955_thumb.png',
                  scaledSize:{height:40,width:30}

              }}
					/>

				{JSON.stringify(props.position) === JSON.stringify({ lat: item.customerLat, lng: item.customerLong}) &&
					 <InfoWindow position={{ lat: item.customerLat, lng: item.customerLong}}>
					    <div className="text-info"><h5>{item.msg}</h5></div>
					 </InfoWindow>
				 }
         </>
       ))
       }
      </GoogleMap>

      </>
  ))
);



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

      let item = {customerId:customerId, name:key, customerLat:parseFloat(customerLat), customerLong:parseFloat(customerLong), sales:sales, number:number,msg: key + ' - $' + sales}
      customers.push(item)
    }

    return customers
}


class Map extends React.Component {
  state = {
    showingInfoWindow: false,
    sales:[],
    activeMarker: {},
    selectedPlace: {},
    isOpen: false,
    position : null

  };


  handleToggleOpen = (item) => {
		this.setState({
			position : {
				lat : item.customerLat,
				lng : item.customerLong
			}
		})
	}

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
          customerImg:doc.data().customerImg,
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
      console.log(customers)
      this.setState({
        sales:customers
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });


    //listener that updates if a sale is added
    db.collection("sales")
    .onSnapshot(snapshot => {
        let sales = [];

        snapshot.forEach(doc => {

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
        console.log(customers)
        this.setState({
          sales:customers
        });

      });

    }



  render() {
    const { sales, position } = this.state
    const gkey = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_KEY}`
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>Sales Map</CardHeader>
                <CardBody>
                  <div
                    id="map"
                    className="map"
                    style={{ position: "relative", overflow: "hidden" }}
                  >
                    <MapWrapper
                      handleToggleOpen={this.handleToggleOpen}
                      position={position}
                      customers={sales}
                      googleMapURL={gkey}
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `100%` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Map;
