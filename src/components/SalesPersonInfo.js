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

import logo from "assets/img/flower-field-3.jpg";

const SalesPersonInfo = ({salesmanId, office, name, title, userImg, phone, email, notes}) =>

    <Card className="card-user">
      <div className="image">
        <img
          alt="..."
          src={logo}
        />
      </div>
      <CardBody>
        <div className="author">
        <Link to={{
          pathname: "salesman_profile",
          state:
            { salesmanId }
          }}>
          {userImg.length>0 &&
            <img
              alt="..."
              className="avatar border-gray"
              src={userImg}
            />
          }
            <h5 className="title text-success">{name}</h5>
          </Link>
          <p className="description">{title}</p>
          <p className="description">{notes}</p>
        </div>

      </CardBody>
      <CardFooter>
        <hr />
        <div className="button-container">
        <div className="text-center">
          {office}
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
            {salesmanId.length>0 &&
            <Link to={{
              pathname: "salesperson_update",
              state:
                { salesmanId }
              }}>

            <Button
              className="btn-round"
              color="success"
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



export default SalesPersonInfo
