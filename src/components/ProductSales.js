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

class ProductSales extends Component {

  state = {
    totalValue:0,
    items:[]
  }

  componentDidMount(){

  const { productId } = this.props

  const ref = db.collection('sales')
  .where("productIds", "array-contains", productId)
  .orderBy("saleDate", "desc")

  ref.get()
  .then((snapshot) => {
    const sales = []
    snapshot.forEach((doc) => {
      const sale = {
        docId:doc.id,
        ...doc.data()
      }
      sales.push(sale)
    });

    const items = sales.map(i => [i.customer,i.saleProducts.filter(p => p.docId === productId)[0].productTotal, moment(i.saleDate.toDate()).calendar(),i.salesman])
    const totalValue = sales.map(i => i.saleProducts.filter(p => p.docId === productId)[0].productTotal).reduce((a,b) => a + b, 0)

    this.setState({totalValue,items});

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
      const items = sales.map(i => [i.customer,i.saleProducts.filter(p => p.docId === productId)[0].productTotal, moment(i.saleDate.toDate()).calendar(),i.salesman])

      const totalValue = sales.map(i => i.saleProducts.filter(p => p.docId === productId)[0].productTotal).reduce((a,b) => a + b, 0)

      this.setState({totalValue,items});
    });

  }

  render(){
      const { totalValue, items } = this.state

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-warning" tag="h4">
          <i className="nc-icon nc-money-coins text-warning" />Sales</CardTitle>
        </CardHeader>
        <CardBody>
          <Table responsive>
            <thead className="text-warning">
              <tr>
                <th>Customer</th>
                <th>$</th>
                <th>Date</th>
                <th>Salesman</th>

              </tr>
            </thead>
            <tbody>

            {items.map((p,i) =>

              <tr key={i}>
                <td>{p[0]}</td>
                <td>${p[1]}</td>
                <td>{p[2]}</td>
                <td>{p[3]}</td>
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

export default ProductSales
