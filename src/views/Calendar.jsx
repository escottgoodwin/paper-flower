import React, { Component } from "react";
// react plugin used to create google maps
import fire from '../firebase'
import { Calendar, momentLocalizer } from 'react-big-calendar'

// reactstrap components
import { Card, CardBody, Row, Col, Modal, ModalFooter, ModalHeader, Button, ModalBody,FormGroup,
Input } from "reactstrap";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment'

const localizer = momentLocalizer(moment)

const db = fire.firestore()

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes*60000);
}

class DashboardCalendar extends Component {

  state = {
    events:[],
    modal:false,
    modalTitle:'',
    modalText:'',
    modalId:'',
    modalType:'',
    addEventModal:false,
    addEventTitle:'',
    addEventStart:null,
    addEventEnd:null,
    addEventDescription:'',
    sales:[]
  };

  toggle = (event) => {

    this.setState(prevState => ({
      modal: !prevState.modal,
      modalTitle:event.title,
      modalDescription:event.description,
      modalId:event.id,
      modaltype:event.type
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
    endTime:addEventEnd,
    type:'meeting'
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

  const ref = db.collection('events')

  ref.get()
  .then((snapshot) => {
    const events = []
    snapshot.forEach((doc) => {

      const event = {
        id:doc.id,
        title:doc.data().title,
        description:doc.data().description,
        start:doc.data().startTime.toDate(),
        end:doc.data().endTime.toDate(),
        color:'blue',
        type:'meeting'
      }
      events.push(event)
    })

      this.setState({events})
  })

    ref.onSnapshot(snapshot => {
      let events = [];

      snapshot.forEach(doc => {
        const event = {
          id:doc.id,
          title:doc.data().title,
          description:doc.data().description,
          start:doc.data().startTime.toDate(),
          end:doc.data().endTime.toDate(),
          color:'blue',
          type:'meeting'
        }
        events.push(event)
      })
      this.setState({events})
    })

    const ref2 = db.collection('sales')

    ref2.get()
    .then((snapshot) => {
      const sales = []
      snapshot.forEach((doc) => {

        const sale = {
          id:doc.id,
          title: 'Sale - ' + doc.data().customer,
          description:doc.data().customer + ' $' + doc.data().cartTotal,
          start:doc.data().saleDate.toDate(),
          end:addMinutes(doc.data().saleDate.toDate(),90),
          color:'green',
          type:'sale'
        }
        sales.push(sale)
      })

        this.setState({sales})
    })

      ref2.onSnapshot(snapshot => {
        let sales = [];

        snapshot.forEach(doc => {
          const sale = {
            id:doc.id,
            title: 'Sale - ' + doc.data().customer,
            description:doc.data().customer + ' $' + doc.data().cartTotal,
            start:doc.data().saleDate.toDate(),
            end:addMinutes(doc.data().saleDate.toDate(),90),
            color:'green',
            type:'sale'
          }
          sales.push(sale)
        })

        this.setState({sales})

      })

  }

  render() {

  const { events, sales, modalTitle, modalDescription, modal, modalId, modaltype, addEventModal, addEventTitle, addEventDescription, addEventStart, addEventEnd } = this.state
  const masterevents = [...events, ...sales]

    return (
      <div style={{marginTop:100,marginLeft:20,marginRight:20}}>

        <div className="content">
          <Row>
            <Col md="12">
              <Card>

                <CardBody>
                  <div style={{ paddingBottom:50, position: "relative", overflow: "hidden" }}>

                  <Calendar
                    selectable
                    localizer={localizer}
                    views={['month', 'day', 'week','agenda']}
                    events={masterevents}
                    defaultView='month'
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    defaultDate={new Date()}
                    onSelectEvent={event => this.toggle(event)}
                    onSelectSlot={this.handleSelect}
                    resizable
                    style={{ height: "100vh" }}
                    eventPropGetter={event => ({
                      style: {
                        backgroundColor: event.color,
                      },
                    })}
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
                    {modaltype!=='sale' && <Button color="danger" onClick={() => this.deleteEvent(modalId)}>Delete</Button>} {' '}
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
    )
  }
}

export default DashboardCalendar
