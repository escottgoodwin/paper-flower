import React, { Component } from "react";
import moment from 'moment'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Table
} from "reactstrap";


import fire from '../firebase'
const db = fire.firestore()

class SalesPersonSales extends Component {

  state = {
    data:[],
    sales:[],
    totalNum:0,
    totalValue:0
  }

  componentDidMount(){

  const { salesmanId } = this.props

  // Initial call for sales list
  const sales = []
  db.collection('sales')
  .where("salesmanId", "==", salesmanId)
  .orderBy("saleDate", "desc")
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {

      const sale = {
        docId:doc.id,
        ...doc.data()
      }

      sales.push(sale)
    });

    const totalValue = sales.map(s => parseFloat(s.cartTotal)).reduce((a,b) => a + b, 0)

    this.setState({
      sales,
      totalValue
    });

  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });


  //listener that updates if a sale is added
  db.collection("sales")
  .where("salesmanId", "==", salesmanId)
  .orderBy("saleDate", "desc")
  .onSnapshot(snapshot => {
      let sales = [];

      snapshot.forEach(doc => {

        const sale = {
          docId:doc.id,
          ...doc.data()
        }

        sales.push(sale)
      });

      const totalValue = sales.map(s => parseFloat(s.cartTotal)).reduce((a,b) => a + b, 0)

      this.setState({
        sales,
        totalValue
      });


    });

  }

  render(){
    
      const { sales, totalValue } = this.state

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-success" tag="h4">
          <i className="nc-icon nc-money-coins text-success" /> Sales</CardTitle>
        </CardHeader>
        <CardBody>
          <Table responsive>
            <thead className="text-success">
              <tr>
                <th>Date</th>
                <th>Products</th>
                <th>Total</th>
                <th>Customer</th>

              </tr>
            </thead>
            <tbody>

            {sales.map((p,i) =>

              <tr key={i}>
                <td>{moment(p.saleDate.toDate()).calendar()}</td>
                <td>{p.saleProducts.length}</td>
                <td>${p.cartTotal}</td>
                <td>{p.customer}</td>
              </tr>

            )}

            </tbody>
          </Table>
        </CardBody>
        <CardFooter>
        <hr/>
        <h5>Total: ${totalValue}</h5>
        </CardFooter>
      </Card>
    )
}
}


export default SalesPersonSales
