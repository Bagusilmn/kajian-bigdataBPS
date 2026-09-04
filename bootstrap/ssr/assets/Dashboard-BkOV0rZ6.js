import { jsx, jsxs } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-Y_7hl2u9.js";
import "react";
import "@inertiajs/react";
import "./BpsLogo-CvcnsC1A.js";
function Dashboard({
  submittedStudies,
  underReviewCount,
  revisionStudies,
  directorReviewStudies
}) {
  return /* @__PURE__ */ jsx(DashboardLayout, { children: /* @__PURE__ */ jsxs("div", { className: "reviewer-dashboard", children: [
    /* @__PURE__ */ jsx("div", { className: "reviewer-header", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "REVIEWER DASHBOARD" }),
      /* @__PURE__ */ jsx("h1", { children: "Kelola Review Kajian" }),
      /* @__PURE__ */ jsx("p", { children: "Tinjau kajian yang telah diajukan oleh peneliti dan tentukan langkah selanjutnya." })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "reviewer-stats", children: [
      /* @__PURE__ */ jsxs("div", { className: "reviewer-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "MENUNGGU REVIEW" }),
        /* @__PURE__ */ jsx("strong", { children: (submittedStudies == null ? void 0 : submittedStudies.length) ?? 0 }),
        /* @__PURE__ */ jsx("small", { children: "Kajian baru masuk" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "reviewer-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "SEDANG DIREVIEW" }),
        /* @__PURE__ */ jsx("strong", { children: underReviewCount }),
        /* @__PURE__ */ jsx("small", { children: "Kajian yang sedang kamu review" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "reviewer-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "REVISION" }),
        /* @__PURE__ */ jsx("strong", { children: revisionStudies }),
        /* @__PURE__ */ jsx("small", { children: "Menunggu perbaikan" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "reviewer-section", children: [
      /* @__PURE__ */ jsx("div", { className: "reviewer-section__heading", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "INCOMING STUDIES" }),
        /* @__PURE__ */ jsx("h2", { children: "Kajian Menunggu Review" })
      ] }) }),
      (submittedStudies == null ? void 0 : submittedStudies.length) > 0 ? /* @__PURE__ */ jsx("div", { className: "user-study-grid", children: submittedStudies.map((study) => {
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
                /* @__PURE__ */ jsx("span", { className: "user-study-card__status", children: "Submitted" }),
                /* @__PURE__ */ jsx("h3", { children: study.title }),
                /* @__PURE__ */ jsx("p", { children: study.excerpt }),
                /* @__PURE__ */ jsxs("div", { className: "user-study-card__footer", children: [
                  /* @__PURE__ */ jsx("span", { children: ((_b = study.user) == null ? void 0 : _b.name) ?? "Peneliti" }),
                  /* @__PURE__ */ jsx("span", { className: "user-study-link", children: "Mulai Review →" })
                ] })
              ] })
            ]
          },
          study.id
        );
      }) }) : /* @__PURE__ */ jsx("div", { className: "reviewer-empty", children: "Tidak ada kajian yang menunggu review." })
    ] })
  ] }) });
}
export {
  Dashboard as default
};
