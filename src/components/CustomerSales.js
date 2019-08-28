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
  const ref = db.collection('sales').where("customerId", "==", customerId).orderBy("saleDate", "desc")

  ref.get()
  .then((snapshot) => {
    const sales = []
    snapshot.forEach((doc) => {

      const sale = {
        docId:doc.id,
        ...doc.data()
      }
      sales.push(sale)
    })

    const totalValue = sales.map(s => parseFloat(s.cartTotal)).reduce((a,b) => a + b, 0)
    this.setState({
      sales,
      totalValue
    })

  })
  .catch((err) => {
    console.log('Error getting documents', err);
  })

  ref.onSnapshot(snapshot => {
      let sales = [];

      snapshot.forEach(doc => {

        const sale = {
          docId:doc.id,
          ...doc.data()
        }

        sales.push(sale)
      })

      const totalValue = sales.map(s => parseFloat(s.cartTotal)).reduce((a,b) => a + b, 0)
      this.setState({
        sales,
        totalValue
      })
    })

  }

  render(){
      const { sales, totalValue } = this.state

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
                <th>Date</th>
                <th>Products</th>
                <th>Total</th>
                <th>Salesman</th>

              </tr>
            </thead>
            <tbody>

            {sales.map((p,i) =>

              <tr key={i}>
                <td>{moment(p.saleDate.toDate()).calendar()}</td>
                <td>{p.saleProducts.length}</td>
                <td>${p.cartTotal}</td>
                <td>{p.salesman}</td>
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


export default CustomerSales
