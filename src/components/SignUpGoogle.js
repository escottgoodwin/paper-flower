import React,{Component} from "react";
import firebase from 'firebase/app';
import 'firebase/auth'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

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


class SignUpGoogle extends Component {

  state = {
    name:'',
    showPassword: false,
    showError:false,
    errorMessage:'',
    nativeLang:'',
    nativeLanguage:'Choose',
    dropdownOpen:false
  }

  googleSignUp = (name, nativeLang, history) => {

    fire.auth().signInWithPopup(google).then(function(result) {

      const { uid, email } = result.user
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
      const { name, nativeLang, nativeLanguage } = this.state

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
                  <Button onClick={() => this.googleSignUp(name, nativeLang, history)} variant="primary" >
                    Sign Up With Google
                  </Button>
                  </Col>
              </Row>
          </Form>
        </div>
      
  )
}

};

export default withRouter(SignUpGoogle)
