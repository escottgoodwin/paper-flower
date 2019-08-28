import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

import SalesPersonInfo from '../components/SalesPersonInfo'
import SalesPersonForm from '../components/SalesPersonForm'

import fire from '../firebase'
const database = fire.firestore()

class SalesPersonUpdate extends React.Component {

  state ={
    title:'',
    office:'',
    name:'',
    phone:'',
    email:'',
    userImg:''
    }

  componentDidMount(){

  //const { productName } = this.props.location.state
  // Initial call for flowers list
  const { salesmanId } = this.props.location.state

  database.collection('users')
  .where("uid", "==", salesmanId)
  .get()
  .then((snapshot) => {
      snapshot.forEach((doc) => {

      this.setState({
        docId:doc.id,
        ...doc.data()
       });

})
})
.catch(function(error) {
    console.log("Error getting document:", error);

})
}

updateProfile = () => {

  const { salesmanId } = this.props.location.state

  database.collection('users')
  .doc(salesmanId)
  .update(this.state).then(function() {
    console.log("Document successfully updated!");
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});

this.props.history.push({
  pathname: `/admin/salesman_profile`,
  state: { salesmanId  }
  })
}

  handleChange = item => this.setState(item)

  render() {

    const { salesmanId } = this.props.location.state
    return (
        <div className="content">
          <Row>
            <Col md="4">
              <SalesPersonInfo salesmanId={salesmanId} {...this.state}/>
            </Col>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5"><div className="text-success">Edit Sales Person Profile</div></CardTitle>
                </CardHeader>
                <CardBody>
                  <SalesPersonForm handleChange={this.handleChange} submitButton={this.updateProfile} buttonText='Update Profile' {...this.state}/>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
    );
  }
}

export default SalesPersonUpdate;
