import { jsx } from "react/jsx-runtime";
import "react";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { renderToString } from "react-dom/server";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => resolvePageComponent(
      `./Pages/${name}.jsx`,
      /* @__PURE__ */ Object.assign({ "./Pages/Admin/Categories/Index.jsx": () => import("./assets/Index-BLGUF5h4.js"), "./Pages/Admin/Dashboard.jsx": () => import("./assets/Dashboard-BSGrUsRL.js"), "./Pages/Admin/Studies/Index.jsx": () => import("./assets/Index-BzKJm7uK.js"), "./Pages/Admin/Users/Index.jsx": () => import("./assets/Index-DiRwXn4x.js"), "./Pages/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-DD0uasoZ.js"), "./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-TyLKE0bs.js"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-DDyaps6U.js"), "./Pages/Auth/Register.jsx": () => import("./assets/Register-CfabkUGP.js"), "./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-CHsJ6x_U.js"), "./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-B1hs3Vhl.js"), "./Pages/Director/Analytics.jsx": () => import("./assets/Analytics-DkjnmMJ3.js"), "./Pages/Director/Dashboard.jsx": () => import("./assets/Dashboard-ysNV2qce.js"), "./Pages/Director/StudyReview.jsx": () => import("./assets/StudyReview-8nImwItm.js"), "./Pages/Profile/Edit.jsx": () => import("./assets/Edit-BducKNM6.js"), "./Pages/Public/Home.jsx": () => import("./assets/Home-C7PSOsKE.js"), "./Pages/Public/Studies.jsx": () => import("./assets/Studies-sM0URmMz.js"), "./Pages/Public/StudyDetail.jsx": () => import("./assets/StudyDetail-BAvzZXx6.js"), "./Pages/Reviewer/ActiveStudies.jsx": () => import("./assets/ActiveStudies-BcH2zrWY.js"), "./Pages/Reviewer/Analytics.jsx": () => import("./assets/Analytics-C-zA7_I0.js"), "./Pages/Reviewer/Dashboard.jsx": () => import("./assets/Dashboard-DJdTM-RB.js"), "./Pages/Reviewer/StudyReview.jsx": () => import("./assets/StudyReview-BsSz5tMS.js"), "./Pages/User/Analytics.jsx": () => import("./assets/Analytics-yQJNtmUu.js"), "./Pages/User/Dashboard.jsx": () => import("./assets/Dashboard-mq8c82Qj.js"), "./Pages/User/Studies/Create.jsx": () => import("./assets/Create-UbAR8s2Z.js"), "./Pages/User/Studies/Edit.jsx": () => import("./assets/Edit-nteclrrq.js") })
    ),
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
  })
);
