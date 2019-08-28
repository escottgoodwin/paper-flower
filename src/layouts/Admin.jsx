import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import Customer from "views/Customer";
import CustomerUpdate from "views/CustomerUpdate";
import CustomerAdd from "views/CustomerAdd";
import SalesPerson from "views/SalesPerson";
import SalesPersonUpdate from "views/SalesPersonUpdate";
import SalesPersonAdd from "views/SalesPersonAdd";
import Product from "views/Product";
import ProductUpdate from "views/ProductUpdate";
import ProductAdd from "views/ProductAdd";

import fire from '../firebase'

import routes from "routes.js";

var ps;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info"
    };
    this.mainPanel = React.createRef();
  }


  notSignedIn = () => {
    this.props.history.push(`/login`)
   }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }

    fire.auth().onAuthStateChanged(user =>  {

      if (user) {
          this.setState({
            userName:user.displayName,
          })
      } else {
        this.setState({name:'No user'})
        this.notSignedIn()
      }
    });
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleActiveClick = color => {
    this.setState({ activeColor: color });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  render() {
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar {...this.props} />
          <Switch>
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}

            <Route
              path='/admin/customer_profile'
              component={Customer}
              name='Customer'
            />

            <Route
              path='/admin/customer_update'
              component={CustomerUpdate}
              name='Update Customer'
            />

            <Route
              path='/admin/customer_add'
              component={CustomerAdd}
              name='Add Customer'
            />

            <Route
              path='/admin/salesman_profile'
              component={SalesPerson}
              name='Sales Person'
            />

            <Route
              path='/admin/salesperson_update'
              component={SalesPersonUpdate}
              name='Sales Person Update'
            />

            <Route
              path='/admin/salesperson_add'
              component={SalesPersonAdd}
              name='Sales Person Add'
            />

            <Route
              path='/admin/product_profile'
              component={Product}
              name='Product'
            />

            <Route
              path='/admin/product_update'
              component={ProductUpdate}
              name='Product Update'
            />

            <Route
              path='/admin/product_add'
              component={ProductAdd}
              name='Add Product'
            />

          </Switch>
          <Footer fluid />
        </div>

      </div>
    );
  }
}

export default Dashboard;
