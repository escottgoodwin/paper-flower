import React, { Component } from "react"

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap"

import CustomerInfo from '../components/CustomerInfo'
import CustomerForm from '../components/CustomerForm'

import fire from '../firebase'
const database = fire.firestore()

class CustomerUpdate extends Component {

  state = {
    address:'',
    city:'',
    name:'',
    state:'',
    type:'',
    phone:'',
    email:'',
    custBkImg:'',
    customerImg:'',
    notes:''
    }

  componentDidMount(){

    const { customerId } = this.props.location.state

    database.collection('customers').doc(customerId)
    .get().then(doc => {
      if (doc.exists) {
        this.setState({
          ...doc.data(),
         })
      } else {
        console.log("No such document!")
      }
    }).catch(function(error) {
        console.log("Error getting document:", error)
    })

  }

  updateProfile = () => {
    const { customerId } = this.props.location.state

    database.collection('users')
    .doc(customerId)
    .update(this.state).then(function() {
      console.log("Document successfully updated!")
    })
    .catch(function(error) {
      console.error("Error updating document: ", error)
    })

    this.props.history.push({
      pathname: `/admin/customer_profile`,
      state: { customerId  }
    })
  }

  handleChange = item => this.setState(item)

  render() {
    const { customerId } = this.props.location.state

    return (
        <div className="content">
          <Row>
            <Col md="4">
              <CustomerInfo customerId={customerId} {...this.state} />
            </Col>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5"><div className="text-primary">Edit Customer Profile</div></CardTitle>
                </CardHeader>
                <CardBody>
                  <CustomerForm handleChange={this.handleChange} submitButton={this.updateProfile} buttonText='Update Profile' {...this.state}/>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      )
    }
  }

export default CustomerUpdate
