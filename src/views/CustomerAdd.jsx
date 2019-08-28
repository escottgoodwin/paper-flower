import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import CustomerInfo from '../components/CustomerInfo'
import CustomerForm from '../components/CustomerForm'

import fire from '../firebase'
const db = fire.firestore()

class CustomerAdd extends React.Component {

  state ={
    address:'',
    city:'',
    name:'',
    state:'',
    type:'',
    phone:'',
    email:'',
    notes:'',
    customerImg:'',
    custBkImg:''
    }

    addCustomer = () => {

      db.collection("customers").add(this.state)
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
      this.props.history.push(`dashboard`)
    }

    handleChange = item => this.setState(item)

  render() {
    const customerId = ''

    return (
        <div className="content">
          <Row>
            <Col md="4">
              <CustomerInfo customerId={customerId} {...this.state} />
            </Col>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5"><div className="text-primary">Add Customer</div></CardTitle>
                </CardHeader>
                <CardBody>
                  <CustomerForm handleChange={this.handleChange} submitButton={this.addCustomer} buttonText='Add Profile' {...this.state}/>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
    );
  }
}

export default CustomerAdd;
