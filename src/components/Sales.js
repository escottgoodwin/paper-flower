import React, { useState, useEffect } from "react";
// nodejs library to set properties for components
// @material-ui/core

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

function Sales() {

  const [ total, setTotal ] = useState()
  const [ number, setNumber ] = useState()

  useEffect(() => {
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

      const saleslist = sales.map(s => parseFloat(s.price))

      const salesSum =  saleslist.reduce((a,b) => a + b, 0)

      setTotal(salesSum)
      setNumber(sales.length)

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

        const saleslist = sales.map(s => parseFloat(s.price))

        const salesSum =  saleslist.reduce((a,b) => a + b, 0)

        setTotal(salesSum)
        setNumber(sales.length)

      });

  });

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
          <div className="stats">
            Number of Sales: {number}
          </div>
        </CardFooter>
      </Card>
      </>
)
}


export default Sales
