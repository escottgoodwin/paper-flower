import React,{Component} from "react";
import { Link, Switch, Route } from 'react-router-dom'
import { FaFacebook, FaGooglePlusSquare, FaTwitterSquare } from 'react-icons/fa';

import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";

import logo from "assets/img/flower_2.png";
import bkgd from "assets/img/loginmap1.jpg";

import SignUpEmail from '../components/SignUpEmail'
import SignUpGoogle from '../components/SignUpGoogle'
import SignUpTwitter from '../components/SignUpTwitter'
import SignUpFacebook from '../components/SignUpFacebook'

class SignUp extends Component {

  render(){

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
        <h3>Sign Up</h3>
      </div>
    </CardHeader>
    <CardBody>

    <Row>
      <Col  md="4">
        <Link to="/signupgoogle"> 
          <FaGooglePlusSquare size={32} />
          </Link>
      </Col>
      <Col  md="4">
      <Link to="/signuptwitter"> 
        <FaTwitterSquare size={32}/>
        </Link>
      </Col>
      <Col  md="4">
      <Link to="/signupfacebook"> 
        <FaFacebook size={32} />
        </Link>
      </Col>
    </Row>

    
        

      <Row>
        <Col>
        <Link to="/login"> 
            Login
        </Link>
        </Col>
      </Row>
      
      </CardBody>
    </Card>

      </div>
    </center>
  </div>
</div>

  )
}

}

export default SignUp
