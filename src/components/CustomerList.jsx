import React from "react";
import { Link } from "react-router-dom";
import { groupBy } from '../util'

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";


import fire from '../firebase'
const db = fire.firestore()

function personSalesList1(arr){
    let custs = []
    for (const [ key, value ] of Object.entries(arr)) {

      const number = value.map(c => c.price).length
      const customerId = value.map(c => c.customerId)[0]
      const customerLat = value.map(c => c.customerLat)[0]
      const customerLong = value.map(c => c.customerLong)[0]
      const sales = value.map(p => parseFloat(p.cartTotal)).reduce((a,b) => a + b, 0)
      let item = {customerId:customerId,name:key,customerLat:customerLat,customerLong:customerLong,sales:sales,number:number}
      custs.push(item)
    }
    return custs
}

class CustomerList extends React.Component {

  state = {
    custs: []
  };

  componentDidMount(){

  // Initial call for sales list
  const ref = db.collection('sales')

  ref.get()
  .then((snapshot) => {
    const sales = []
    snapshot.forEach((doc) => {
      const sale = {
        docId:doc.id,
        ...doc.data()
      }
      sales.push(sale)
    })

    const groupedCust =  groupBy(sales,'customer')

    const custs = personSalesList1(groupedCust)

    this.setState({
      custs
    })
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  })

  ref.onSnapshot(snapshot => {
      let sales = []
      snapshot.forEach(doc => {
        const sale = {
          docId:doc.id,
          ...doc.data()
        }
        sales.push(sale)
      })

      const groupedCust =  groupBy(sales,'customer')

      const custs = personSalesList1(groupedCust)

      this.setState({
        custs
      })

    })

  }


  render() {

    const { custs } = this.state

    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card >
                <CardHeader>
                  <CardTitle className="text-primary" tag="h4">Customers</CardTitle>
                </CardHeader>
                <CardBody>

                  <Table >
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Amount ($)</th>
                        <th>Number</th>
                      </tr>
                    </thead>
                    <tbody>
                    {custs.map(p =>

                      <tr key={p.customerId}>
                        <td>
                        <Link to={{
                          pathname: "customer_profile",
                          state:
                            { customerId: p.customerId }
                          }}>
                          {p.name}
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
                  pathname: "customer_add",
                  state:
                    {  }
                  }}>
                <Button
                  className="btn-round"
                  color="primary"
                  type="submit"
                >
                  Add Customer
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

export default CustomerList;
