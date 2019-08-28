import React from "react"

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap"

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

  componentDidMount(){

  const { productId } = this.props.location.state

  database.collection('products').doc(productId)
  .get().then(doc => {
    if (doc.exists) {

      this.setState({
        ...doc.data()
       })

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!")
    }
  }).catch(function(error) {
    console.log("Error getting document:", error)
  })

  }

  updateProfile = () => {

    const { productId } = this.props.location.state

    database.collection('products')
    .doc(productId)
    .update(this.state).then(function() {
        console.log("Document successfully updated!")
    })
    .catch(function(error) {
        console.error("Error updating document: ", error)
    })

    this.props.history.push({
      pathname: `/admin/product_profile`,
      state: { productId  }
      })
  }

  handleChange = item => this.setState(item)

  render() {

    const { productId } = this.props.location.state

    return (
        <div className="content">
          <Row>
            <Col md="4">
              <ProductInfo productId={productId} {...this.state} />
            </Col>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5"><div className="text-warning">Edit Product Profile</div></CardTitle>
                </CardHeader>
                <CardBody>
                  <ProductForm handleChange={this.handleChange} submitButton={this.updateProfile} buttonText='Update Profile' {...this.state}/>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
    )
  }
}

export default ProductUpdate
