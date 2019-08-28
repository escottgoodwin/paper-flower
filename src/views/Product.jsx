import React from "react";
// reactstrap components
import {
  Row,
  Col
} from "reactstrap";

import ProductSales from '../components/ProductSales'
import ProductInfo from '../components/ProductInfo'

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

  const { productId } = this.props.location.state

  database.collection('products').doc(productId)
  .get().then(doc => {
    if (doc.exists) {

      this.setState({
        ...doc.data()
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

    const { productId } = this.props.location.state

    return (
        <div className="content">
          <Row>
            <Col md="4">
              <ProductInfo productId={productId} {...this.state} />
            </Col>
            <Col md="8">
              <ProductSales productId={productId}/>
            </Col>
          </Row>
        </div>
    );
  }
}

export default Product;
