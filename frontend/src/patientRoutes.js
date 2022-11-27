import UserProfile from "./components/views/UserProfile.js";
import PatientDashboard from "./components/views/PatientDashboard.js";
import Questionnaire from "./components/views/Questionnaire.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: PatientDashboard,
    layout: "/patient",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/patient",
  },
  {
    path: "/questionnaire",
    name: "Questionnaire",
    icon: "nc-icon nc-circle-09",
    component: Questionnaire,
    layout: "/patient",
  },
];

export default dashboardRoutes;
