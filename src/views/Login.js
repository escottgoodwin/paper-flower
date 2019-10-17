import React,{Component} from "react";
import firebase from 'firebase/app';
import 'firebase/auth'
import axios from 'axios'
import { Link } from 'react-router-dom'
// nodejs library to set properties for components
import { FaFacebook, FaGooglePlusSquare, FaTwitterSquare } from 'react-icons/fa';
// @material-ui/core components

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

import fire from '../firebase'

import bkgd from "assets/img/loginmap1.jpg";
import { LOGIN_MUTATION } from '../ApolloQueries'

var google = new firebase.auth.GoogleAuthProvider();

var facebook = new firebase.auth.FacebookAuthProvider();

var twitter = new firebase.auth.TwitterAuthProvider();


const processLogin = (uid,props) => {
  localStorage.setItem('uid',uid)
  axios({
    // Of course the url should be where your actual GraphQL server is.
    url: process.env.REACT_APP_GRAPHQL_SERVER,
    method: 'post',
    data: {
        query: LOGIN_MUTATION,
        variables: { uid }
    }
  }).then((result) => {
      console.log(result.data)
      localStorage.setItem('auth_token',result.data.data.login.token)
      props.history.push(`/admin/dashboard`)
  })

}


class Login extends Component {

  state = {
    name:'',
    email:'',
    password:'',
    showPassword: false,
    showError:false,
    errorMessage:''
  }

  googleSignIn = (props) => {

    fire.auth().signInWithPopup(google).then(function(result) {
      console.log(result.user)
      processLogin(result.user.uid,props)
    }).catch((error) => {
      var errorMessage = error.message;
      this.setState({errorMessage,showError:true})
    })
  }

  facebookSignIn = (props) => {

    fire.auth().signInWithPopup(facebook).then(function(result) {
      processLogin(result.user.uid,props)
    }).catch((error) => {
      var errorMessage = error.message;
      this.setState({errorMessage,showError:true})
    })

  }

  twitterSignIn = (props) => {

    fire.auth().signInWithPopup(twitter).then(function(result) {
      processLogin(result.user.uid,props)
    }).catch((error) => {
      var errorMessage = error.message;
      this.setState({errorMessage,showError:true})
    })
  }

  emailSignIn = (props) => {
    const { email, password } = this.state

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(result) {
      processLogin(result.user.uid,props)
    }).catch((error) => {
      var errorMessage = error.message;
      this.setState({errorMessage,showError:true})
    })
  }

  onDismiss = () => this.setState({showError:false})

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
    
    <CardBody>

    <Row>
    <Col md="12">
    <div style={{marginTop:50}}>
      <h5>Langa Learn</h5>
      </div>
    </Col>
    </Row>
        
    <Row>
    <Col  md="12">
      <h3>Login</h3>
    </Col>
    </Row>


        <Row>
          <Col  md="4">
             <FaGooglePlusSquare onClick={() => this.googleSignIn(this.props)} size={32} />
          </Col>
          <Col  md="4">
            <FaTwitterSquare onClick={() => this.twitterSignIn(this.props)} size={32}/>
          </Col>
          <Col  md="4">
            <FaFacebook onClick={() => this.facebookSignIn(this.props)} size={32} />
          </Col>
        </Row>
        <div style={{margin:50}}>
          <Form>
            <Row>
                <Col className="pl-1" md="12">
                  <FormGroup>
                    <label >
                      Email address
                    </label>
                    <Input onChange={e => this.setState({ email: e.target.value })} placeholder="Email" type="email" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col className="pl-1" md="12">
                <FormGroup controlid="formBasicPassword">
                  <label >
                    Password
                  </label>
                  <Input onChange={e => this.setState({ password: e.target.value })} placeholder="Password" type="password" />
                </FormGroup>
              </Col>
              </Row>
              <Row>
                <Col className="pl-1" md="12">
                  <Button onClick={() => this.emailSignIn(this.props)} variant="primary" >
                    Login
                  </Button>
                  </Col>
              </Row>
          </Form>

          <Row>
        <Col>
        <div style={{marginTop:30}}>
        <Link to="/sign_up"> 
          <h5>Sign Up</h5>  
        </Link>
        </div>
        </Col>
      </Row>

        </div>
      </CardBody>
    </Card>

    <div style={{height:50}}>
    
    </div>
      </div>
    </center>
  </div>
</div>

  );
}

};

export default Login;
