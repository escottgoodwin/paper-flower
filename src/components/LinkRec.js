import React from "react";
import { Link } from 'react-router-dom'
import moment from 'moment'


const LinkRec = ({lang,art_id,date,title}) => 

      <div key={art_id}>
        <div>{moment(date).format('MMMM Do YYYY')}</div>
        <div>
          <Link 
              to={{ 
              pathname: '/admin/article', 
              state: {
                art_id: art_id,
                lang
              }
              }}>
            <h5 >{title}</h5>
          </Link>
          </div>
        </div>
                     

export default LinkRec