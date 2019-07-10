import React, { Component } from "react";
// nodejs library to set properties for components
// @material-ui/core

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Table
} from "reactstrap";


import fire from '../firebase'
const db = fire.firestore()

class CustomerSales extends Component {

  state = {
    data:[],
    sales:[],
    totalNum:0,
    totalValue:0
  }

  componentDidMount(){

  const { customerId } = this.props

  // Initial call for sales list
  const sales = []
  db.collection('sales')
  .where("customerId", "==", customerId)
  .get()
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

    const data = sales.map(s => [s.customer, s.productName, s.price, s.salesman])

    const totalValue = sales.map(s => parseFloat(s.price)).reduce((a,b) => a + b, 0)
    const totalNum = data.length
    this.setState({
      data,
      sales,
      totalNum,
      totalValue

    });

  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });


  //listener that updates if a sale is added
  db.collection("sales")
  .where("customerId", "==", customerId)
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

      const data = sales.map(s => [s.customer, s.productName, s.price, s.salesman])

      const totalValue = sales.map(s => parseFloat(s.price)).reduce((a,b) => a + b, 0)
      const totalNum = data.length
      this.setState({
        data,
        sales,
        totalNum,
        totalValue

      });
    });

  }

  render(){
      const { classes  } = this.props;
      const { sales, totalNum, totalValue } = this.state

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-primary" tag="h4">
          <i className="nc-icon nc-money-coins text-primary" /> Sales</CardTitle>
        </CardHeader>
        <CardBody>
          <Table responsive>
            <thead className="text-primary">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Salesman</th>

              </tr>
            </thead>
            <tbody>

            {sales.map(p =>

              <tr>
                <td>{p.productName}</td>
                <td>{p.price}</td>
                <td>{p.salesman}</td>
              </tr>

            )}

            </tbody>
          </Table>
        </CardBody>
      </Card>
    )
}
}


export default CustomerSales
