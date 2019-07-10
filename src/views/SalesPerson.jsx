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

import SalesPersonSales from '../components/SalesPersonSales'
import logo from "assets/img/flower-field-3.jpg";

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

  //const { productName } = this.props.location.state
  // Initial call for flowers list
  const { salesmanId } = this.props.location.state

  database.collection('users')
  .where("uid", "==", salesmanId)
  .get()
  .then((snapshot) => {
      snapshot.forEach((doc) => {

      this.setState({
        docId:doc.id,
        name: doc.data().name,
        title:doc.data().title,
        office:doc.data().office,
        phone:doc.data().phone,
        email:doc.data().email,
        userImg: doc.data().userImg,
        uid:doc.data().uid
       });

})
})
.catch(function(error) {
    console.log("Error getting document:", error);

})
}

  render() {
  const { salesmanId } = this.props.location.state
  const { name, office, userImg, title, phone, email, uid } = this.state;

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
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={userImg}
                      />
                      <h5 className="title text-success">{name}</h5>
                    </a>
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

                  <hr />

                    <Row>
                      <Col >
                      <Link to={{
                        pathname: "salesperson_update",
                        state:
                          { salesmanId }
                        }}>
                      <Button
                        className="btn-round"
                        color="success"
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
              <SalesPersonSales salesmanId={salesmanId}/>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default SalesPerson;
