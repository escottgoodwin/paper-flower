import React from "react"

import {
  Row,
  Col
} from "reactstrap"

import SalesPersonSales from '../components/SalesPersonSales'
import SalesPersonInfo from '../components/SalesPersonInfo'

import fire from '../firebase'
const database = fire.firestore()

class SalesPerson extends React.Component {

  state ={
    title:'',
    office:'',
    name:'',
    phone:'',
    email:'',
    userImg:''
    }

  componentDidMount(){

    const { salesmanId } = this.props.location.state

    database.collection('users')
    .where("uid", "==", salesmanId)
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
        this.setState({
          docId:doc.id,
          ...doc.data()
         })
       })
      })
      .catch(function(error) {
        console.log("Error getting document:", error)
      })
  }

  render() {
    const { salesmanId } = this.props.location.state
  
    return (
        <div className="content">
          <Row>
            <Col md="4">
              <SalesPersonInfo salesmanId={salesmanId} {...this.state}/>
            </Col>
            <Col md="8">
              <SalesPersonSales salesmanId={salesmanId}/>
            </Col>
          </Row>
        </div>
    )
  }
}

export default SalesPerson
