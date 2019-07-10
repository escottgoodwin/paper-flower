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

import logo from "assets/img/flower-field-3.jpg";


import fire from '../firebase'
const db = fire.firestore()

class SalesPersonUpdate extends React.Component {

  state ={
    title:'',
    office:'',
    name:'',
    phone:'',
    email:'',
    userImg:''
    }

    addProfile = () => {
      const { name, office, userImg, title, phone, email } = this.state;

      db.collection("users").add({
      name:name,
      title:title,
      userImg:userImg,
      office:office,
      phone:phone,
      email:email
      })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });

    this.props.history.push(`dashboard`)
    }

  render() {
  const { name, office, userImg, title, phone, email, notes} = this.state;
    return (
      <>
        <div className="content">
          <Row>
            <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img
                  alt="..."
                  src={logo}
                />
              </div>
              <CardBody>
                <div className="author">
                {userImg &&
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={userImg}
                    />
                  }
                    <h5 className="title text-success">{name}</h5>


                  <p className="description">{title}</p>
                </div>
                <div className="description text-center">
                  {office}
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
                  <CardTitle tag="h5"><div className="text-success">Add Sales Person Profile</div></CardTitle>
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
                            <label>Title</label>
                          <Input
                          value={title}
                          onChange={e => this.setState({ title: e.target.value })}
                          placeholder="Title"
                           />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input

                            type="text"
                            onChange={e => this.setState({ email: e.target.value })}
                            placeholder="Email"
                            type="email"
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
                          <label>Office</label>
                          <Input
                            defaultValue="Melbourne, Australia"
                            placeholder="Office"
                            type="text"
                            value={office}
                            onChange={e => this.setState({ office: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pr-1" md="12">
                        <FormGroup>
                          <label>Sales Person Image</label>
                          <Input
                            defaultValue=""
                            placeholder="Image Link"
                            type="text"
                            value={userImg}
                            onChange={e => this.setState({ userImg: e.target.value })}
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
                          color="success"
                          type="submit"
                          onClick={this.updateProfile}
                        >
                        Add Profile
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

export default SalesPersonUpdate;
