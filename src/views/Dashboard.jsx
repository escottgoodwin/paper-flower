import React from "react";
// react plugin used to create charts
import { Line, Pie, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Container
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "variables/charts.jsx";

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

function Dashboard() {

    return (
      <>
        <div className="content">
        <Container >
          <Row fluid>
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
      </>
    );

}

export default Dashboard;
