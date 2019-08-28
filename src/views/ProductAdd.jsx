import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

import ProductInfo from '../components/ProductInfo'
import ProductForm from '../components/ProductForm'

import fire from '../firebase'
const database = fire.firestore()

class ProductUpdate extends React.Component {

  state ={
    name:'',
    inventory:'',
    price:'',
    productImg:'',
    bkImg:'',
    notes:''
  }


  addProduct = () => {

    database.collection("products").add(this.state)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    this.props.history.push(`admin/dashboard`)
  }

  handleChange = item => this.setState(item)

  render() {

  const { productId } = this.props.location.state

    return (
      <>
        <div className="content">
          <Row>
            <Col md="4">
              <ProductInfo productId={productId} {...this.state} />
            </Col>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5"><div className="text-warning">Add Product Profile</div></CardTitle>
                </CardHeader>
                <CardBody>
                  <ProductForm handleChange={this.handleChange} submitButton={this.addProduct} buttonText='Add Profile' {...this.state}/>
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
