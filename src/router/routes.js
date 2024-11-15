const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/overview",
        name: "overview",
        component: () =>
          import("/src/pages/user_account/OverviewComponent.vue"),
        meta: {
          title: "Overview",
          icon: "o_layers",
        },
      },
      {
        path: "/tables",
        name: "tables",
        component: () =>
          import("/src/pages/user_account/TableComponent.vue"),
        meta: {
          title: "Tables",
          icon: "o_space_dashboard",
        },
      },
      {
        path: "/apidoc",
        name: "apidoc",
        component: () =>
          import("/src/pages/user_account/ApiDocComponent.vue"),
        meta: {
          title: "API Docs",
          icon: "o_description",
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
