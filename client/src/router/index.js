import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Admission from "../components/Admission.vue";
import AgreementCollege from "../components/agreement/AgreementCollege.vue";
import AgreementAdmin from "../components/agreement/AgreementAdmin.vue";
import CollegeInformation from "../components/college-form/Information.vue";
import AdminInformation from "../components/college-form/AdminInformation.vue";
import StudentProfile from "../components/StudentProfile.vue";
import AdminPage from "../components/AdminPage.vue";

//Messages Views
import ErrorPage from "../views/messages/ErrorPage";
import TokenError from "../views/messages/TokenError";
import SuccessRegister from "../views/messages/SuccessRegister";
import ErrorRegister from "../views/messages/ErrorRegister";
const routes = [
  {
    path: "/admin-page",
    name: "AdminPage",
    component: AdminPage,
  },
  {
    path: "/student-profile",
    name: "StudentProfile",
    component: StudentProfile,
  },
  {
    path: "/admin-information",
    name: "AdminInformation",
    component: AdminInformation,
  },
  {
    path: "/error",
    name: "Error",
    component: ErrorPage,
  },
  {
    path: "/error-register",
    name: "ErrorRegister",
    component: ErrorRegister,
  },
  {
    path: "/token-error",
    name: "TokenError",
    component: TokenError,
  },
  {
    path: "/success",
    name: "SuccessRegister",
    component: SuccessRegister,
  },
  {
    path: "/college-information",
    name: "CollegeInformation",
    component: CollegeInformation,
  },
  {
    path: "/agreement-admin",
    name: "AgreementAdmin",
    component: AgreementAdmin,
  },
  {
    path: "/agreement-college",
    name: "AgreementCollege",
    component: AgreementCollege,
  },
  {
    path: "/admission",
    name: "Admission",
    component: Admission,
  },

  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
