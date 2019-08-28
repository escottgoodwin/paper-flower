import React, { Component } from "react"
// reactstrap components
import {
  Row,
  Col
} from "reactstrap"

import CustomerSales from '../components/CustomerSales'
import CustomerInfo from '../components/CustomerInfo'

import fire from '../firebase'
const database = fire.firestore()

class Customer extends Component {

  state ={
    address:'',
    city:'',
    name:'',
    state:'',
    type:'',
    phone:'',
    email:'',
    customerImg:'',
    custBkImg:''
    }

  componentDidMount(){

  const { customerId } = this.props.location.state

  database.collection('customers').doc(customerId)
  .get().then(doc => {
    if (doc.exists) {

      this.setState({
        name: doc.data().name,
        ...doc.data()
       });

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

  }

  render() {
  const { customerId } = this.props.location.state

    return (
      <>
        <div className="content">
          <Row>
            <Col md="4">
              <CustomerInfo customerId={customerId} {...this.state} />
            </Col>
            <Col md="8">
              <CustomerSales customerId={customerId}/>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Customer;
