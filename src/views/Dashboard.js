import React, { useState } from "react";

import {
  Row,
  Col,
  Container
} from "reactstrap";

import ArtRecs from '../components/ArtRecs'

function Dashboard(){
  const [lang, setLang ] = useState('fr')
  const [language, setLanguage ] = useState('French')
  const [flag, setFlag ] = useState('FR')

  function switchLang(lang){
    if (lang==='fr'){
      setLang('fr')
      setFlag('FR')
      setLanguage('French')
    }
    if (lang==='de'){
      setLang('de')
      setFlag('De')
      setLanguage('German')
    }
    if (lang==='en'){
      setLang('en')
      setFlag('EN')
      setLanguage('English')
    }
    if (lang==='es'){
      setLang('es')
      setFlag('ES')
      setLanguage('Spanish')
    }
  }

  return(

        <div className="content">
        <Container >
          <Row fluid='true'>
            <Col lg="3" md="6" sm="3">

              <div >
                <h4 onClick={() => switchLang('fr')}>French</h4>
              </div>
            
            </Col>
            <Col lg="3" md="6" sm="3">

              <div >
                <h4 onClick={() => switchLang('de')}>German</h4>
              </div>

            </Col>
            <Col lg="3" md="3" sm="3" >

              <div onClick={() => switchLang('en')}>
                <h4>English</h4>
              </div>

            </Col>
            <Col lg="3" md="6" sm="6" >

              <div onClick={() => switchLang('es')}>
                <h4>Spanish</h4>
              </div>

            </Col>
          </Row>

          <Row fluid='true'>
            <Col md="12" >
              <ArtRecs lang={lang} flag={flag} language={language}/>
            </Col>
          </Row>



          
        </Container>
        </div>
   )
  }
  

export default Dashboard;
