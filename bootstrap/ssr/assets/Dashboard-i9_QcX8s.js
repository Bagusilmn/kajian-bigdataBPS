import { jsx, jsxs } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-Y_7hl2u9.js";
import "react";
import "@inertiajs/react";
import "./BpsLogo-CvcnsC1A.js";
function Dashboard({
  directorStudies = [],
  revisionStudies = 0,
  publishedStudies = 0,
  rejectedStudies = 0
}) {
  return /* @__PURE__ */ jsx(DashboardLayout, { children: /* @__PURE__ */ jsxs("div", { className: "director-dashboard", children: [
    /* @__PURE__ */ jsx("div", { className: "director-header", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "DIRECTOR REVIEW" }),
      /* @__PURE__ */ jsx("h1", { children: "Dashboard Direktur" }),
      /* @__PURE__ */ jsx("p", { children: "Review final kajian sebelum diterbitkan." })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "director-stats", children: [
      /* @__PURE__ */ jsxs("div", { className: "director-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "MENUNGGU REVIEW" }),
        /* @__PURE__ */ jsx("strong", { children: directorStudies.length }),
        /* @__PURE__ */ jsx("small", { children: "Kajian menunggu keputusan final" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "director-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "REVISION" }),
        /* @__PURE__ */ jsx("strong", { children: revisionStudies }),
        /* @__PURE__ */ jsx("small", { children: "Kajian dikembalikan untuk revisi" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "director-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "PUBLISHED" }),
        /* @__PURE__ */ jsx("strong", { children: publishedStudies }),
        /* @__PURE__ */ jsx("small", { children: "Kajian yang telah diterbitkan" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "director-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "REJECTED" }),
        /* @__PURE__ */ jsx("strong", { children: rejectedStudies }),
        /* @__PURE__ */ jsx("small", { children: "Kajian yang ditolak" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "director-section", children: [
      /* @__PURE__ */ jsx("div", { className: "director-section__heading", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "FINAL REVIEW" }),
        /* @__PURE__ */ jsx("h2", { children: "Kajian Menunggu Keputusan" })
      ] }) }),
      directorStudies.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "director-empty", children: [
        /* @__PURE__ */ jsx("h2", { children: "Tidak ada kajian" }),
        /* @__PURE__ */ jsx("p", { children: "Belum ada kajian yang menunggu review final." })
      ] }) : /* @__PURE__ */ jsx("div", { className: "director-study-grid", children: directorStudies.map((study) => {
        var _a, _b;
        return /* @__PURE__ */ jsxs(
          "a",
          {
            href: `/director/studies/${study.id}`,
            className: "director-study-card",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "director-study-card__image", children: [
                study.cover_image ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: `/storage/${study.cover_image}`,
                    alt: study.title
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "director-study-card__placeholder" }),
                /* @__PURE__ */ jsx("span", { children: ((_a = study.category) == null ? void 0 : _a.name) ?? "Kajian" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "director-study-card__content", children: [
                /* @__PURE__ */ jsx("span", { className: "director-study-card__status", children: "Review Final" }),
                /* @__PURE__ */ jsx("h3", { children: study.title }),
                /* @__PURE__ */ jsx("p", { children: study.excerpt }),
                /* @__PURE__ */ jsxs("div", { className: "director-study-card__footer", children: [
                  /* @__PURE__ */ jsx("span", { children: ((_b = study.user) == null ? void 0 : _b.name) ?? "Peneliti" }),
                  /* @__PURE__ */ jsx("span", { className: "director-study-link", children: "Review →" })
                ] })
              ] })
            ]
          },
          study.id
        );
      }) })
    ] })
  ] }) });
}
export {
  Dashboard as default
};
