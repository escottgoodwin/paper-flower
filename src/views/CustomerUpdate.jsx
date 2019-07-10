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

import fire from '../firebase'
const database = fire.firestore()

class CustomerUpdate extends React.Component {

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
        custBkImg: doc.data().custBkImg,
        notes:''
       });

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

  }

  updateProfile = () => {
    const { name, office, userImg, title, phone, type, custBkImg, docId } = this.state;
    const { salesmanId } = this.props.location.state

    database.collection('users')
    .doc(docId)
    .update({
      name: name,
      title:title,
      office:office,
      phone:phone,
      type:type,
      userImg: userImg,
      custBkImg:custBkImg
  }).then(function() {
      console.log("Document successfully updated!");
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });

  this.props.history.push({
    pathname: `/admin/salesman_profile`,
    state: { salesmanId: salesmanId  }
    })
  }

  render() {
  const { customerId } = this.props.location.state
  const { address, city, name, state, customerImg, type, phone, email, notes, custBkImg } = this.state;

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
                <Link to={{
                  pathname: "customer_profile",
                  state:
                    { customerId: customerId }
                  }}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={customerImg}
                    />
                    <h5 className="title">{name}</h5>
                  </Link>

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
                </div>
              </CardFooter>
            </Card>
              
            </Col>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5"><div className="text-primary">Edit Customer Profile</div></CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Name</label>
                          <Input
                            defaultValue=""

                            placeholder="Name"
                            type="text"
                            value={name}
                            onChange={e => this.setState({ name: e.target.value })}
                          />
                        </FormGroup>
                      </Col>

                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input
                          value={email}
                          onChange={e => this.setState({ email: e.target.value })}
                          placeholder="Email"
                          type="email" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Type</label>
                          <Input

                            type="text"
                            value={type}
                            onChange={e => this.setState({ type: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Phone</label>
                          <Input
                            defaultValue=""
                            placeholder="Phone"
                            type="text"
                            value={phone}
                            onChange={e => this.setState({ phone: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            defaultValue="Melbourne, Australia"
                            placeholder="Home Address"
                            type="text"
                            value={address}
                            onChange={e => this.setState({ address: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            defaultValue="Melbourne"
                            placeholder="City"
                            type="text"
                            value={city}
                            onChange={e => this.setState({ city: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>State</label>
                          <Input

                            placeholder="State"
                            type="text"
                            value={state}
                            onChange={e => this.setState({ state: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input placeholder="ZIP Code" type="number" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Customer Image</label>
                          <Input
                            defaultValue=""
                            placeholder="Type"
                            type="text"
                            value={customerImg}
                            onChange={e => this.setState({ customerImg: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Customer Background Image</label>
                          <Input
                            defaultValue=""
                            placeholder="Phone"
                            type="text"
                            value={custBkImg}
                            onChange={e => this.setState({ custBkImg: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Notes</label>
                          <Input
                            type="textarea"
                            value={notes}
                            onChange={e => this.setState({ notes: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                          onClick={this.updateProfile}
                        >
                          Update Profile
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default CustomerUpdate;
