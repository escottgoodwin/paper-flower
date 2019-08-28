import React, { Component } from "react";

import { Bar } from "react-chartjs-2";
import { groupBy } from '../util'

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

function chartSeries(grouped,column){
  const values = Object.values(grouped)
  const labels = Object.keys(grouped)
  const valueSeries1 = values.map(s => s.map(p => p[column]).reduce((a,b) => a + b, 0))
  const data = values.map((currElement, i) => valueSeries1[i])
  const salesnum = valueSeries1.reduce((a,b) => a + b, 0)

  var datasets = [{
  label: 'Sales ($)',
  data,
  backgroundColor: [
         'rgba(255, 99, 132, 0.4)',
         'rgba(54, 162, 235, 0.4)',
         'rgba(255, 206, 86, 0.4)',
         'rgba(255, 206, 186, 0.4)'
      ]
}]

  return {
      labels,
      datasets,
      salesnum
    }
  }

class SalesBarChart extends Component {

  state = {
      productNames:[],
      sales:[],
      itemNum:'',
      data:{}
  }

  componentDidMount() {
    const ref = db.collection('sales')
    const sales = []
    ref.get()
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

      this.setState({
        data:productGroup,
        itemNum:productGroup.salesnum
      })

      })
    .catch((err) => {
      console.log('Error getting documents', err);
    });

    ref.onSnapshot(snapshot => {
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

        this.setState({
          data:productGroup,
          itemNum:productGroup.salesnum
      })
      });
}

render() {
  const { data } = this.state

    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h5">
          <div className="text-success">Sales by Item</div></CardTitle>
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


export default SalesBarChart
