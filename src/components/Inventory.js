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
const database = fire.firestore()

function Inventory() {

  const [ inventory, setInventory ] = useState()

  useEffect(() => {
    const products = []
    database.collection('products').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const product = {
          docId:doc.id,
          name:doc.data().name,
          price:doc.data().price,
          inventory:doc.data().inventory,
          productImg:doc.data().productImg,
          uid:doc.data().uid
        }

        products.push(product)
      });
      const productslist = products.map(s => parseFloat(s.inventory))

      const productsSum =  productslist.reduce((a,b) => a + b, 0)

      setInventory(productsSum)

    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });


    //listener that updates if a product is added
    database.collection("products")
    .onSnapshot(snapshot => {
        let products = [];

        snapshot.forEach(doc => {
          const product = {
            docId:doc.id,
            name:doc.data().name,
            price:doc.data().price,
            inventory:doc.data().inventory,
            productImg:doc.data().productImg,
            uid:doc.data().uid
          }

          products.push(product)
        });

        const productslist = products.map(s => parseFloat(s.inventory))

        const productsSum =  productslist.reduce((a,b) => a + b, 0)

        setInventory(productsSum)

      });

  });

    return (
      <Card className="card-stats">
        <CardBody>
          <Row>
            <Col md="4" xs="5">
              <div className="icon-big text-center icon-warning">
                <i className="nc-icon nc-paper text-warning" />
              </div>
            </Col>
            <Col md="8" xs="7">
              <div className="numbers">
                <p className="card-category">Inventory</p>
                <CardTitle tag="p">{inventory}</CardTitle>
                <p />
              </div>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <hr />
          <div className="stats">
            <i className="fas fa-sync-alt" /> Update Now
          </div>
        </CardFooter>
      </Card>
)
}


export default Inventory
