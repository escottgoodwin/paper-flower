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
  Table,
  Row,
  Col
} from "reactstrap";

import SalesPieChart from 'components/SalesPieChart'
import SalesPersonPieChart from 'components/SalesPersonPieChart'
import SalesMap1 from 'components/SalesMap1'


import fire from '../firebase'
const db = fire.firestore()

class SalesList extends Component {

  state = {
    sales:[]
  }

  componentDidMount(){

  // Initial call for sales list
  const sales = []
  db.collection('sales').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {

      const sale = {
        docId:doc.id,
        productName:doc.data().productName,
        productId:doc.data().productId,
        price:doc.data().price,
        productImg:doc.data().productImg,
        customer:doc.data().customer,
        customerId:doc.data().customerId,
        salesmanId:doc.data().salesmanId,
        salesman:doc.data().salesman,
        uid:doc.data().uid
      }

      sales.push(sale)
    });

    this.setState({
      sales
    });

  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });


  //listener that updates if a sale is added
  db.collection("sales")
  .onSnapshot(snapshot => {
      let sales = [];

      snapshot.forEach(doc => {

        const sale = {
          docId:doc.id,
          productName:doc.data().productName,
          productId:doc.data().productId,
          price:doc.data().price,
          productImg:doc.data().productImg,
          customer:doc.data().customer,
          customerId:doc.data().customerId,
          salesmanId:doc.data().salesmanId,
          salesman:doc.data().salesman,
          uid:doc.data().uid
        }

        sales.push(sale)
      });



      this.setState({
        sales
      });
    });

  }

  render(){
      const { classes } = this.props;
      const { sales } = this.state
    return (
      <>
        <div className="content">
        <Row>
          <Col md="6">
        <SalesPieChart />
        </Col>
        <Col md="6">
        <SalesPersonPieChart />
      </Col>
        </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-success" tag="h4">  <i className="nc-icon nc-money-coins text-success" /> Sales</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-success">
                      <tr>
                        <th>Company</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Salesman</th>

                      </tr>
                    </thead>
                    <tbody>

                    {sales.map(p =>

                      <tr>
                        <td>{p.customer}</td>
                        <td>{p.productName}</td>
                        <td>{p.price}</td>
                        <td>{p.salesman}</td>
                      </tr>

                    )}

                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>

          </Row>

          <SalesMap1 />
        </div>
      </>
    );
  }
}

export default SalesList;
