import React, { Component } from "react";
import moment from 'moment'

import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";

import fire from '../firebase'
const db = fire.firestore()

class Sales extends Component {

  state = {
    total:0,
    lastSale:null
  }


    componentDidMount(){
      const ref = db.collection('sales').orderBy("saleDate", "desc")

      ref.get()
      .then((snapshot) => {
        const sales = []
        snapshot.forEach((doc) => {

          const sale = {
            docId:doc.id,
            cartTotal:doc.data().cartTotal,
            saleDate:doc.data().saleDate,
            customer:doc.data().customer
          }

          sales.push(sale)
        });

        const saleslist = sales.map(s => parseFloat(s.cartTotal))

        const salesSum =  saleslist.reduce((a,b) => a + b, 0)
        const lastSale = sales[0]

        this.setState({lastSale,total:salesSum})

      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });

      ref.get()
      .then((snapshot) => {
        const sales = []
        snapshot.forEach((doc) => {

          const sale = {
            docId:doc.id,
            cartTotal:doc.data().cartTotal,
            saleDate:doc.data().saleDate,
            customer:doc.data().customer
          }

          sales.push(sale)
        });

        const saleslist = sales.map(s => parseFloat(s.cartTotal))

        const salesSum =  saleslist.reduce((a,b) => a + b, 0)
        const lastSale = sales[0]

        this.setState({lastSale,total:salesSum})

      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
    }

render(){
    const { total, lastSale } = this.state

    return (
      <>
      <Card className="card-stats">
        <CardBody>
          <Row>
            <Col md="4" xs="5">
              <div className="icon-big text-center icon-warning">
                <i className="nc-icon nc-money-coins text-success" />
              </div>
            </Col>
            <Col md="8" xs="7">
              <div className="numbers">
                <p className="card-category">Revenue</p>
                <CardTitle tag="p">${total}</CardTitle>
                <p />
              </div>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <hr />
          {lastSale!==null &&
          <div className="stats">
            <div>
            Last Sale:
            </div>
            <div>
             {lastSale.customer}  ${lastSale.cartTotal}
             </div>
             <div>
             {moment(lastSale.saleDate.toDate()).calendar()}
             </div>
          </div>
          }
        </CardFooter>
      </Card>
      </>
)
}
}


export default Sales
