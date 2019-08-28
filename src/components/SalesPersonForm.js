import React from "react"

import {
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap"

const SalesPersonForm = ({submitButton, handleChange, buttonText, salesmanId, name, office, userImg, title, phone, email, notes }) =>

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
              <label>Title</label>
            <Input
            value={title}
            onChange={e => handleChange({ title: e.target.value })}
            placeholder="Title"
             />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col className="pr-1" md="6">
          <FormGroup>
            <label htmlFor="exampleInputEmail1">
              Email address
            </label>
            <Input
              onChange={e => handleChange({ email: e.target.value })}
              placeholder="Email"
              type="email"
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
            <label>Office</label>
            <Input
              defaultValue=""
              placeholder="Office"
              type="text"
              value={office}
              onChange={e => handleChange({ office: e.target.value })}
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col className="pr-1" md="12">
          <FormGroup>
            <label>Sales Person Image</label>
            <Input
              defaultValue=""
              placeholder="Image Link"
              type="text"
              value={userImg}
              onChange={e => handleChange({ userImg: e.target.value })}
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
            color="success"
            type="submit"
            onClick={submitButton}
          >
            {buttonText}
          </Button>
        </div>
      </Row>
    </Form>

export default SalesPersonForm
