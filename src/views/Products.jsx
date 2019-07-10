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
import React,{Component} from "react";
import { Link } from "react-router-dom";

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
} from "reactstrap";

import SalesPieChart from 'components/SalesPieChart'

import fire from '../firebase'
const database = fire.firestore()

class ProductList extends Component {

  state = {
    data:[],
    products:[]
  }
  componentDidMount(){

  // Initial call for products list
  const products = []
  database.collection('products').get()
  .then((snapshot) => {

    snapshot.forEach((doc) => {

      const item = [
        doc.data().name,
        doc.data().price,
        doc.data().inventory,
      ]

        products.push(item)

      });

    this.setState({
      data:products,
      products
    });

  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });

  database.collection('products')
  .onSnapshot(snapshot => {
      const products = []

      snapshot.forEach(doc => {

        const item = {
          productId:doc.id,
          name:doc.data().name,
          price:doc.data().price,
          inventory:doc.data().inventory,
        }

          products.push(item)

        });

      this.setState({
        data:products,
        products
      });

      });


}

  render(){
      const { data, products } = this.state

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

                    {products.map(p =>

                      <tr>
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

          <SalesPieChart />
        </div>
      </>
    );
  }
}

export default ProductList;
