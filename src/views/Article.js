import React,{Component} from "react";
import moment from 'moment'
import {
  Row,
  Col,
  Container,
  Input,
  Button,
  ButtonGroup,
  Alert
} from "reactstrap";

import { Query } from "react-apollo"
import { ARTICLE_QUERY } from '../ApolloQueries'

import LinkRecs1 from '../components/LinkRecs'
import { FaRegCaretSquareUp } from "react-icons/fa";

class Article extends Component{

  render(){
    const { art_id, lang } = this.props.location.state
    return(

        <div className="content">

        <Query query={ARTICLE_QUERY} variables={{ artId: art_id, lang }} >
            {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
                if (error) return <div>{JSON.stringify(error)}</div>

                const { article, title, link, date, translations } = data.article
              
            return (

              <Container >

        <Row >
          <Col md="10" >

                <Row fluid='true'>
                <Col lg="12" md="12" sm="12">
                <div>{moment(date).format('MMMM Do YYYY')}</div>
                <div><h3><a href={link} target="_blank">{title}</a></h3></div>
              
                </Col>
                  
              </Row>

              <Row>
                <Col lg="12" md="12" sm="12">

                  <h5>{article}</h5>
                
                </Col>
              </Row>

        </Col>
        <Col md="2">

          <div>Translations</div>

          {translations.map(t => 
            <div>{t.orig_text} - {t.trans_text}</div>
            )}

        </Col>
        </Row>
        </Container>
      )
      }}
      </Query>
          
       
        </div>
    )
  }

}

export default Article
