import { createRouter, createWebHistory } from "vue-router";
import Default from "../views/dashboards/Default.vue";
import Sales from "../views/dashboards/Sales.vue";
import Overview from "../views/pages/profile/Overview.vue";
import Projects from "../views/pages/profile/Projects.vue";
import General from "../views/pages/projects/General.vue";
import Timeline from "../views/pages/projects/Timeline.vue";
import NewProject from "../views/pages/projects/NewProject.vue";
import Pricing from "../views/pages/Pricing.vue";
import RTL from "../views/pages/Rtl.vue";
import Charts from "../views/pages/Charts.vue";
import SweetAlerts from "../views/pages/SweetAlerts.vue";
import Notifications from "../views/pages/Notifications.vue";
import Kanban from "../views/applications/Kanban.vue";
import Wizard from "../views/applications/wizard/Wizard.vue";
import DataTables from "../views/applications/DataTables.vue";
import NewProduct from "../views/ecommerce/products/NewProduct.vue";
import EditProduct from "../views/ecommerce/EditProduct.vue";
import ProductPage from "../views/ecommerce/ProductPage.vue";
import ProductsList from "../views/ecommerce/ProductsList.vue";
import OrderDetails from "../views/ecommerce/orders/OrderDetails.vue";
import OrderList from "../views/ecommerce/orders/OrderList.vue";
import NewUser from "../views/pages/users/NewUser.vue";
import Settings from "../views/pages/account/Settings.vue";
import Billing from "../views/pages/account/Billing.vue";
import Invoice from "../views/pages/account/Invoice.vue";
import Security from "../views/pages/account/Security.vue";
import Widgets from "../views/pages/Widgets.vue";
import Basic from "../views/auth/signin/Basic.vue";
import Cover from "../views/auth/signin/Cover.vue";
import Illustration from "../views/auth/signin/Illustration.vue";
import ResetCover from "../views/auth/reset/Cover.vue";
import SignupCover from "../views/auth/signup/Cover.vue";

import Users from "../views/users/Users.vue";
import Documents from "../views/documents/Documents.vue";
import NewDocument from "../views/documents/NewDocument.vue";
import EditDocument from "../views/documents/EditDocument.vue";
import DocumentClippets from "../views/documents/DocumentClippets.vue";
import Profile from "../views/pages/profile/Profile.vue";

import { useConnect } from "@connect2ic/vue";

import store from "./../store";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/authentication/signin/basic",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Default,
  },
  {
    path: "/documents",
    name: "Documents",
    component: Documents
  },
  {
    path: "/documents/new",
    name: "New Document",
    component: NewDocument
  },
  {
    path: "/documents/edit/:id",
    name: "Edit Document",
    component: EditDocument
  },
  {
    path: "/documents/clippets/:id",
    name: "Document Clippets",
    component: DocumentClippets
  },
  {
    path: "/users",
    name: "Users",
    component: Users
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  /////////
  {
    path: "/dashboards/sales",
    name: "Sales",
    component: Sales,
  },
  {
    path: "/pages/profile/overview",
    name: "Profile Overview",
    component: Overview,
  },
  {
    path: "/pages/profile/projects",
    name: "All Projects",
    component: Projects,
  },
  {
    path: "/pages/projects/general",
    name: "General",
    component: General,
  },
  {
    path: "/pages/projects/timeline",
    name: "Timeline",
    component: Timeline,
  },
  {
    path: "/pages/projects/new-project",
    name: "New Project",
    component: NewProject,
  },
  {
    path: "/pages/pricing-page",
    name: "Pricing Page",
    component: Pricing,
  },
  {
    path: "/pages/rtl-page",
    name: "RTL",
    component: RTL,
  },
  {
    path: "/pages/charts",
    name: "Charts",
    component: Charts,
  },
  {
    path: "/pages/widgets",
    name: "Widgets",
    component: Widgets,
  },
  {
    path: "/pages/sweet-alerts",
    name: "Sweet Alerts",
    component: SweetAlerts,
  },
  {
    path: "/pages/notifications",
    name: "Notifications",
    component: Notifications,
  },
  {
    path: "/applications/kanban",
    name: "Kanban",
    component: Kanban,
  },
  {
    path: "/applications/wizard",
    name: "Wizard",
    component: Wizard,
  },
  {
    path: "/applications/data-tables",
    name: "Data Tables",
    component: DataTables,
  },
  {
    path: "/ecommerce/products/new-product",
    name: "New Product",
    component: NewProduct,
  },
  {
    path: "/ecommerce/products/edit-product",
    name: "Edit Product",
    component: EditProduct,
  },
  {
    path: "/ecommerce/products/product-page",
    name: "Product Page",
    component: ProductPage,
  },
  {
    path: "/ecommerce/products/products-list",
    name: "Products List",
    component: ProductsList,
  },
  {
    path: "/ecommerce/Orders/order-details",
    name: "Order Details",
    component: OrderDetails,
  },
  {
    path: "/ecommerce/Orders/order-list",
    name: "Order List",
    component: OrderList,
  },
  {
    path: "/pages/users/new-user",
    name: "New User",
    component: NewUser,
  },
  {
    path: "/pages/account/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/pages/account/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/pages/account/invoice",
    name: "Invoice",
    component: Invoice,
  },
  {
    path: "/pages/account/Security",
    name: "Security",
    component: Security,
  },
  {
    path: "/authentication/signin/basic",
    name: "Signin Basic",
    component: Basic,
  },
  {
    path: "/authentication/signin/cover",
    name: "Signin Cover",
    component: Cover,
  },
  {
    path: "/authentication/signin/illustration",
    name: "Signin Illustration",
    component: Illustration,
  },
  {
    path: "/authentication/reset/cover",
    name: "Reset Cover",
    component: ResetCover,
  },
  {
    path: "/authentication/signup/cover",
    name: "Signup Cover",
    component: SignupCover,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach(async (to, from) => {
  let isAuthenticated = false;

  if(store.state.provider_id && store.state.principal_id) {
    isAuthenticated = true;
  }

  if (isAuthenticated && to.name === 'Signin Basic') {
    isAuthenticated = false;
    store.state.connectClient.disconnect();
    return;
  }
  
  if (
    !isAuthenticated &&
    to.name !== 'Signin Basic'
  ) {
    return { name: 'Signin Basic' }
  }

})

export default router;
