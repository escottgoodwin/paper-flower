import React,{Component} from "react";
import firebase from 'firebase/app';
import 'firebase/auth'
import axios from 'axios'
// nodejs library to set properties for components
import { FaFacebook, FaGooglePlusSquare, FaTwitterSquare } from 'react-icons/fa';
// @material-ui/core components

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Alert,
  Toast
} from "reactstrap";

import fire from '../firebase'

import logo from "assets/img/flower_2.png";
import bkgd from "assets/img/loginmap1.jpg";
import { LOGIN_MUTATION } from '../ApolloQueries'
const database = fire.firestore()

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
      const { showError, errorMessage } = this.state

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
        <h3>Login</h3>
      </div>
    </CardHeader>
    <CardBody>

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
        </div>
      </CardBody>
    </Card>

    <div style={{height:50}}>
    <Alert color="danger" isOpen={showError} toggle={this.onDismiss}>
      <b>Error</b> {errorMessage}
    </Alert>
    </div>
      </div>
    </center>
  </div>
</div>

  );
}

};

export default Login;
