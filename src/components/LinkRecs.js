import React,{Component} from "react";
import {Link} from 'react-router-dom'
import moment from 'moment'
import {
  Row,
  Col,
} from "reactstrap";

import { Query } from "react-apollo"
import { LINK_RECS_QUERY } from '../ApolloQueries'

import LinkRec from './LinkRec'

class LinkRecs extends Component{

  render(){
    const {lang} = this.props
    return(

      <Query query={LINK_RECS_QUERY}  >
        {({ loading, error, data }) => {
            if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
            if (error) return <div>{JSON.stringify(error)}</div>

            const { title, link, recommendations } = data.linkRecommendations
              
            return (

              <Row >
                <Col md="12">
                {recommendations.length>0 &&
                <>
                    <div>
                      <h4>Article</h4>
                      </div>

                    <div>
                      <h3><a href={link} target="_blank">{title}</a></h3>
                      </div>

                    <div>
                      <h4> Recommendations</h4>
                      </div>

                      {
                        recommendations.map(r => 
                          <LinkRec key={r.art_id} lang={lang} {...r} />
                        )
                      }

                    </>
                  }
                </Col>
                
              </Row>

            )
          }}
       </Query>

      )
    }
  }

export default LinkRecs