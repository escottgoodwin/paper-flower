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
const database = fire.firestore()

class Customers extends Component {


  state = {
    count:0,
    lastAdded:null
  }

  componentDidMount(){

    const ref = database.collection('customers').orderBy("addedDate", "desc")
    ref.get()
    .then((snapshot) => {
      const customers = []
      snapshot.forEach((doc) => {
        const customer = {
          docId:doc.id,
          ...doc.data()
        }

        customers.push(customer)
      });

      this.setState({count:customers.length,lastAdded:customers[0]})

    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });

    ref.onSnapshot(snapshot => {
        let customers = [];

        snapshot.forEach(doc => {
          const customer = {
          docId:doc.id,
          ...doc.data()
          }

          customers.push(customer)
        });
        this.setState({count:customers.length,lastAdded:customers[0]})
      });
  }

  render(){
    const { count, lastAdded } = this.state
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
          {lastAdded!==null &&
          <div className="stats">
            <div>
            Last Added:
            </div>
            <div>
             {lastAdded.name}
             </div>
             <div>
            {moment(lastAdded.addedDate.toDate()).calendar()}
             </div>
          </div>
        }
        </CardFooter>
      </Card>
    )
  }
}

export default Customers
