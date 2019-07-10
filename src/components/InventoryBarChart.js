import React, { Component } from "react";
// nodejs library to set properties for components
// @material-ui/core

import { Line, Pie, Bar } from "react-chartjs-2";


import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";


import fire from '../firebase'
const db = fire.firestore()

const options= {
     scales: {
         yAxes: [{
             ticks: {
                 beginAtZero: true
             }
         }]
     }
 }

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

function chartSeries(products){
  const names = products.map(p => p.name)

  const inventory = products.map(p => p.inventory)

    var datasets = {
    label: 'Number',
    data: inventory,
    backgroundColor: [
           'rgba(255, 99, 132, 0.4)',
           'rgba(54, 162, 235, 0.4)',
           'rgba(255, 206, 86, 0.4)',
           'rgba(255, 206, 186, 0.4)'
        ]
  };


    return {
        labels:names,
        datasets:[datasets],

      }
}


class InventoryBarChart extends Component {

  state = {
      productNames:[],
      sales:[],
      data:{}
  }

  componentDidMount(){

  // Initial call for products list
  const products = []
  db.collection('products').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      const product = {
        docId:doc.id,
        name:doc.data().name,
        inventory: doc.data().inventory,
        price:doc.data().price,
        productImg:doc.data().productImg,
        uid:doc.data().uid
      }

      products.push(product)
    });

    const data = chartSeries(products)
    this.setState({data})

  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });




  //listener that updates if a product is added
  db.collection("products")
  .onSnapshot(snapshot => {
      let products = [];

      snapshot.forEach(doc => {
        const product = {
          docId:doc.id,
          name:doc.data().name,
          inventory: doc.data().inventory,
          price:doc.data().price,
          productImg:doc.data().productImg,
          uid:doc.data().uid
        }
        products.push(product)
      });

      const data = chartSeries(products)
      this.setState({data})

    });

  }

render() {
  const { data } = this.state


    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h5"><div className="text-warning">Inventory by Item</div></CardTitle>
        </CardHeader>
        <CardBody>
        <Bar
          data={data}
          options={options}
          />
        </CardBody>
        <CardFooter>
          <hr />
          <div className="stats">
            <i className="fa fa-history" /> Updated 3 minutes ago
          </div>
        </CardFooter>
      </Card>
)
}
}


export default InventoryBarChart
