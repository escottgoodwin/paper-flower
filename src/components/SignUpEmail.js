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
  Toast,
  Dropdown, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";

import fire from '../firebase'
import { SIGNUP_MUTATION } from '../ApolloQueries'


const processSignUp = (uid, email, name, nativeLang, history) => {

  axios({
    // Of course the url should be where your actual GraphQL server is.
    url: process.env.REACT_APP_GRAPHQL_SERVER,
    method: 'post',
    data: {
        query: SIGNUP_MUTATION,
        variables: { uid, email, password:'', name, nativeLang,  }
    }
  }).then((result) => {
    history.push('sign_up_confirm')
    
  })
  .catch((error) => {
    var errorMessage = error.message;
    
  })

}


class SignUpEmail extends Component {

  state = {
    name:'',
    email:'',
    password:'',
    showPassword: false,
    showError:false,
    errorMessage:'',
    nativeLang:'',
    nativeLanguage:'Choose',
    dropdownOpen:false,
    signedUp:false
  }

  emailSignUp = (email, password, name, nativeLang, history) => {

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(result) {
      const uid = result.user.uid
      processSignUp(uid, email, name, nativeLang, history)
      
    }).catch((error) => {
      var errorMessage = error.message;
      this.setState({errorMessage,showError:true})
    })
    
  }

  onDismiss = () => this.setState({showError:false})

  toggle = () => this.setState({dropdownOpen: !this.state.dropdownOpen})

  render(){
      const { history } = this.props
      const { name, password, email, showError, errorMessage, nativeLang, dropdownOpen, nativeLanguage, signedUp } = this.state

  return (

        <div style={{margin:50}}>
          <Form>

            <Row>
                <Col className="pl-1" md="12">
                  <FormGroup>
                    <label >
                      Email address
                    </label>
                    <Input onChange={e => this.setState({ email: e.target.value })} placeholder="Email" />
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
                    <FormGroup>
                    <label >
                        Name
                    </label>
                    <Input onChange={e => this.setState({ name: e.target.value })} placeholder="Name"  />
                    </FormGroup>
                </Col>
                </Row>


              <Row>
              <Col className="pl-1" md="12">
                <FormGroup controlid="formBasicPassword">
                  <label >
                    Native Language
                  </label>
                  <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        {nativeLanguage}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => this.setState({nativeLang:'en',nativeLanguage:'English'})}>English</DropdownItem>
                        <DropdownItem onClick={() => this.setState({nativeLang:'fr',nativeLanguage:'French'})}>French</DropdownItem>
                        <DropdownItem onClick={() => this.setState({nativeLang:'de',nativeLanguage:'German'})}>German</DropdownItem>
                        <DropdownItem onClick={() => this.setState({nativeLang:'es',nativeLanguage:'Spanish'})}>Spanish</DropdownItem>
                    </DropdownMenu>
                    </Dropdown>
                </FormGroup>
              </Col>
              </Row>

              <Row>
                <Col className="pl-1" md="12">
                  <Button onClick={() => this.emailSignUp(email, password, name, nativeLang, history)} variant="primary" >
                    Sign Up With Email
                  </Button>
                  </Col>
              </Row>

              <Row>
                <Col className="pl-1" md="12">
                  {signedUp &&
                  <>
                  <h6>
                    Sign Up Successful!
                  </h6>
                  <h6>
                    Please check your email to confirm your account. 
                </h6>
                </>
                  }
                  </Col>
              </Row>
          </Form>
        </div>
      
  )
}

};

export default SignUpEmail
