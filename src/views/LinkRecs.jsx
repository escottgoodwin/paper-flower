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

import { Mutation, Query } from "react-apollo"
import { LINK_RECS_QUERY, SINGLE_LINK_MUTATION } from '../ApolloQueries'

class LinkRecs extends Component{

  state={
    link:'',
    transLang:'',
    error:false,
    errormsg:''
  }

  onDismiss() {
    this.setState({ error: false });
  }

  render(){
    const { link, transLang, error, errormsg } = this.state
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
          
            <Alert color="danger" isOpen={error} toggle={this.onDismiss}>
              {errormsg}
          </Alert>
          
          </Col>
            
        </Row>


        <Row>
          <Col className="pl-1" md="12">

            <Mutation
            mutation={SINGLE_LINK_MUTATION}
            variables={{ link, transLang }}
          
            onError={error => this._error (error)}
            update={(cache, { data: { singleLinkRecommendations } }) => {
            const { title, link,langt, recommendations } = singleLinkRecommendations
            cache.writeQuery({
              query: LINK_RECS_QUERY,
              data: { 
                recTitle: title,
                recLink: link,
                langt,
                recommendations,
              }
            })
          }
        }
          >
            {mutation => (

              <Button onClick={mutation} variant="primary" >
                Login
              </Button>

              )}
          </Mutation>

            </Col>
          </Row>

          <Row fluid='true'>
          <Col lg="12" md="12" sm="12">

          <Query query={LINK_RECS_QUERY} >
            {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
                if (error) return <div>{JSON.stringify(error)}</div>

                const { title, langt, link, recommendations } = data.linkRecs

            return (
              <>
              <div>{langt} Recommendations</div>
              <div>{title}</div>
              <div>{link}</div>
                {
                  recommendations.map(r => <>
                  <div>{r.title}</div>
                  <div>{r.link}</div></>)
                }
                </>
              )
            }}
          
            </Query>

            </Col>
            
          </Row>
          
        </Container>
        </div>
    )
  }
  _error = async error => {

    const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
    this.setState({ error: true, errormsg: gerrorMessage})

    error.networkError &&
      this.setState({ error: true, errormsg: error.networkError.message})
}
}

export default LinkRecs
