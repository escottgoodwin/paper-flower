/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
// react plugin used to create google maps
import fire from '../firebase'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, Modal, ModalFooter, ModalHeader, Button, ModalBody,FormGroup,
Form,
Input } from "reactstrap";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment)

const mapStyles = {
  width: '100%',
  height: '100%',
};

const db = fire.firestore()

class DashboardCalendar extends React.Component {

  state = {
    events:[],
    modal:false,
    modalTitle:'',
    modalText:'',
    modalId:'',
    addEventModal:'',
    addEventTitle:'',
    addEventStart:null,
    addEventEnd:null,
    addEventDescription:''
  };

  toggle = (event) => {

    this.setState(prevState => ({
      modal: !prevState.modal,
      modalTitle:event.title,
      modalDescription:event.description,
      modalId:event.id
    }));
  }

  toggleAddEvent = (event) => {
    this.setState(prevState => ({
      addEventModal: !prevState.addEventModal,
    }));
  }

  addEvent = () => {
    const { addEventTitle, addEventDescription, addEventStart, addEventEnd } = this.state
    db.collection("events").add({
    title:addEventTitle,
    description:addEventDescription,
    startTime:addEventStart,
    endTime:addEventEnd
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

    this.setState(prevState => ({
      addEventModal: !prevState.addEventModal,
      addEventEnd:null,
      addEventStart:null,
      addEventTitle:'',
      addEventDescription:''
    }));
  }

  handleSelect = ({ start, end }) => {

    this.setState(prevState => ({
      addEventModal: !prevState.addEventModal,
      addEventStart:start,
      addEventEnd:end,
    }));
    const { addEventStart, addEventEnd} = this.state

   }

   deleteEvent = id =>{
     db.collection("events").doc(id).delete().then(function() {
       console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });

      this.setState(prevState => ({
        modal: !prevState.modal
      }));
   }

  componentDidMount(){

  const events = []
  db.collection('events').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {

      const event = {
        id:doc.id,
        title:doc.data().title,
        description:doc.data().description,
        start:doc.data().startTime.toDate(),
        end:doc.data().endTime.toDate()
      }
      events.push(event)
    })

      this.setState({events})
  })

    db.collection('events')
    .onSnapshot(snapshot => {
      let events = [];

      snapshot.forEach(doc => {
        const event = {
          id:doc.id,
          title:doc.data().title,
          description:doc.data().description,
          start:doc.data().startTime.toDate(),
          end:doc.data().endTime.toDate()
        }
        events.push(event)
      });

      this.setState({events})

    });


  }

  render() {

  const { events, modalTitle, modalDescription, modal, modalId, addEventModal, addEventTitle, addEventDescription, addEventStart, addEventEnd } = this.state

    return (
      <div style={{marginTop:100,marginLeft:20,marginRight:20}}>

        <div className="content">
          <Row>
            <Col md="12">
              <Card>

                <CardBody>
                  <div

                    style={{ paddingBottom:50, position: "relative", overflow: "hidden" }}
                  >

                <Calendar
                  selectable
                  localizer={localizer}
                  views={['month', 'day', 'week','agenda']}
                  events={this.state.events}
                  defaultView='month'
                  scrollToTime={new Date(1970, 1, 1, 6)}
                  defaultDate={new Date()}
                  onSelectEvent={event => this.toggle(event)}
                  onSelectSlot={this.handleSelect}
                  resizable
                  style={{ height: "100vh" }}
                />

                </div>
                </CardBody>
                </Card>
                </Col>
                </Row>
                </div>
                <Modal isOpen={modal} toggle={this.toggle} >
                  <ModalHeader toggle={this.toggle}>{modalTitle}</ModalHeader>
                  <ModalBody>
                    {modalDescription}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={() => this.deleteEvent(modalId)}>Delete</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
                </Modal>

                <Modal isOpen={addEventModal} toggle={this.toggleAddEvent} >
                  <ModalHeader toggle={this.toggleAddEvent}>Add Event</ModalHeader>
                  <ModalBody>
                  {addEventStart && <div>Time: {moment(addEventStart).format('MMMM Do YYYY, h:mm A')} - {moment(addEventEnd).format('MMMM Do YYYY, h:mm A')}</div>}
                  <Row>
                  <Col>
                  <FormGroup>
                    <label>Event Title</label>
                    <Input
                      defaultValue=""
                      placeholder="Event Title"
                      type="text"
                      value={addEventTitle}
                      onChange={e => this.setState({ addEventTitle: e.target.value })}
                    />
                  </FormGroup>
                  </Col>
                  </Row>

                  <Row>
                  <Col>
                  <FormGroup>
                    <label>Event Description</label>
                    <Input
                      defaultValue=""
                      placeholder="Event Title"
                      type="text"
                      value={addEventDescription}
                      onChange={e => this.setState({ addEventDescription: e.target.value })}
                    />
                  </FormGroup>
                  </Col>
                  </Row>

                    </ModalBody>
                  <ModalFooter>

                    <Button color="success" onClick={this.addEvent}>Add Event</Button>
                  </ModalFooter>
                </Modal>
                </div>
    );
  }
}

export default DashboardCalendar
