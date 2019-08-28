import React,{Component} from "react"
import { Link } from "react-router-dom"

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Button,
  Table,
  Row,
  Col
} from "reactstrap"

import SalesPieChart from 'components/SalesPieChart'
import InventoryBarChart from '../components/InventoryBarChart'
import fire from '../firebase'
const database = fire.firestore()

class ProductList extends Component {

  state = {
    products:[]
  }
  componentDidMount(){

  // Initial call for products list
  const ref = database.collection('products')

  ref.get()
  .then((snapshot) => {
    const products = []
    snapshot.forEach((doc) => {

      const item = {
        productId:doc.id,
        ...doc.data()
      }

        products.push(item)

      })

    this.setState({
      products
    })

  })
  .catch((err) => {
    console.log('Error getting documents', err)
  })

  ref.onSnapshot(snapshot => {
      const products = []

      snapshot.forEach(doc => {

        const item = {
          productId:doc.id,
          ...doc.data()
        }

          products.push(item)

        })

      this.setState({
        products
      })

      })


}

  render(){
      const { products } = this.state

    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-warning" tag="h4"><i className="nc-icon nc-paper text-warning" /> Products</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-warning">
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Inventory</th>

                      </tr>
                    </thead>
                    <tbody>

                    {products.map((p,i) =>

                      <tr key={i}>
                        <td>
                        <Link to={{
                          pathname: "product_profile",
                          state:
                            { productId: p.productId }
                          }}>
                        <div className="text-warning">{p.name}</div>
                        </Link>
                          </td>
                        <td>{p.price}</td>
                        <td>{p.inventory}</td>
                      </tr>

                    )}

                    </tbody>
                  </Table>
                </CardBody>

                <CardFooter>
                <Row>
                <Col >
                <center>
                <Link to={{
                  pathname: "product_add",
                  state:
                    {  }
                  }}>
                <Button
                  className="btn-round"
                  color="warning"
                  type="submit"
                >
                  Add Product
                </Button>

                </Link>
                </center>
                </Col>

              </Row>
                </CardFooter>

              </Card>
            </Col>

          </Row>

          <Row>
            <Col md="6">

              <SalesPieChart />

            </Col>

            <Col md="6">

              <InventoryBarChart />

            </Col>
          </Row>

        </div>
      </>
    )
  }
}

export default ProductList
