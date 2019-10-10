import React from "react";

import {
  Row,
  Col,
  Container
} from "reactstrap";

function Dashboard(){
  
  return(

        <div className="content">
        <Container >
          <Row fluid='true'>
          <Col lg="3" md="6" sm="3">

            French 
          

            </Col>
            <Col lg="3" md="6" sm="3">
              German
            </Col>
            <Col lg="3" md="3" sm="3" >

              English

            </Col>
            <Col lg="3" md="6" sm="6" >
              French
            </Col>
          </Row>
          
        </Container>
        </div>
   )
  }
  

export default Dashboard;
