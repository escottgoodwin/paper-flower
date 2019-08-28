import React from "react"

import {
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap"

const ProductForm = ({submitButton, handleChange, buttonText, productId, name, inventory, price, productImg, bkImg, notes }) =>

    <Form>
      <Row>
        <Col className="pr-1" md="4">
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
        <Col className="pl-1" md="4">
          <FormGroup>
              <label>Price</label>
            <Input
            value={price}
            onChange={e => handleChange({ price: e.target.value })}
            placeholder="Price"
             />
          </FormGroup>
        </Col>

        <Col className="pl-1" md="4">
          <FormGroup>
            <label>Inventory</label>
            <Input
              defaultValue=""
              placeholder="Inventory"
              type="text"
              value={inventory}
              onChange={e => handleChange({ inventory: e.target.value })}
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col className="pr-1" md="12">
          <FormGroup>
            <label>Product Image</label>
            <Input
              defaultValue=""
              placeholder="Image Link"
              type="text"
              value={productImg}
              onChange={e => handleChange({ productImg: e.target.value })}
            />
          </FormGroup>
        </Col>

      </Row>

      <Row>
        <Col className="pr-1" md="12">
          <FormGroup>
            <label>Product Background Image</label>
            <Input
              defaultValue=""
              placeholder="Image Link"
              type="text"
              value={bkImg}
              onChange={e => handleChange({ bkImg: e.target.value })}
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
            color="warning"
            type="submit"
            onClick={submitButton}
          >
            {buttonText}
          </Button>
        </div>
      </Row>
    </Form>

export default ProductForm
