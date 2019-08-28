import React from "react"

import {
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap"

const CustomerForm = ({submitButton, handleChange, buttonText,customerId, address, city, name, state, customerImg,type, phone, email, notes, custBkImg}) =>

    <Form>
      <Row>
        <Col className="pr-1" md="6">
          <FormGroup>
            <label>Name</label>
            <Input
              defaultValue=""

              placeholder="Name"
              type="text"
              value={name}
              onChange={e => handleChange({ name: e.target.value })}
            />
          </FormGroup>
        </Col>

        <Col className="pl-1" md="6">
          <FormGroup>
            <label htmlFor="exampleInputEmail1">
              Email address
            </label>
            <Input
            value={email}
            onChange={e => handleChange({ email: e.target.value })}
            placeholder="Email"
            type="email" />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col className="pr-1" md="6">
          <FormGroup>
            <label>Type</label>
            <Input

              type="text"
              value={type}
              onChange={e => handleChange({ type: e.target.value })}
            />
          </FormGroup>
        </Col>
        <Col className="pl-1" md="6">
          <FormGroup>
            <label>Phone</label>
            <Input
              defaultValue=""
              placeholder="Phone"
              type="text"
              value={phone}
              onChange={e => handleChange({ phone: e.target.value })}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <FormGroup>
            <label>Address</label>
            <Input
              defaultValue="Melbourne, Australia"
              placeholder="Home Address"
              type="text"
              value={address}
              onChange={e => handleChange({ address: e.target.value })}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col className="pr-1" md="4">
          <FormGroup>
            <label>City</label>
            <Input
              defaultValue="Melbourne"
              placeholder="City"
              type="text"
              value={city}
              onChange={e => handleChange({ city: e.target.value })}
            />
          </FormGroup>
        </Col>
        <Col className="px-1" md="4">
          <FormGroup>
            <label>State</label>
            <Input

              placeholder="State"
              type="text"
              value={state}
              onChange={e => handleChange({ state: e.target.value })}
            />
          </FormGroup>
        </Col>
        <Col className="pl-1" md="4">
          <FormGroup>
            <label>Postal Code</label>
            <Input placeholder="ZIP Code" type="number" />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col className="pr-1" md="6">
          <FormGroup>
            <label>Customer Image</label>
            <Input
              defaultValue=""
              placeholder="Type"
              type="text"
              value={customerImg}
              onChange={e => handleChange({ customerImg: e.target.value })}
            />
          </FormGroup>
        </Col>
        <Col className="pl-1" md="6">
          <FormGroup>
            <label>Customer Background Image</label>
            <Input
              defaultValue=""
              placeholder="Phone"
              type="text"
              value={custBkImg}
              onChange={e => handleChange({ custBkImg: e.target.value })}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <FormGroup>
            <label>Notes</label>
            <Input
              type="textarea"
              value={notes}
              onChange={e => handleChange({ notes: e.target.value })}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <div className="update ml-auto mr-auto">
          <Button
            className="btn-round"
            color="primary"
            type="submit"
            onClick={submitButton}
          >
            {buttonText}
          </Button>
        </div>
      </Row>
    </Form>

export default CustomerForm
