import { onRequestGet as __api_load_js_onRequestGet } from "C:\\Users\\SYAFIQ\\Documents\\GitHub\\nazieraaziz\\functions\\api\\load.js"
import { onRequestPost as __api_save_js_onRequestPost } from "C:\\Users\\SYAFIQ\\Documents\\GitHub\\nazieraaziz\\functions\\api\\save.js"
import { onRequest as __api_about_js_onRequest } from "C:\\Users\\SYAFIQ\\Documents\\GitHub\\nazieraaziz\\functions\\api\\about.js"
import { onRequest as __api_contact_js_onRequest } from "C:\\Users\\SYAFIQ\\Documents\\GitHub\\nazieraaziz\\functions\\api\\contact.js"
import { onRequest as __api_me_js_onRequest } from "C:\\Users\\SYAFIQ\\Documents\\GitHub\\nazieraaziz\\functions\\api\\me.js"
import { onRequest as __api_services_js_onRequest } from "C:\\Users\\SYAFIQ\\Documents\\GitHub\\nazieraaziz\\functions\\api\\services.js"
import { onRequest as __api_testimonials_js_onRequest } from "C:\\Users\\SYAFIQ\\Documents\\GitHub\\nazieraaziz\\functions\\api\\testimonials.js"

export const routes = [
    {
      routePath: "/api/load",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_load_js_onRequestGet],
    },
  {
      routePath: "/api/save",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_save_js_onRequestPost],
    },
  {
      routePath: "/api/about",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_about_js_onRequest],
    },
  {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_contact_js_onRequest],
    },
  {
      routePath: "/api/me",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_me_js_onRequest],
    },
  {
      routePath: "/api/services",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_services_js_onRequest],
    },
  {
      routePath: "/api/testimonials",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_testimonials_js_onRequest],
    },
  ]