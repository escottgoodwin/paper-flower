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

const ProductInfo = ({ productId, name, inventory, price, productImg, bkImg, notes }) =>

    <Card className="card-user">
      <div className="image">
      {bkImg.length>0 &&
        <img
          alt="..."
          src={bkImg}
        />
      }
      </div>
      <CardBody>
        <div className="author">
        <Link to={{
          pathname: "product_profile",
          state:
            { productId }
          }}>
          {productImg.length>0 &&
            <img
              alt="..."
              className="avatar border-gray"
              src={productImg}
            />
          }
            <h5 className="title text-warning">{name}</h5>
          </Link>
          <p className="description">${price}</p>
        </div>
        <div className="description text-center">
        {notes}
        </div>
      </CardBody>

      <CardFooter>
        <hr />
        <div className="button-container">
          <h5>Inventory:  {inventory}</h5>
        <hr />

          <Row>
            <Col >
            <Link to={{
              pathname: "product_update",
              state:
                { productId }
              }}>
            <Button
              className="btn-round"
              color="warning"
              type="submit"
            >
              Update Product
            </Button>
            </Link>
            </Col>

          </Row>
        </div>
      </CardFooter>
    </Card>

export default ProductInfo
