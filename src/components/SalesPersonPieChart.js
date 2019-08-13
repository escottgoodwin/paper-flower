import React, { Component } from "react";
// nodejs library to set properties for components
// @material-ui/core

import { Pie } from "react-chartjs-2";

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


function chartSeries(grouped,column){
  const values = Object.values(grouped)
  const labels = Object.keys(grouped)
  const valueSeries = values.map(v => v.map(s => parseFloat(s[column])).reduce((a,b) => a + b, 0))
  const total = valueSeries.reduce((a,b) => a + b, 0)

  return {
  total:total,
  labels: labels,
  datasets: [
    {
      label: "Sales",
      backgroundColor: [
      'rgba(255, 99, 132,.4)',
      'rgba(54, 162, 235, 0.4)',
      'rgba(255, 206, 86, 0.4)',
      'rgba(255, 206, 186, 0.4)'
    ],
      data: valueSeries
    }
  ]
 }

}


class SalesPersonPieChart extends Component {

  state={
    data:{}
  }

  componentDidMount() {
    const sales = []
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
          salesmanId:doc.data().salesmanId,
          salesman:doc.data().salesman,
          uid:doc.data().uid
        }

        sales.push(sale)
      });

      const grouped =  groupBy(sales,'salesman')
      const productGroup = chartSeries(grouped,'price')

      this.setState({data:productGroup})

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
            salesmanId:doc.data().salesmanId,
            salesman:doc.data().salesman,
            uid:doc.data().uid
          }

          sales.push(sale)
        });

        const grouped =  groupBy(sales,'salesman')
        const productGroup = chartSeries(grouped,'price')

        this.setState({data:productGroup})

      });

  }

  render(){
    const { data } = this.state
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h5"><div className="text-success">Sales People</div></CardTitle>

        </CardHeader>
        <CardBody>

        <Pie
          data={data}
          options={options}
        />

        </CardBody>
        <CardFooter>
        <hr />
          Sales Total: {data.total}
        </CardFooter>
      </Card>
)
 }
}


export default SalesPersonPieChart
