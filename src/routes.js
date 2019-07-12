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
import Dashboard from "views/Dashboard.jsx";
import Notifications from "views/Notifications.jsx";
import Icons from "views/Icons.jsx";
import Typography from "views/Typography.jsx";
import TableList from "views/Tables.jsx";
import Maps from "views/Map.jsx";
import ProductList from "views/Products";
import SalesList from "views/Sales";
import UserPage from "views/User.jsx";
import UpgradeToPro from "views/Upgrade.jsx";
import Customer from "views/Customer";
import CustomerUpdate from "views/CustomerUpdate";
import CustomerAdd from "views/CustomerAdd";
import Map1 from "views/Map1";
import Map from "views/Map2";
import DashboardCalendar from "views/Calendar";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/products",
    name: "Products",
    icon: "nc-icon nc-paper",
    component: ProductList,
    layout: "/admin"
  },
  {
    path: "/sales",
    name: "Sales",
    icon: "nc-icon nc-money-coins",
    component: SalesList,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Map,
    layout: "/admin"
  },
  {
    path: "/calendar",
    name: "Calendar",
    icon: "nc-icon nc-calendar-60",
    component: DashboardCalendar,
    layout: "/admin"
  }
];
export default routes;
