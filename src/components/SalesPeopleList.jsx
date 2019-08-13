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
import { Link } from "react-router-dom";


// reactstrap components
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

function groupBy(arr, criteria) {
   return arr.reduce(function (obj, item) {

// Check if the criteria is a function to run on the item or a property of it
var key = typeof criteria === 'function' ? criteria(item) : item[criteria];

// If the key doesn't exist yet, create it
  if (!obj.hasOwnProperty(key)) {
    obj[key] = [];
  }

  // Push the value to the object
  obj[key].push(item);

  // Return the object to the next item in the loop
  return obj;

}, {});
};

function personSalesList1(arr){
    let custs = []
    for (const [ key, value ] of Object.entries(arr)) {
      const number = value.map(c => c.price).length
      const salesmanId = value.map(c => c.salesmanId)[0]
      const sales = value.map(p => parseFloat(p.price)).reduce((a,b) => a + b, 0)
      let item = {salesmanId:salesmanId,name:key,sales:sales,number:number}
      custs.push(item)

    }
    return custs
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
                        <td>{p.sales}</td>
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
