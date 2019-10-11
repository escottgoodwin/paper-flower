import React,{Component} from "react";
import {Link} from 'react-router-dom'
import moment from 'moment'
import {
  Row,
  Col,
} from "reactstrap";

import { Query } from "react-apollo"
import { LINK_RECS_QUERY } from '../ApolloQueries'

const LinkRecs = ({lang, title, link, langt, recommendations}) =>

  <Row fluid='true'>
    <Col lg="12" md="12" sm="12">

        <>
        <div><h4>Article</h4></div>
        <div><h3><a href={link} target="_blank">{title}</a></h3></div>

        <div><h4>{langt} Recommendations</h4></div>
          {
            recommendations.map(r => <>
            <div>{moment(r.date).format('MMMM Do YYYY')}</div>
            <div>
              <Link 
                  to={{ 
                  pathname: '/admin/article', 
                  state: {
                    art_id: r.art_id,
                    lang
                  }
                  }}>
                <h5>{r.title}</h5>
              </Link>
              </div>
            </>)
          }
          </>
      

    </Col>
    
  </Row>

export default LinkRecs