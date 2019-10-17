import React from "react";
import { Link } from 'react-router-dom'

import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";

import bkgd from "assets/img/loginmap1.jpg";


function SignUpConfirm() {

  return (

    <div style={{
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${bkgd})`}} >

  <div style={{paddingRight:'30%',paddingLeft:'30%',paddingTop:'10%',paddingBottom:'10%'}} >

    <center>
    <div style={{margin:20}}>

    <Card className="card-stats">
    <CardHeader>
      <div>
        <h5>Langa Learn</h5>
      </div>
      <div>
        <h3>Sign Up Confirmed</h3>
      </div>
    </CardHeader>
    <CardBody>

        <Row>
          <Col md="12">
            <h4>Please check your email to confirm your account.</h4>
          </Col>  
        </Row>
        
        <Row>
        <Col>
        <div style={{marginBottom:40}}>
        <Link to="/login"> 
          <h5>Login</h5>  
        </Link>
        </div>
        </Col>
      </Row>
        
        
      </CardBody>
    </Card>

      </div>
    </center>
  </div>
</div>

  );
}

export default SignUpConfirm
