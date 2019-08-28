import React from "react";

import {
  Row,
  Col,
  Container
} from "reactstrap";

import Inventory from '../components/Inventory'
import Sales from '../components/Sales'
import Salesmen from '../components/Salesmen'
import Customers from '../components/Customers'
import SalesBarChart from '../components/SalesBarChart'
import SalesPieChart from '../components/SalesPieChart'
import InventoryPieChart from '../components/InventoryPieChart'
import InventoryBarChart from '../components/InventoryBarChart'
import CustomerList from '../components/CustomerList'
import SalesPeopleList from '../components/SalesPeopleList'

const Dashboard = () =>

        <div className="content">
        <Container >
          <Row fluid='true'>
            <Col lg="3" md="6" sm="6">

            <Inventory />

            </Col>
            <Col lg="3" md="6" sm="6">
              <Sales />
            </Col>
            <Col lg="3" md="6" sm="6" >

              <Salesmen />

            </Col>
            <Col lg="3" md="6" sm="6" >
              <Customers />
            </Col>
          </Row>
          <Row>
            <Col md="6">

              <SalesBarChart />

            </Col>

            <Col md="6">

            <SalesPieChart />

            </Col>
          </Row>

          <Row>
            <Col md="6">

              <InventoryBarChart />

            </Col>

            <Col md="6">

            <InventoryPieChart />

            </Col>
          </Row>

          <Row>
            <Col md="12">

              <SalesPeopleList />

            </Col>

            <Col md="12">

            <CustomerList />

            </Col>
          </Row>
        </Container>
        </div>

export default Dashboard;
