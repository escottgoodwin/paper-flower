import React,{Component} from "react";
import firebase from 'firebase/app';
import 'firebase/auth'
import axios from 'axios'

import {
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Dropdown,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";

import fire from '../firebase'

import { SIGNUP_MUTATION } from '../ApolloQueries'

var google = new firebase.auth.GoogleAuthProvider();

const processLogin = (uid,props) => {
  localStorage.setItem('uid',uid)
  axios({
    // Of course the url should be where your actual GraphQL server is.
    url: process.env.REACT_APP_GRAPHQL_SERVER,
    method: 'post',
    data: {
        query: SIGNUP_MUTATION,
        variables: { uid }
    }
  }).then((result) => {
      console.log(result.data)
      localStorage.setItem('auth_token',result.data.data.login.token)
      props.history.push(`/admin/dashboard`)
  })

}


class SignUpGoogle extends Component {

  state = {
    name:'',
    showPassword: false,
    showError:false,
    errorMessage:'',
    nativeLang:'',
    dropdownOpen:false
  }

  googleSignIn = (props) => {

    fire.auth().signInWithPopup(google).then(function(result) {
      processLogin(result.user.uid,props)
    }).catch((error) => {
      var errorMessage = error.message;
      this.setState({errorMessage,showError:true})
    })
  }

  onDismiss = () => this.setState({showError:false})

  toggle = () => this.setState({dropdownOpen: !this.state.dropdownOpen})

  render(){

      const { name, password, email, showError, errorMessage, nativeLang } = this.state

  return (

        <div style={{margin:50}}>
          <Form>

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
                        {nativeLang}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => this.setState({nativeLang:'en'})}>English</DropdownItem>
                        <DropdownItem onClick={() => this.setState({nativeLang:'fr'})}>French</DropdownItem>
                        <DropdownItem onClick={() => this.setState({nativeLang:'de'})}>German</DropdownItem>
                        <DropdownItem onClick={() => this.setState({nativeLang:'es'})}>Spanish</DropdownItem>
                    </DropdownMenu>
                    </Dropdown>
                </FormGroup>
              </Col>
              </Row>

              <Row>
                <Col className="pl-1" md="12">
                  <Button onClick={() => this.emailSignIn(this.props)} variant="primary" >
                    Sign Up With Google
                  </Button>
                  </Col>
              </Row>
          </Form>
        </div>
      
  )
}

};

export default SignUpGoogle
