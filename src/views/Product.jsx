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

import ProductSales from '../components/ProductSales'
import logo from "assets/img/flower-field-3.jpg";

import fire from '../firebase'
const database = fire.firestore()

class Product extends React.Component {

  state ={
    name:'',
    inventory:'',
    price:'',
    productImg:'',
    bkImg:''
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
        bkImg:doc.data().bkImg
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
  const { classes } = this.props;
  const { productId } = this.props.location.state
  const { name, inventory, price, productImg, bkImg } = this.state;

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
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={productImg}
                      />
                      <h5 className="title text-warning">{name}</h5>
                    </a>
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

                  <hr />

                    <Row>
                      <Col >
                      <Link to={{
                        pathname: "product_update",
                        state:
                          { productId }
                        }}>
                      <Button
                        className="btn-round"
                        color="warning"
                        type="submit"
                      >
                        Update Product
                      </Button>
                      </Link>
                      </Col>

                    </Row>
                  </div>
                </CardFooter>
              </Card>

            </Col>
            <Col md="8">
              <ProductSales productId={productId}/>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Product;
