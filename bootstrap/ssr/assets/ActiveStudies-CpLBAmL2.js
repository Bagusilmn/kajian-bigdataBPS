import { jsx, jsxs } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-Y_7hl2u9.js";
import "react";
import "@inertiajs/react";
import "./BpsLogo-CvcnsC1A.js";
function ActiveStudies({ studies = [] }) {
  return /* @__PURE__ */ jsx(DashboardLayout, { children: /* @__PURE__ */ jsxs("div", { className: "reviewer-dashboard", children: [
    /* @__PURE__ */ jsx("div", { className: "reviewer-header", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "CURRENT REVIEWS" }),
      /* @__PURE__ */ jsx("h1", { children: "Sedang Direview" }),
      /* @__PURE__ */ jsx("p", { children: "Kajian yang sedang kamu tangani untuk proses review." })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "reviewer-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "reviewer-section__heading", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "ACTIVE STUDIES" }),
          /* @__PURE__ */ jsx("h2", { children: "Kajian yang Sedang Ditangani" })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "reviewer-study-count", children: [
          studies.length,
          " kajian"
        ] })
      ] }),
      studies.length > 0 ? /* @__PURE__ */ jsx("div", { className: "user-study-grid", children: studies.map((study) => {
        var _a, _b;
        return /* @__PURE__ */ jsxs(
          "a",
          {
            href: `/reviewer/studies/${study.id}`,
            className: "user-study-card",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "user-study-card__image", children: [
                study.cover_image ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: `/storage/${study.cover_image}`,
                    alt: study.title
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "user-study-card__placeholder" }),
                /* @__PURE__ */ jsx("span", { children: ((_a = study.category) == null ? void 0 : _a.name) ?? "Kajian" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "user-study-card__content", children: [
                /* @__PURE__ */ jsx("span", { className: "user-study-card__status", children: "Under Review" }),
                /* @__PURE__ */ jsx("h3", { children: study.title }),
                /* @__PURE__ */ jsx("p", { children: study.excerpt || "Tidak ada ringkasan kajian." }),
                /* @__PURE__ */ jsxs("div", { className: "user-study-card__footer", children: [
                  /* @__PURE__ */ jsx("span", { children: ((_b = study.user) == null ? void 0 : _b.name) ?? "Peneliti" }),
                  /* @__PURE__ */ jsx("span", { className: "user-study-link", children: "Lanjut Review →" })
                ] })
              ] })
            ]
          },
          study.id
        );
      }) }) : /* @__PURE__ */ jsx("div", { className: "reviewer-empty", children: "Tidak ada kajian yang sedang direview." })
    ] })
  ] }) });
}
export {
  ActiveStudies as default
};
