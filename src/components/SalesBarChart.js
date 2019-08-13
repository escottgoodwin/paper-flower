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




function chartSeries(grouped,column){
  const values = Object.values(grouped)
  const labels = Object.keys(grouped)
  const valueSeries = values.map(v => v.map(s => parseFloat(s[column])).reduce((a,b) => a + b, 0))
  const datasets1 = values.map((currElement, i) => valueSeries[i])
  const salesnum = valueSeries.reduce((a,b) => a + b, 0)

  var datasets = {
  label: 'Sales ($)',
  data: datasets1,
  backgroundColor: [
         'rgba(255, 99, 132, 0.4)',
         'rgba(54, 162, 235, 0.4)',
         'rgba(255, 206, 86, 0.4)',
         'rgba(255, 206, 186, 0.4)'
      ]
};


  return {
      labels:Object.keys(grouped),
      datasets:[datasets],
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

      const grouped =  groupBy(sales,'productName')
      const productGroup = chartSeries(grouped,'price')

      this.setState({
        data:productGroup,
        itemNum:productGroup.salesnum
      })

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

        const grouped =  groupBy(sales,'productName')
        const productGroup = chartSeries(grouped,'price')
        this.setState({
          data:productGroup,
          itemNum:productGroup.salesnum
      })
      });
}

render() {
  const { data, itemNum } = this.state

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
        <CardFooter>
        <hr />
          Sales Total: {itemNum}

        </CardFooter>
      </Card>
)
}
}


export default SalesBarChart
