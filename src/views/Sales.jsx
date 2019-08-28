import React,{Component} from "react";

import moment from 'moment'
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

  const sales = []
  db.collection('sales')
  .orderBy("saleDate", "desc")
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {

      const sale = {
        docId:doc.id,
        ...doc.data()
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

  db.collection("sales")
  .orderBy("saleDate", "desc")
  .onSnapshot(snapshot => {
      let sales = [];

      snapshot.forEach(doc => {

        const sale = {
          docId:doc.id,
          ...doc.data()
        }

        sales.push(sale)
      });



      this.setState({
        sales
      });
    });

  }

  render(){
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
                        <th>Date</th>
                        <th>Products</th>
                        <th>Total</th>
                        <th>Salesman</th>

                      </tr>
                    </thead>
                    <tbody>

                    {sales.map((p,i) =>

                      <tr key={i}>
                        <td>{p.customer}</td>
                        <td>{moment(p.saleDate.toDate()).calendar()}</td>
                        <td>{p.saleProducts.length}</td>
                        <td>${p.cartTotal}</td>
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
