import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { router, useForm } from "@inertiajs/react";
import { D as DashboardLayout } from "./DashboardLayout-Y_7hl2u9.js";
import { u as useFeedback } from "./FeedbackProvider-Chsn1HxW.js";
import "./BpsLogo-CvcnsC1A.js";
function Index({
  studies = {},
  deletionRequests = [],
  filters = {}
}) {
  var _a;
  const {
    openConfirm
  } = useFeedback();
  const [search, setSearch] = useState(filters.search ?? "");
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.get(
        "/admin/studies",
        search ? { search } : {},
        {
          preserveState: true,
          preserveScroll: true,
          replace: true
        }
      );
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const rejectForm = useForm({
    admin_notes: ""
  });
  const openReject = (request) => {
    setSelectedRequest(request);
    rejectForm.reset();
    rejectForm.clearErrors();
  };
  const closeReject = () => {
    setSelectedRequest(null);
    rejectForm.reset();
    rejectForm.clearErrors();
  };
  const approveDeletion = (request) => {
    var _a2;
    openConfirm({
      title: "Setujui Penghapusan?",
      message: `Kajian "${(_a2 = request.study) == null ? void 0 : _a2.title}" akan dihapus dari sistem.`,
      confirmText: "Ya, Hapus",
      cancelText: "Batal",
      danger: true,
      onConfirm: () => {
        rejectForm.patch(
          `/admin/deletion-requests/${request.id}/approve`
        );
      }
    });
  };
  const submitReject = (event) => {
    event.preventDefault();
    if (!selectedRequest) {
      return;
    }
    rejectForm.patch(
      `/admin/deletion-requests/${selectedRequest.id}/reject`,
      {
        onSuccess: () => closeReject()
      }
    );
  };
  const statusLabel = {
    draft: "Draft",
    submitted: "Submitted",
    under_review: "Under Review",
    revision: "Revision",
    director_review: "Review Direktur",
    rejected: "Rejected",
    published: "Published"
  };
  return /* @__PURE__ */ jsx(DashboardLayout, { children: /* @__PURE__ */ jsxs("div", { className: "admin-dashboard", children: [
    /* @__PURE__ */ jsx("div", { className: "admin-header", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "STUDY MANAGEMENT" }),
      /* @__PURE__ */ jsx("h1", { children: "Kelola Kajian" }),
      /* @__PURE__ */ jsx("p", { children: "Pantau seluruh kajian dan kelola permintaan penghapusan dari peneliti." })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "admin-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "admin-section__heading", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "DELETION REQUEST" }),
          /* @__PURE__ */ jsx("h2", { children: "Permintaan Penghapusan" })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "admin-queue-count", children: [
          deletionRequests.length,
          " pending"
        ] })
      ] }),
      deletionRequests.length > 0 ? /* @__PURE__ */ jsx("div", { className: "admin-deletion-list", children: deletionRequests.map((request) => {
        var _a2, _b;
        return /* @__PURE__ */ jsxs(
          "article",
          {
            className: "admin-deletion-card",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "admin-deletion-card__content", children: [
                /* @__PURE__ */ jsxs("div", { className: "admin-deletion-card__eyebrow", children: [
                  "REQUEST #",
                  request.id
                ] }),
                /* @__PURE__ */ jsx("h3", { children: ((_a2 = request.study) == null ? void 0 : _a2.title) ?? "Kajian tidak ditemukan" }),
                /* @__PURE__ */ jsxs("p", { children: [
                  "Pemohon:",
                  " ",
                  /* @__PURE__ */ jsx("strong", { children: ((_b = request.user) == null ? void 0 : _b.name) ?? "-" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "admin-deletion-card__reason", children: [
                  /* @__PURE__ */ jsx("span", { children: "ALASAN" }),
                  /* @__PURE__ */ jsx("p", { children: request.reason })
                ] }),
                /* @__PURE__ */ jsxs("small", { children: [
                  "Diajukan",
                  " ",
                  request.created_at ? new Date(
                    request.created_at
                  ).toLocaleDateString(
                    "id-ID",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    }
                  ) : "-"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "admin-deletion-card__actions", children: [
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: request.study ? `/kajian/${request.study.slug}` : "#",
                    className: "admin-table-button",
                    target: "_blank",
                    rel: "noreferrer",
                    children: "Lihat Kajian"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    className: "admin-table-button admin-table-button--danger",
                    onClick: () => openReject(request),
                    children: "Tolak"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    className: "dashboard-primary-button",
                    onClick: () => approveDeletion(request),
                    disabled: rejectForm.processing,
                    children: "Setujui & Hapus"
                  }
                )
              ] })
            ]
          },
          request.id
        );
      }) }) : /* @__PURE__ */ jsx("div", { className: "admin-empty", children: "Tidak ada permintaan penghapusan yang menunggu." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "admin-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "admin-section__heading", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "ALL STUDIES" }),
          /* @__PURE__ */ jsx("h2", { children: "Semua Kajian" })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "admin-queue-count", children: [
          studies.total ?? 0,
          " kajian"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "admin-search-wrapper", children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "search",
          value: search,
          onChange: (event) => setSearch(event.target.value),
          placeholder: "Cari judul kajian...",
          className: "admin-search-input"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "admin-study-table-wrapper", children: /* @__PURE__ */ jsxs("table", { className: "admin-study-table", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { children: "Kajian" }),
          /* @__PURE__ */ jsx("th", { children: "Penulis" }),
          /* @__PURE__ */ jsx("th", { children: "Kategori" }),
          /* @__PURE__ */ jsx("th", { children: "Status" }),
          /* @__PURE__ */ jsx("th", { children: "Dibuat" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: ((_a = studies.data) == null ? void 0 : _a.length) > 0 ? studies.data.map((study) => {
          var _a2, _b;
          return /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsxs("td", { children: [
              /* @__PURE__ */ jsx("strong", { children: study.title }),
              study.excerpt && /* @__PURE__ */ jsx("small", { children: study.excerpt })
            ] }),
            /* @__PURE__ */ jsx("td", { children: ((_a2 = study.user) == null ? void 0 : _a2.name) ?? "-" }),
            /* @__PURE__ */ jsx("td", { children: ((_b = study.category) == null ? void 0 : _b.name) ?? "-" }),
            /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
              "span",
              {
                className: `admin-study-status admin-study-status--${study.status}`,
                children: statusLabel[study.status] ?? study.status
              }
            ) }),
            /* @__PURE__ */ jsx("td", { children: study.created_at ? new Date(
              study.created_at
            ).toLocaleDateString(
              "id-ID",
              {
                day: "numeric",
                month: "short",
                year: "numeric"
              }
            ) : "-" })
          ] }, study.id);
        }) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
          "td",
          {
            colSpan: "5",
            className: "admin-table-empty",
            children: "Belum ada kajian."
          }
        ) }) })
      ] }) }),
      studies.last_page > 1 && /* @__PURE__ */ jsxs("div", { className: "admin-pagination", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            disabled: !studies.prev_page_url,
            onClick: () => {
              if (studies.prev_page_url) {
                router.get(
                  studies.prev_page_url,
                  {},
                  {
                    preserveState: true,
                    preserveScroll: true
                  }
                );
              }
            },
            children: "← Sebelumnya"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "admin-pagination__pages", children: Array.from(
          { length: studies.last_page },
          (_, index) => index + 1
        ).map((page) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: page === studies.current_page ? "is-active" : "",
            onClick: () => {
              if (page !== studies.current_page) {
                router.get(
                  studies.path + `?page=${page}${search ? `&search=${encodeURIComponent(search)}` : ""}`,
                  {},
                  {
                    preserveState: true,
                    preserveScroll: true
                  }
                );
              }
            },
            children: page
          },
          page
        )) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            disabled: !studies.next_page_url,
            onClick: () => {
              if (studies.next_page_url) {
                router.get(
                  studies.next_page_url,
                  {},
                  {
                    preserveState: true,
                    preserveScroll: true
                  }
                );
              }
            },
            children: "Berikutnya →"
          }
        )
      ] })
    ] }),
    selectedRequest && /* @__PURE__ */ jsx("div", { className: "admin-modal-backdrop", children: /* @__PURE__ */ jsxs("div", { className: "admin-modal", children: [
      /* @__PURE__ */ jsxs("div", { className: "admin-modal__header", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "REJECT REQUEST" }),
          /* @__PURE__ */ jsx("h2", { children: "Tolak Permintaan" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "admin-modal__close",
            onClick: closeReject,
            children: "×"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: submitReject,
          className: "admin-form",
          children: [
            /* @__PURE__ */ jsx("p", { className: "admin-modal__description", children: "Jelaskan alasan Admin menolak permintaan penghapusan ini." }),
            /* @__PURE__ */ jsxs("div", { className: "admin-form-field", children: [
              /* @__PURE__ */ jsx("label", { children: "Catatan Admin" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: rejectForm.data.admin_notes,
                  onChange: (event) => rejectForm.setData(
                    "admin_notes",
                    event.target.value
                  ),
                  rows: "6",
                  placeholder: "Tulis alasan penolakan..."
                }
              ),
              rejectForm.errors.admin_notes && /* @__PURE__ */ jsx("div", { className: "form-error", children: rejectForm.errors.admin_notes })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "admin-modal__actions", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "admin-table-button",
                  onClick: closeReject,
                  children: "Batal"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  className: "admin-table-button admin-table-button--danger",
                  disabled: rejectForm.processing,
                  children: rejectForm.processing ? "Memproses..." : "Tolak Request"
                }
              )
            ] })
          ]
        }
      )
    ] }) })
  ] }) });
}
export {
  Index as default
};
