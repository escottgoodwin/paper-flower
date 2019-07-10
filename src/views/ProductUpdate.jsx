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
const database = fire.firestore()

class ProductUpdate extends React.Component {

  state ={
    name:'',
    inventory:'',
    price:'',
    productImg:'',
  }

  componentDidMount(){

  //const { productName } = this.props.location.state
  // Initial call for flowers list

  const { productId } = this.props.location.state

  database.collection('products').doc(productId)
  .get().then(doc => {
    if (doc.exists) {

      this.setState({
        name: doc.data().name,
        inventory:doc.data().inventory,
        price:doc.data().price,
        productImg:doc.data().productImg,
        bkImg:doc.data().bkImg,
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

    const { inventory, price, productImg, bkImg } = this.state;
    const { productId } = this.props.location.state

    database.collection('products')
    .doc(productId)
    .update({
      inventory:inventory,
      price:price,
      productImg: productImg,
      bkImg:bkImg
  }).then(function() {
      console.log("Document successfully updated!");
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });

  this.props.history.push({
    pathname: `/admin/product_profile`,
    state: { productId  }
    })
  }

  render() {

  const { productId } = this.props.location.state
  const { name, inventory, price, productImg, bkImg, notes } = this.state;

    return (
      <>
        <div className="content">
          <Row>
            <Col md="4">
            <Card className="card-user">

              <div className="image">
              {bkImg &&
                <img
                  alt="..."
                  src={bkImg}
                />
              }
              </div>
              <CardBody>
                <div className="author">
                <Link to={{
                  pathname: "product_profile",
                  state:
                    { productId: productId }
                  }}>
                  {productImg &&
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={productImg}
                    />
                  }
                    <h5 className="title text-warning">{name}</h5>
                  </Link>

                  <p className="description">${price}</p>
                </div>
                <div className="description text-center">
                Inventory:  {inventory}
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
                  <CardTitle tag="h5"><div className="text-warning">Edit Product Profile</div></CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="4">
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
                      <Col className="pl-1" md="4">
                        <FormGroup>
                            <label>Price</label>
                          <Input
                          value={price}
                          onChange={e => this.setState({ price: e.target.value })}
                          placeholder="Price"
                           />
                        </FormGroup>
                      </Col>

                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Inventory</label>
                          <Input
                            defaultValue=""
                            placeholder="Inventory"
                            type="text"
                            value={inventory}
                            onChange={e => this.setState({ inventory: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pr-1" md="12">
                        <FormGroup>
                          <label>Product Image</label>
                          <Input
                            defaultValue=""
                            placeholder="Image Link"
                            type="text"
                            value={productImg}
                            onChange={e => this.setState({ productImg: e.target.value })}
                          />
                        </FormGroup>
                      </Col>

                    </Row>

                    <Row>
                      <Col className="pr-1" md="12">
                        <FormGroup>
                          <label>Product Background Image</label>
                          <Input
                            defaultValue=""
                            placeholder="Image Link"
                            type="text"
                            value={bkImg}
                            onChange={e => this.setState({ bkImg: e.target.value })}
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
                          color="warning"
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

export default ProductUpdate;
