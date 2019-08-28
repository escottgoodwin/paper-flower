import React, { Component } from "react";
import { Bar } from "react-chartjs-2";


import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
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
      </Card>
)
}
}


export default InventoryBarChart
