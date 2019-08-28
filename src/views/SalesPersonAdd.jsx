import React from "react"

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap"

import SalesPersonInfo from '../components/SalesPersonInfo'
import SalesPersonForm from '../components/SalesPersonForm'

import fire from '../firebase'
const db = fire.firestore()

class SalesPersonAdd extends React.Component {

  state ={
    name:'',
    title:'',
    office:'',
    phone:'',
    email:'',
    userImg:'',
    notes:''
  }

  addProfile = () => {

      db.collection("users").add(this.state)
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id)
      })
      .catch(function(error) {
          console.error("Error adding document: ", error)
      })

      this.props.history.push(`dashboard`)
    }

    handleChange = item => this.setState(item)

  render() {
    const salesmanId = ''
    return (
        <div className="content">
          <Row>
            <Col md="4">
              <SalesPersonInfo salesmanId={salesmanId} {...this.state}/>
            </Col>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5"><div className="text-success">Add Sales Person Profile</div></CardTitle>
                </CardHeader>
                <CardBody>
                  <SalesPersonForm handleChange={this.handleChange} submitButton={this.addProfile} buttonText='Add Profile' {...this.state}/>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
    )
  }
}

export default SalesPersonAdd
