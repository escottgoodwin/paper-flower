import Dashboard from "views/Dashboard.jsx";
import ProductList from "views/Products";
import SalesList from "views/Sales";
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
