import React from "react";
import { Link } from "react-router-dom";
import { groupBy } from '../util'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

import fire from '../firebase'
const db = fire.firestore()

function personSalesList1(arr){
    let salesman = []

    for (const [ key, value ] of Object.entries(arr)) {
      const number = value.map(c => c.price).length
      const salesmanId = value.map(c => c.salesmanId)[0]
      const sales = value.map(p => parseFloat(p.cartTotal)).reduce((a,b) => a + b, 0)
      let item = {salesmanId:salesmanId,name:key,sales:sales,number:number}
      salesman.push(item)
    }
    return salesman
}

class SalesPeopleList extends React.Component {

  state = {
    salesmen: []
  };

  componentDidMount(){

  // Initial call for sales list
  const sales = []
  db.collection('sales').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {

      const sale = {
        docId:doc.id,
        ...doc.data()
      }

      sales.push(sale)
    });


    const groupedSalesmen =  groupBy(sales,'salesman')

    const salesmen = personSalesList1(groupedSalesmen)

    this.setState({
      salesmen
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
          ...doc.data()
        }

        sales.push(sale)
      });

      const groupedSalesmen =  groupBy(sales,'salesman')

      const salesmen = personSalesList1(groupedSalesmen)

      this.setState({
        salesmen
      });

    });

  }



  render() {

    const { salesmen } = this.state

    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card >
                <CardHeader>
                  <CardTitle className="text-success" tag="h4">Sales People</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table >
                    <thead className="text-success">
                      <tr>
                        <th>Name</th>
                        <th>Amount ($)</th>
                        <th>Number</th>
                      </tr>
                    </thead>
                    <tbody>
                    {salesmen.map(p =>

                      <tr key={p.salesmanId}>
                        <td >
                        <Link to={{
                          pathname: "salesman_profile",
                          state:
                            { salesmanId: p.salesmanId }
                          }}>
                          <div className="text-success">
                          {p.name}
                          </div>
                          </Link>

                          </td>
                        <td>${p.sales}</td>
                        <td>{p.number}</td>
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
                  pathname: "salesperson_add",
                  state:
                    {  }
                  }}>
                <Button
                  className="btn-round"
                  color="success"
                  type="submit"
                >
                  Add Sales Person
                </Button>

                </Link>
                </center>
                </Col>

              </Row>
                </CardFooter>
              </Card>
            </Col>

          </Row>
        </div>
      </>
    );
  }
}

export default SalesPeopleList;
