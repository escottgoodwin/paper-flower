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

  state ={ 
    signIn:'email'
  }

  render(){

  const { signIn} = this.state
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
        
        <FaGooglePlusSquare onClick={() => this.setState({signIn:'email'})} size={32} />
        
    </Col>

      <Col  md="4">
        
          <FaGooglePlusSquare onClick={() => this.setState({signIn:'google'})} size={32} />
          
      </Col>
      <Col  md="4">
      
        <FaTwitterSquare onClick={() => this.setState({signIn:'twitter'})} size={32}/>
        
      </Col>
      <Col  md="4">
     
        <FaFacebook onClick={() => this.setState({signIn:'facebook'})} size={32} />
       
      </Col>
    </Row>

    <Row>
      <Col  md="4">
        {signIn==='email' &&
         <SignUpEmail />
        }
        {signIn==='google' &&
         <SignUpGoogle />
        }
        {signIn==='twitter' &&
         <SignUpTwitter />
        }
        {signIn==='facebook' &&
         <SignUpFacebook />
        }
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
