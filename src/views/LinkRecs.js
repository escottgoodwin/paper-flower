import React,{Component} from "react";

import {
  Row,
  Col,
  Container,
  Input,
  Button,
  ButtonGroup,
  Alert
} from "reactstrap";

import { Mutation } from "react-apollo"
import { SINGLE_LINK_MUTATION } from '../ApolloQueries'

import LinkRecs1 from '../components/LinkRecs'
import { FaRegCaretSquareUp } from "react-icons/fa";

class LinkRecs extends Component{

  state={
    link:'',
    transLang:'',
    error:false,
    errormsg:'',
    recresp:{
      title: '',
      link: '',
      langt:'',
      recommendations:[]
    }
  }

  onDismiss = () => this.setState({ error: false })

  render(){
    const { link, transLang, error, errormsg, recresp } = this.state
    return(

        <div className="content">
        <Container >

        <Row fluid='true'>
          <Col lg="12" md="12" sm="12">

          <ButtonGroup>
            <Button onClick={() => this.setState({transLang:'en'})}>English</Button>
            <Button onClick={() => this.setState({transLang:'fr'})}>French</Button>
            <Button onClick={() => this.setState({transLang:'de'})}>German</Button>
            <Button onClick={() => this.setState({transLang:'es'})}>Spanish</Button>
          </ButtonGroup>

          </Col>
            
        </Row>

          <Row fluid='true'>
          <Col lg="12" md="12" sm="12">

          <Input onChange={e => this.setState({ link: e.target.value })} placeholder="Link" />
          
          </Col>
            
        </Row>


        <Row>
          <Col lg="12" md="12" sm="12">

            <Mutation
            mutation={SINGLE_LINK_MUTATION}
            variables={{ link, transLang }}
            onCompleted={data => this._confirm(data)}
            onError={error => this._error (error)}
          >
            {mutation => (

              <Button onClick={mutation} variant="primary" outline >
                Login
              </Button>

              )}
          </Mutation>

          <Alert color="danger" isOpen={error} toggle={this.onDismiss}>
              {errormsg}
            </Alert>

          </Col>
        </Row>
        {recresp.recommendations.length>0 &&
        <LinkRecs1 lang={transLang} {...recresp}/>
        }
          
        </Container>
        </div>
    )
  }

  _confirm = async data => {
    console.log(data)
    const recresp = data.singleLinkRecommendations
    this.setState({recresp})
  }

  _error = async error => {

    const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
    this.setState({ error: true, errormsg: gerrorMessage})

    error.networkError &&
      this.setState({ error: true, errormsg: error.networkError.message})
}
}

export default LinkRecs
