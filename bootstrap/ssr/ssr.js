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
      /* @__PURE__ */ Object.assign({ "./Pages/Admin/Categories/Index.jsx": () => import("./assets/Index-DmBBiSm7.js"), "./Pages/Admin/Dashboard.jsx": () => import("./assets/Dashboard-BpVX3WXB.js"), "./Pages/Admin/Studies/Index.jsx": () => import("./assets/Index-X-1OHIms.js"), "./Pages/Admin/Users/Index.jsx": () => import("./assets/Index-B19mbp1h.js"), "./Pages/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-BkTZMjFS.js"), "./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-DoYx0KMH.js"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-1HCF_szb.js"), "./Pages/Auth/Register.jsx": () => import("./assets/Register-D3onwed_.js"), "./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-BcD2WM9y.js"), "./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-NJltJXZO.js"), "./Pages/Director/Analytics.jsx": () => import("./assets/Analytics-zG-a5-7E.js"), "./Pages/Director/Dashboard.jsx": () => import("./assets/Dashboard-i9_QcX8s.js"), "./Pages/Director/StudyReview.jsx": () => import("./assets/StudyReview-CjySB29o.js"), "./Pages/Profile/Edit.jsx": () => import("./assets/Edit-CxNxd6C8.js"), "./Pages/Public/Home.jsx": () => import("./assets/Home-jIlU4GBm.js"), "./Pages/Public/Studies.jsx": () => import("./assets/Studies-BUq4yapG.js"), "./Pages/Public/StudyDetail.jsx": () => import("./assets/StudyDetail-DSTD8I2E.js"), "./Pages/Reviewer/ActiveStudies.jsx": () => import("./assets/ActiveStudies-CpLBAmL2.js"), "./Pages/Reviewer/Analytics.jsx": () => import("./assets/Analytics-DC_lDNNJ.js"), "./Pages/Reviewer/Dashboard.jsx": () => import("./assets/Dashboard-BkOV0rZ6.js"), "./Pages/Reviewer/StudyReview.jsx": () => import("./assets/StudyReview-5ogGzAdz.js"), "./Pages/User/Analytics.jsx": () => import("./assets/Analytics-DnpI67bm.js"), "./Pages/User/Dashboard.jsx": () => import("./assets/Dashboard-B_pS_bkS.js"), "./Pages/User/Studies/Create.jsx": () => import("./assets/Create-DcbKwvnG.js"), "./Pages/User/Studies/Edit.jsx": () => import("./assets/Edit-DRwVrS7f.js") })
    ),
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
  })
);
