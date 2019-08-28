import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
} from "reactstrap";

import fire from '../firebase'
const db = fire.firestore()

const options={
  pieceLabel: {
    render: "percentage",
    fontColor: ["white"],
    precision: 2
  },

  scales: {
    yAxes: [
      {
        ticks: {
          display: false
        },
        gridLines: {
          drawBorder: false,
          zeroLineColor: "transparent",
          color: "rgba(255,255,255,0.05)"
        }
      }
    ],

    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(255,255,255,0.1)",
          zeroLineColor: "transparent"
        },
        ticks: {
          display: false
        }
      }
    ]
  }
}

function chartSeries(products){
  const names = products.map(p => p.name)
  const inventory = products.map(p => p.inventory)
  const total = inventory.reduce((a,b) => a + b, 0)


    return {
    total:total,
    labels: names,
    datasets: [
      {
        backgroundColor: [
        'rgba(255, 99, 132,.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 206, 186, 0.4)'
      ],
        data: inventory
      }
    ]
  }
}


class InventoryPieChart extends Component {

  state={
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


  render(){
    const { data } = this.state

    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h5"><div className="text-warning">Share of Inventory</div></CardTitle>
        </CardHeader>
        <CardBody>

        <Pie
          data={data}
          options={options}
        />

        </CardBody>

      </Card>
)
 }
}


export default InventoryPieChart
