import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { router, useForm } from "@inertiajs/react";
import { D as DashboardLayout } from "./DashboardLayout-DP3XBUYL.js";
import "./BpsLogo-Bc2wSHH6.js";
function Index({
  users = {},
  totalUsers = 0,
  totalResearchers = 0,
  totalReviewers = 0,
  totalDirectors = 0,
  filters = {}
}) {
  var _a;
  const [search, setSearch] = useState(filters.search ?? "");
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.get(
        "/admin/users",
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
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const form = useForm({
    name: "",
    email: "",
    password: "",
    role: "user"
  });
  function openCreate() {
    setEditingUser(null);
    form.reset();
    form.setData({
      name: "",
      email: "",
      password: "",
      role: "user"
    });
    setShowForm(true);
  }
  function openEdit(user) {
    setEditingUser(user);
    form.setData({
      name: user.name ?? "",
      email: user.email ?? "",
      password: "",
      role: user.role ?? "user"
    });
    setShowForm(true);
  }
  function closeForm() {
    setShowForm(false);
    setEditingUser(null);
    form.reset();
    form.clearErrors();
  }
  function submit(event) {
    event.preventDefault();
    if (editingUser) {
      form.patch(`/admin/users/${editingUser.id}`, {
        onSuccess: () => closeForm()
      });
      return;
    }
    form.post("/admin/users", {
      onSuccess: () => closeForm()
    });
  }
  function deleteUser(user) {
    if (!window.confirm(
      `Hapus pengguna "${user.name}"? Tindakan ini tidak dapat dibatalkan.`
    )) {
      return;
    }
    form.delete(`/admin/users/${user.id}`);
  }
  return /* @__PURE__ */ jsx(DashboardLayout, { children: /* @__PURE__ */ jsxs("div", { className: "admin-dashboard", children: [
    /* @__PURE__ */ jsxs("div", { className: "admin-header", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "USER MANAGEMENT" }),
        /* @__PURE__ */ jsx("h1", { children: "Pengguna" }),
        /* @__PURE__ */ jsx("p", { children: "Kelola akun, peran, dan akses pengguna pada platform Kajian Big Data BPS." })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "dashboard-primary-button",
          onClick: openCreate,
          children: "+ Tambah Pengguna"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "admin-stats", children: [
      /* @__PURE__ */ jsxs("div", { className: "admin-stat-card", children: [
        /* @__PURE__ */ jsx("span", { children: "TOTAL USERS" }),
        /* @__PURE__ */ jsx("strong", { children: totalUsers }),
        /* @__PURE__ */ jsx("small", { children: "Semua akun" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "admin-stat-card", children: [
        /* @__PURE__ */ jsx("span", { children: "PENELITI" }),
        /* @__PURE__ */ jsx("strong", { children: totalResearchers }),
        /* @__PURE__ */ jsx("small", { children: "Pengguna peneliti" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "admin-stat-card", children: [
        /* @__PURE__ */ jsx("span", { children: "REVIEWER" }),
        /* @__PURE__ */ jsx("strong", { children: totalReviewers }),
        /* @__PURE__ */ jsx("small", { children: "Reviewer aktif" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "admin-stat-card", children: [
        /* @__PURE__ */ jsx("span", { children: "DIREKTUR" }),
        /* @__PURE__ */ jsx("strong", { children: totalDirectors }),
        /* @__PURE__ */ jsx("small", { children: "Reviewer final" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "admin-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "admin-section__heading", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "DAFTAR PENGGUNA" }),
          /* @__PURE__ */ jsx("h2", { children: "Semua Pengguna" })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "admin-queue-count", children: [
          users.total ?? 0,
          " pengguna"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "admin-search-wrapper", children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "search",
          value: search,
          onChange: (event) => setSearch(event.target.value),
          placeholder: "Cari nama atau email...",
          className: "admin-search-input"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "admin-user-table-wrapper", children: /* @__PURE__ */ jsxs("table", { className: "admin-user-table", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { children: "Nama" }),
          /* @__PURE__ */ jsx("th", { children: "Email" }),
          /* @__PURE__ */ jsx("th", { children: "Role" }),
          /* @__PURE__ */ jsx("th", { children: "Bergabung" }),
          /* @__PURE__ */ jsx("th", { children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: ((_a = users.data) == null ? void 0 : _a.length) > 0 ? users.data.map((user) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("strong", { children: user.name }) }),
          /* @__PURE__ */ jsx("td", { children: user.email }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
            "span",
            {
              className: `admin-role-badge admin-role-badge--${user.role}`,
              children: user.role === "user" ? "Peneliti" : user.role === "reviewer" ? "Reviewer" : user.role === "director" ? "Direktur" : "Admin"
            }
          ) }),
          /* @__PURE__ */ jsx("td", { children: new Date(
            user.created_at
          ).toLocaleDateString(
            "id-ID",
            {
              day: "numeric",
              month: "short",
              year: "numeric"
            }
          ) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("div", { className: "admin-user-actions", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "admin-table-button",
                onClick: () => openEdit(user),
                children: "Edit"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "admin-table-button admin-table-button--danger",
                onClick: () => deleteUser(user),
                children: "Hapus"
              }
            )
          ] }) })
        ] }, user.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
          "td",
          {
            colSpan: "5",
            className: "admin-table-empty",
            children: "Belum ada pengguna."
          }
        ) }) })
      ] }) }),
      users.last_page > 1 && /* @__PURE__ */ jsxs("div", { className: "admin-pagination", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            disabled: !users.prev_page_url,
            onClick: () => {
              if (users.prev_page_url) {
                router.get(
                  users.prev_page_url,
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
          { length: users.last_page },
          (_, index) => index + 1
        ).map((page) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: page === users.current_page ? "is-active" : "",
            onClick: () => {
              if (page !== users.current_page) {
                router.get(
                  users.path + `?page=${page}${search ? `&search=${encodeURIComponent(search)}` : ""}`,
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
            disabled: !users.next_page_url,
            onClick: () => {
              if (users.next_page_url) {
                router.get(
                  users.next_page_url,
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
    showForm && /* @__PURE__ */ jsx("div", { className: "admin-modal-backdrop", children: /* @__PURE__ */ jsxs("div", { className: "admin-modal", children: [
      /* @__PURE__ */ jsxs("div", { className: "admin-modal__header", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: editingUser ? "EDIT USER" : "NEW USER" }),
          /* @__PURE__ */ jsx("h2", { children: editingUser ? "Edit Pengguna" : "Tambah Pengguna" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "admin-modal__close",
            onClick: closeForm,
            children: "×"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: submit,
          className: "admin-form",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "admin-form-field", children: [
              /* @__PURE__ */ jsx("label", { children: "Nama" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: form.data.name,
                  onChange: (event) => form.setData(
                    "name",
                    event.target.value
                  ),
                  placeholder: "Nama lengkap"
                }
              ),
              form.errors.name && /* @__PURE__ */ jsx("div", { className: "form-error", children: form.errors.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "admin-form-field", children: [
              /* @__PURE__ */ jsx("label", { children: "Email" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  value: form.data.email,
                  onChange: (event) => form.setData(
                    "email",
                    event.target.value
                  ),
                  placeholder: "nama@email.com"
                }
              ),
              form.errors.email && /* @__PURE__ */ jsx("div", { className: "form-error", children: form.errors.email })
            ] }),
            !editingUser && /* @__PURE__ */ jsxs("div", { className: "admin-form-field", children: [
              /* @__PURE__ */ jsx("label", { children: "Password" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "password",
                  value: form.data.password,
                  onChange: (event) => form.setData(
                    "password",
                    event.target.value
                  ),
                  placeholder: "Minimal 8 karakter"
                }
              ),
              form.errors.password && /* @__PURE__ */ jsx("div", { className: "form-error", children: form.errors.password })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "admin-form-field", children: [
              /* @__PURE__ */ jsx("label", { children: "Role" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: form.data.role,
                  onChange: (event) => form.setData(
                    "role",
                    event.target.value
                  ),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "user", children: "Peneliti" }),
                    /* @__PURE__ */ jsx("option", { value: "reviewer", children: "Reviewer" }),
                    /* @__PURE__ */ jsx("option", { value: "director", children: "Direktur" }),
                    /* @__PURE__ */ jsx("option", { value: "admin", children: "Administrator" })
                  ]
                }
              ),
              form.errors.role && /* @__PURE__ */ jsx("div", { className: "form-error", children: form.errors.role })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "admin-modal__actions", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "admin-table-button",
                  onClick: closeForm,
                  children: "Batal"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  className: "dashboard-primary-button",
                  disabled: form.processing,
                  children: form.processing ? "Menyimpan..." : editingUser ? "Simpan Perubahan" : "Tambah Pengguna"
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
