import React, { Component } from "react";
import { groupBy } from '../util'
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


function chartSeries(grouped,column){
  const values = Object.values(grouped)
  const labels = Object.keys(grouped)
  //const valueSeries = values.map(v => v.map(s => parseFloat(s[column])).reduce((a,b) => a + b, 0))
  const valueSeries1 = values.map(s => s.map(p => p[column]).reduce((a,b) => a + b, 0))
  const total = valueSeries1.reduce((a,b) => a + b, 0)

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
      data: valueSeries1
    }
  ]
 }

}


class SalesPieChart extends Component {

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
          ...doc.data()
        }

        sales.push(sale)
      });

      const salesList = sales.map(s => s.saleProducts.map(p => ({productName:p.name,productTotal:p.productTotal}))).flat()

      const grouped =  groupBy(salesList,'productName')
      const productGroup = chartSeries(grouped,'productTotal')

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
            ...doc.data()
          }

          sales.push(sale)
        });

        const salesList = sales.map(s => s.saleProducts.map(p => ({productName:p.name,productTotal:p.productTotal}))).flat()

        const grouped =  groupBy(salesList,'productName')
        const productGroup = chartSeries(grouped,'productTotal')


        this.setState({data:productGroup})

      });

  }

  render(){
    const { data } = this.state
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h5"><div className="text-success">Share of Sales</div></CardTitle>

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


export default SalesPieChart
