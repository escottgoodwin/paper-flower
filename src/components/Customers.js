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

function Customers() {

  const [ count, setCount ] = useState(0)

  useEffect(() => {
    const customers = []
    database.collection('customers').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const customer = {docId:doc.id,
        name:doc.data().name,
        uid:doc.data().uid
        }

        customers.push(customer)
      });

      setCount(customers.length)

    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });


    //listener that updates if a flower is added
    database.collection("customers")
    .onSnapshot(snapshot => {
        let customers = [];

        snapshot.forEach(doc => {
          const customer = {docId:doc.id,
          name:doc.data().name,
          uid:doc.data().uid
          }

          customers.push(customer)
        });

        setCount(customers.length)
        
      });
  });

    return (
      <Card className="card-stats">
        <CardBody>
          <Row>
            <Col md="4" xs="5">
              <div className="icon-big text-center icon-warning">
                <i className="nc-icon nc-favourite-28 text-primary" />
              </div>
            </Col>
            <Col md="8" xs="7">
              <div className="numbers">
                <p className="card-category">Customers</p>
                <CardTitle tag="p">{count}</CardTitle>
                <p />
              </div>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <hr />
          <div className="stats">
            <i className="fas fa-sync-alt" /> Update now
          </div>
        </CardFooter>
      </Card>
)
}


export default Customers
