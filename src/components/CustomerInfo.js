import React from "react"
import { Link } from 'react-router-dom'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Row,
  Col
} from "reactstrap"

const CustomerInfo = ({customerId,address, city, name, state, customerImg,type, phone, email, notes, custBkImg}) =>

  <Card className="card-user">
    <div className="image">
    {custBkImg.length>0 &&
      <img
        alt="..."
        src={custBkImg}
      />
    }
    </div>
    <CardBody>
      <div className="author">
        <Link to={{
          pathname: "customer_profile",
          state:
            { customerId }
          }}>
          {customerImg.length>0 &&
          <img
            alt="..."
            className="avatar border-gray"
            src={customerImg}
          />
          }
          <h5 className="title">{name}</h5>
        </Link>

        <p className="description">{type}</p>
      </div>
      <div className="description text-center">
        {notes}
      </div>

    </CardBody>
    <CardFooter>
      <hr />
      <div className="button-container">
      <div className="text-center">
        {address}
      </div>
      <div className="text-center">
        {city}, {state}
      </div>
      <div className="text-center">
        {phone}
      </div>
      <div className="text-center">
        {email}
      </div>

      <hr />

        <Row>
          <Col >
          {customerId.length>0 &&
          <Link to={{
            pathname: "customer_update",
            state:
              { customerId }
            }}>
          <Button
            className="btn-round"
            color="primary"
            type="submit"
          >
            Update Profile
          </Button>
          </Link>
          }
          </Col>

        </Row>
      </div>
    </CardFooter>
  </Card>

export default CustomerInfo
