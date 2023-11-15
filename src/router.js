import { createRouter, createWebHistory } from "vue-router";
import CreateContact from "./components/CreateContact.vue";
import ContactList from "./components/ContactList.vue";
import LastQuery from "./components/LastQueryResult.vue";
const routes = [
  {
    path: "/",
    component: ContactList,
  },
  {
    path: "/create-contact",
    component: CreateContact,
  },
  {
    path: "/last-query",
    component: LastQuery,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
