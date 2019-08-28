import React, { Component } from "react";
import moment from 'moment'

import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";

import fire from '../firebase'
const database = fire.firestore()

class Inventory extends Component {

  state = {
    inventory:'',
    itemNum:0,
    lastAdded:null
  }

  componentDidMount(){
    const ref = database.collection('products').orderBy("addedDate", "desc")

    ref.get()
    .then((snapshot) => {
      const products = []
      snapshot.forEach((doc) => {

        const product = {
          docId:doc.id,
          ...doc.data()
        }

        products.push(product)

      });

      const productslist = products.map(s => parseFloat(s.inventory))

      const productsSum =  productslist.reduce((a,b) => a + b, 0)

      this.setState({inventory:productsSum,lastAdded:products[0]})

    })
    .catch((err) => {
      console.log('Error getting documents', err);
    })

    ref.onSnapshot(snapshot => {
        let products = [];

        snapshot.forEach(doc => {
          const product = {
            docId:doc.id,
            ...doc.data()
          }

          products.push(product)
        });

        const productslist = products.map(s => parseFloat(s.inventory))
        const productsSum =  productslist.reduce((a,b) => a + b, 0)

        this.setState({inventory:productsSum,lastAdded:products[0]})
      })

  }

  render(){
    const { inventory, lastAdded } = this.state

    return (
      <Card className="card-stats">
        <CardBody>
          <Row>
            <Col md="4" xs="5">
              <div className="icon-big text-center icon-warning">
                <i className="nc-icon nc-paper text-warning" />
              </div>
            </Col>
            <Col md="8" xs="7">
              <div className="numbers">
                <p className="card-category">Inventory</p>
                <CardTitle tag="p">{inventory}</CardTitle>
                <p />
              </div>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <hr />
          {lastAdded!==null &&
          <div className="stats">
            <div>
            Last Product Added:
            </div>
            <div>
             {lastAdded.name}
             </div>
             <div>
             {moment(lastAdded.addedDate.toDate()).calendar()}
             </div>
          </div>
        }
        </CardFooter>
      </Card>
    )
  }
}

export default Inventory
