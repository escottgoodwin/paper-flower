/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from 'react-router-dom'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

import CustomerSales from '../components/CustomerSales'

import fire from '../firebase'
const database = fire.firestore()



class Customer extends React.Component {


  state ={
    address:'',
    city:'',
    name:'',
    state:'',
    type:'',
    phone:'',
    email:''
    }

  componentDidMount(){

  //const { productName } = this.props.location.state
  // Initial call for flowers list

  const { customerId } = this.props.location.state

  database.collection('customers').doc(customerId)
  .get().then(doc => {
    if (doc.exists) {

      this.setState({
        name: doc.data().name,
        address:doc.data().address,
        city:doc.data().city,
        state:doc.data().state,
        type:doc.data().type,
        customerImg:doc.data().customerImg,
        phone:doc.data().phone,
        email:doc.data().email,
        custBkImg:doc.data().custBkImg
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
  const { address, city, name, state, customerImg,type, phone, email, custBkImg } = this.state;

    return (
      <>
        <div className="content">
          <Row>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  <img
                    alt="..."
                    src={custBkImg}
                  />
                </div>
                <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={customerImg}
                      />
                      <h5 className="title">{name}</h5>
                    </a>
                    <p className="description">{type}</p>
                  </div>
                  <div className="description text-center">
                    {address}
                  </div>
                  <div className="description text-center">
                    {city}, {state}
                  </div>
                  <div className="description text-center">
                    {phone}
                  </div>
                  <div className="description text-center">
                    {email}
                  </div>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="button-container">
                    <Row>
                      <Col className="ml-auto" lg="3" md="6" xs="6">
                        <h5>
                          12 <br />
                          <small>Sales</small>
                        </h5>
                      </Col>
                      <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                        <h5>
                          $20 <br />
                          <small>Total Value</small>
                        </h5>
                      </Col>

                    </Row>

                  <hr />

                    <Row>
                      <Col >
                      <Link to={{
                        pathname: "customer_update",
                        state:
                          { customerId }
                        }}>
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Update Profile
                      </Button>
                      </Link>
                      </Col>

                    </Row>
                  </div>
                </CardFooter>
              </Card>
              
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
