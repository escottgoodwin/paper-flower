import Dashboard from "views/Dashboard";
import LinkRecs from "views/LinkRecs";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/link_recs",
    name: "Link Recommendations",
    icon: "nc-icon nc-bank",
    component: LinkRecs,
    layout: "/admin"
  },
];
export default routes;
