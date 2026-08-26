import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useForm } from "@inertiajs/react";
import { D as DashboardLayout } from "./DashboardLayout-DP3XBUYL.js";
import "react";
import "./BpsLogo-Bc2wSHH6.js";
function StudyReview({ study }) {
  var _a, _b, _c;
  const revisionForm = useForm({
    notes: ""
  });
  const actionForm = useForm({});
  const startReview = () => {
    actionForm.patch(
      `/reviewer/studies/${study.id}/start-review`
    );
  };
  const approve = () => {
    if (!window.confirm(
      "Setujui kajian ini?"
    )) {
      return;
    }
    actionForm.patch(
      `/reviewer/studies/${study.id}/approve`
    );
  };
  const reject = () => {
    if (!window.confirm(
      "Tolak kajian ini?"
    )) {
      return;
    }
    actionForm.patch(
      `/reviewer/studies/${study.id}/reject`
    );
  };
  const requestRevision = (event) => {
    event.preventDefault();
    revisionForm.patch(
      `/reviewer/studies/${study.id}/revision`
    );
  };
  return /* @__PURE__ */ jsx(DashboardLayout, { children: /* @__PURE__ */ jsxs("div", { className: "review-page", children: [
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "/reviewer/dashboard",
        className: "review-back",
        children: "← Kembali ke Dashboard"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "review-header", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "REVIEW KAJIAN" }),
      /* @__PURE__ */ jsx("h1", { children: study.title }),
      /* @__PURE__ */ jsxs("div", { className: "review-meta", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "Penulis:",
          " ",
          /* @__PURE__ */ jsx("strong", { children: ((_a = study.user) == null ? void 0 : _a.name) ?? "-" })
        ] }),
        /* @__PURE__ */ jsx("span", { children: "•" }),
        /* @__PURE__ */ jsxs("span", { children: [
          "Kategori:",
          " ",
          /* @__PURE__ */ jsx("strong", { children: ((_b = study.category) == null ? void 0 : _b.name) ?? "-" })
        ] }),
        /* @__PURE__ */ jsx("span", { children: "•" }),
        /* @__PURE__ */ jsx("span", { className: "review-status", children: (_c = study.status) == null ? void 0 : _c.replace("_", " ") })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "review-layout", children: [
      /* @__PURE__ */ jsxs("main", { className: "review-main", children: [
        study.cover_image && /* @__PURE__ */ jsx("div", { className: "review-cover", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: `/storage/${study.cover_image}`,
            alt: study.title
          }
        ) }),
        study.excerpt && /* @__PURE__ */ jsxs("section", { className: "review-block", children: [
          /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "RINGKASAN" }),
          /* @__PURE__ */ jsx("p", { className: "review-excerpt", children: study.excerpt })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "review-block", children: [
          /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "ISI KAJIAN" }),
          /* @__PURE__ */ jsx(
            "article",
            {
              className: "review-content",
              dangerouslySetInnerHTML: {
                __html: study.content
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("aside", { className: "review-panel", children: [
        study.status === "submitted" && /* @__PURE__ */ jsxs("div", { className: "review-action-card", children: [
          /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "REVIEW" }),
          /* @__PURE__ */ jsx("h2", { children: "Mulai Review" }),
          /* @__PURE__ */ jsx("p", { children: "Pindahkan kajian ini ke proses review sebelum memberikan keputusan." }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "dashboard-primary-button",
              onClick: startReview,
              disabled: actionForm.processing,
              children: "Mulai Review →"
            }
          )
        ] }),
        study.status === "under_review" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: "review-action-card", children: [
            /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "DECISION" }),
            /* @__PURE__ */ jsx("h2", { children: "Keputusan Review" }),
            /* @__PURE__ */ jsx("p", { children: "Pilih tindakan setelah selesai meninjau kajian." }),
            /* @__PURE__ */ jsxs("div", { className: "review-actions", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "review-action review-action--approve",
                  onClick: approve,
                  disabled: actionForm.processing,
                  children: "✓ Setujui Kajian"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "review-action review-action--reject",
                  onClick: reject,
                  disabled: actionForm.processing,
                  children: "✕ Tolak Kajian"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "review-action-card", children: [
            /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "REQUEST REVISION" }),
            /* @__PURE__ */ jsx("h2", { children: "Minta Revisi" }),
            /* @__PURE__ */ jsx("p", { children: "Jelaskan perubahan yang perlu dilakukan peneliti." }),
            /* @__PURE__ */ jsxs(
              "form",
              {
                onSubmit: requestRevision,
                children: [
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      value: revisionForm.data.notes,
                      onChange: (event) => revisionForm.setData(
                        "notes",
                        event.target.value
                      ),
                      placeholder: "Tulis catatan reviewer...",
                      rows: "7"
                    }
                  ),
                  revisionForm.errors.notes && /* @__PURE__ */ jsx("div", { className: "form-error", children: revisionForm.errors.notes }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "submit",
                      className: "review-action review-action--revision",
                      disabled: revisionForm.processing,
                      children: revisionForm.processing ? "Mengirim..." : "Kembalikan untuk Revisi"
                    }
                  )
                ]
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  StudyReview as default
};
