import React,{Component} from "react";
import firebase from 'firebase/app';
import 'firebase/auth'
import { Link } from 'react-router-dom'
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom'
import { FaFacebook, FaGooglePlusSquare, FaTwitterSquare } from 'react-icons/fa';
// @material-ui/core components

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Alert
} from "reactstrap";

import fire from '../firebase'

import logo from "assets/img/flower_2.png";
import bkgd from "assets/img/flower-field-3.jpg";


var google = new firebase.auth.GoogleAuthProvider();

var facebook = new firebase.auth.FacebookAuthProvider();

var twitter = new firebase.auth.TwitterAuthProvider();

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "black",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};


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
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.

  props.history.push(`/admin/dashboard`)

  // ...
}).catch((error) => {
  // Handle Errors here.
  var errorMessage = error.message;
  this.setState({errorMessage,showError:true})

});

  }

  facebookSignIn = (props) => {
    fire.auth().signInWithPopup(facebook).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.

  props.history.push(`/admin/dashboard`)

  // ...
}).catch((error) => {
  // Handle Errors here.
  var errorMessage = error.message;
  this.setState({errorMessage,showError:true})
  // ...
});

  }

  twitterSignIn = (props) => {
    fire.auth().signInWithPopup(twitter).then(function(result) {
      props.history.push(`/admin/dashboard`)
    }).catch((error) => {
      var errorMessage = error.message;
      this.setState({errorMessage,showError:true})
    });
  }

  emailSignIn = (props) => {
    const { email, password } = this.state
    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    console.log(result)
    props.history.push(`/admin/dashboard`)

    // ...
    }).catch((error) => {
    // Handle Errors here.
    var errorMessage = error.message;

    this.setState({errorMessage,showError:true})
    // ...
    });

  }

onDismiss = () => this.setState({showError:false})

  render(){

      const { classes } = this.props;
      const { email, password, showPassword, showError, errorMessage } = this.state

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
        <img src={logo} alt='logo' width="50" height="50"/>
      </div>
      <div>
        <h3>Login</h3>
      </div>
    </CardHeader>
      <CardBody>

        <Row>
          <Col  md="4">
             <FaGooglePlusSquare size={32} />
          </Col>
          <Col  md="4">
            <FaTwitterSquare size={32}/>
          </Col>
          <Col  md="4">
            <FaFacebook size={32} />
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
