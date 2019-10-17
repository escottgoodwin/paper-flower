import React,{Component} from "react";
import { Link, Switch, Route } from 'react-router-dom'
import { FaFacebook, FaGooglePlusSquare, FaTwitterSquare,FaAt } from 'react-icons/fa';

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
    <Col  md="3">
        
        <FaAt onClick={() => this.setState({signIn:'email'})} size={32} />
        
    </Col>

      <Col  md="3">
        
          <FaGooglePlusSquare onClick={() => this.setState({signIn:'google'})} size={32} />
          
      </Col>
      <Col  md="3">
      
        <FaTwitterSquare onClick={() => this.setState({signIn:'twitter'})} size={32}/>
        
      </Col>
      <Col  md="3">
     
        <FaFacebook onClick={() => this.setState({signIn:'facebook'})} size={32} />
       
      </Col>
    </Row>

    <Row>
      <Col  md="12">
        {signIn==='email' &&
         <SignUpEmail history={this.props.history}/>
        }
        {signIn==='google' &&
         <SignUpGoogle history={this.props.history}/>
        }
        {signIn==='twitter' &&
         <SignUpTwitter history={this.props.history}/>
        }
        {signIn==='facebook' &&
         <SignUpFacebook history={this.props.history}/>
        }
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

  )
}

}

export default SignUp
