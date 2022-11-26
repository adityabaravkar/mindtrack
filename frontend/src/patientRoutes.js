import UserProfile from "./components/views/UserProfile.js";
import PatientDashboard from "./components/views/PatientDashboard.js";
import Results from "./components/views/Results.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: PatientDashboard,
    layout: "/patient",
  },
  {
    path: "/result",
    name: "Result",
    icon: "nc-icon nc-chart-pie-35",
    component: Results,
    layout: "/patient",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/patient",
  },
];

export default dashboardRoutes;
