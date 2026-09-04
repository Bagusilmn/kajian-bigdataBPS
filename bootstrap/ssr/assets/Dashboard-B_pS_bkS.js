import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { D as DashboardLayout } from "./DashboardLayout-Y_7hl2u9.js";
import "./BpsLogo-CvcnsC1A.js";
function Dashboard({
  studies,
  totalStudies,
  draftStudies,
  reviewStudies,
  directorReviewStudies,
  rejectedStudies,
  publishedStudies
}) {
  const [deletionStudy, setDeletionStudy] = useState(null);
  const deletionForm = useForm({
    reason: ""
  });
  const openDeletionModal = (study) => {
    setDeletionStudy(study);
    deletionForm.reset();
    deletionForm.clearErrors();
  };
  const closeDeletionModal = () => {
    setDeletionStudy(null);
    deletionForm.reset();
    deletionForm.clearErrors();
  };
  const submitDeletionRequest = (event) => {
    event.preventDefault();
    if (!deletionStudy) {
      return;
    }
    deletionForm.delete(
      `/user/studies/${deletionStudy.id}/deletion-request`,
      {
        onSuccess: () => {
          closeDeletionModal();
        }
      }
    );
  };
  return /* @__PURE__ */ jsx(DashboardLayout, { children: /* @__PURE__ */ jsxs("div", { className: "user-dashboard", children: [
    /* @__PURE__ */ jsxs("div", { className: "dashboard-header", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "USER DASHBOARD" }),
        /* @__PURE__ */ jsxs("h1", { children: [
          "Selamat datang,",
          /* @__PURE__ */ jsx("span", { children: "Peneliti Big Data" })
        ] }),
        /* @__PURE__ */ jsx("p", { children: "Kelola dan pantau kajian yang kamu ajukan melalui portal Kajian Big Data BPS." })
      ] }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/user/studies/create",
          className: "dashboard-primary-button",
          children: "+ Ajukan Kajian"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "dashboard-stats", children: [
      /* @__PURE__ */ jsxs("div", { className: "dashboard-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "TOTAL KAJIAN" }),
        /* @__PURE__ */ jsx("strong", { children: totalStudies }),
        /* @__PURE__ */ jsx("small", { children: "Semua kajian saya" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "dashboard-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "DRAFT" }),
        /* @__PURE__ */ jsx("strong", { children: draftStudies }),
        /* @__PURE__ */ jsx("small", { children: "Belum diajukan" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "dashboard-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "REVIEW" }),
        /* @__PURE__ */ jsx("strong", { children: reviewStudies }),
        /* @__PURE__ */ jsx("small", { children: "Sedang diproses" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "dashboard-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "DIRECTOR REVIEW" }),
        /* @__PURE__ */ jsx("strong", { children: directorReviewStudies }),
        /* @__PURE__ */ jsx("small", { children: "Menunggu keputusan direktur" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "dashboard-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "PUBLISHED" }),
        /* @__PURE__ */ jsx("strong", { children: publishedStudies }),
        /* @__PURE__ */ jsx("small", { children: "Sudah diterbitkan" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "dashboard-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "REJECTED" }),
        /* @__PURE__ */ jsx("strong", { children: rejectedStudies }),
        /* @__PURE__ */ jsx("small", { children: "Kajian ditolak" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "user-studies-section", children: [
      /* @__PURE__ */ jsx("div", { className: "user-studies-heading", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "MY STUDIES" }),
        /* @__PURE__ */ jsx("h2", { children: "Kajian Saya" })
      ] }) }),
      (studies == null ? void 0 : studies.length) > 0 ? /* @__PURE__ */ jsx("div", { className: "user-study-grid", children: studies.map((study) => {
        var _a, _b, _c, _d;
        const canEdit = study.status === "draft" || study.status === "revision";
        const href = canEdit ? `/user/studies/${study.id}/edit` : `/kajian/${study.slug}`;
        return /* @__PURE__ */ jsxs(
          "a",
          {
            href,
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
                /* @__PURE__ */ jsx("div", { className: `user-study-card__status status-${study.status}`, children: (_b = study.status) == null ? void 0 : _b.replace("_", " ") }),
                /* @__PURE__ */ jsx("h3", { children: study.title }),
                /* @__PURE__ */ jsx("p", { children: study.excerpt }),
                study.status === "revision" && /* @__PURE__ */ jsxs("div", { className: "user-revision-note", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Catatan Reviewer" }),
                  /* @__PURE__ */ jsx("p", { children: ((_d = (_c = study.reviews) == null ? void 0 : _c[0]) == null ? void 0 : _d.notes) ?? "Kajian memerlukan revisi." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "user-study-card__footer", children: [
                  /* @__PURE__ */ jsx("span", { children: study.created_at ? new Date(
                    study.created_at
                  ).toLocaleDateString(
                    "id-ID",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    }
                  ) : "" }),
                  /* @__PURE__ */ jsxs("div", { className: "user-study-card__actions", children: [
                    study.status === "draft" && /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: `/user/studies/${study.id}/edit`,
                        className: "user-study-link",
                        children: "Edit →"
                      }
                    ),
                    study.status === "revision" && /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: `/user/studies/${study.id}/edit`,
                        className: "user-study-link",
                        children: "Revisi →"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        className: "user-study-delete-link",
                        onClick: (event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          openDeletionModal(study);
                        },
                        children: "Ajukan Penghapusan"
                      }
                    )
                  ] })
                ] })
              ] })
            ]
          },
          study.id
        );
      }) }) : /* @__PURE__ */ jsxs("div", { className: "user-empty-state", children: [
        /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "BELUM ADA KAJIAN" }),
        /* @__PURE__ */ jsx("h3", { children: "Belum ada kajian yang kamu ajukan" }),
        /* @__PURE__ */ jsx("p", { children: "Kajian yang kamu buat akan muncul di halaman ini." }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/user/studies/create",
            className: "dashboard-primary-button",
            children: "+ Ajukan Kajian"
          }
        )
      ] })
    ] }),
    deletionStudy && /* @__PURE__ */ jsx("div", { className: "user-modal-backdrop", children: /* @__PURE__ */ jsxs("div", { className: "user-modal", children: [
      /* @__PURE__ */ jsxs("div", { className: "user-modal__header", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "REQUEST PENGHAPUSAN" }),
          /* @__PURE__ */ jsx("h2", { children: "Ajukan Penghapusan Kajian" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "user-modal__close",
            onClick: closeDeletionModal,
            children: "×"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "user-modal__body", children: [
        /* @__PURE__ */ jsx("p", { children: "Kamu akan mengajukan permintaan penghapusan:" }),
        /* @__PURE__ */ jsx("strong", { children: deletionStudy.title }),
        /* @__PURE__ */ jsx("p", { className: "user-modal__hint", children: "Permintaan akan diperiksa oleh Admin sebelum kajian benar-benar dihapus." }),
        /* @__PURE__ */ jsxs("form", { onSubmit: submitDeletionRequest, children: [
          /* @__PURE__ */ jsxs("div", { className: "user-form-field", children: [
            /* @__PURE__ */ jsx("label", { children: "Alasan Penghapusan" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: deletionForm.data.reason,
                onChange: (event) => deletionForm.setData(
                  "reason",
                  event.target.value
                ),
                placeholder: "Jelaskan alasan penghapusan kajian...",
                rows: "6"
              }
            ),
            deletionForm.errors.reason && /* @__PURE__ */ jsx("div", { className: "form-error", children: deletionForm.errors.reason })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "user-modal__actions", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "admin-table-button",
                onClick: closeDeletionModal,
                children: "Batal"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "dashboard-primary-button",
                disabled: deletionForm.processing,
                children: deletionForm.processing ? "Mengirim..." : "Ajukan Penghapusan"
              }
            )
          ] })
        ] })
      ] })
    ] }) })
  ] }) });
}
export {
  Dashboard as default
};
