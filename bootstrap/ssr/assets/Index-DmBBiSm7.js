import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { D as DashboardLayout } from "./DashboardLayout-Y_7hl2u9.js";
import { u as useFeedback } from "./FeedbackProvider-Chsn1HxW.js";
import "./BpsLogo-CvcnsC1A.js";
function Index({ categories = [] }) {
  const {
    showToast,
    openConfirm
  } = useFeedback();
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const form = useForm({
    name: "",
    description: "",
    image: null
  });
  function openCreate() {
    setEditingCategory(null);
    form.setData({
      name: "",
      description: "",
      image: null
    });
    form.clearErrors();
    setShowForm(true);
  }
  function openEdit(category) {
    setEditingCategory(category);
    form.setData({
      name: category.name ?? "",
      description: category.description ?? "",
      image: null
    });
    form.clearErrors();
    setShowForm(true);
  }
  function closeForm() {
    setShowForm(false);
    setEditingCategory(null);
    form.reset();
    form.clearErrors();
  }
  function submit(event) {
    event.preventDefault();
    if (editingCategory) {
      form.transform((data) => ({
        ...data,
        _method: "PATCH"
      }));
      form.post(
        `/admin/categories/${editingCategory.id}`,
        {
          forceFormData: true,
          onSuccess: () => closeForm()
        }
      );
      return;
    }
    form.post("/admin/categories", {
      forceFormData: true,
      onSuccess: () => closeForm()
    });
  }
  function deleteCategory(category) {
    if (Number(category.studies_count) > 0) {
      showToast(
        "Kategori ini masih digunakan oleh kajian dan tidak dapat dihapus.",
        "warning"
      );
      return;
    }
    openConfirm({
      title: "Hapus Kategori?",
      message: `Kategori "${category.name}" akan dihapus secara permanen.`,
      confirmText: "Ya, Hapus",
      cancelText: "Batal",
      danger: true,
      onConfirm: () => {
        form.delete(
          `/admin/categories/${category.id}`
        );
      }
    });
  }
  return /* @__PURE__ */ jsx(DashboardLayout, { children: /* @__PURE__ */ jsxs("div", { className: "admin-dashboard", children: [
    /* @__PURE__ */ jsxs("div", { className: "admin-header", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "CATEGORY MANAGEMENT" }),
        /* @__PURE__ */ jsx("h1", { children: "Kategori" }),
        /* @__PURE__ */ jsx("p", { children: "Kelola kategori yang digunakan untuk mengelompokkan kajian." })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "dashboard-primary-button",
          onClick: openCreate,
          children: "+ Tambah Kategori"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "admin-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "admin-section__heading", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "DAFTAR KATEGORI" }),
          /* @__PURE__ */ jsx("h2", { children: "Semua Kategori" })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "admin-queue-count", children: [
          categories.length,
          " kategori"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "admin-category-grid", children: categories.length > 0 ? categories.map((category) => /* @__PURE__ */ jsxs(
        "article",
        {
          className: "admin-category-card",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "admin-category-card__number", children: [
                "#",
                String(
                  category.id
                ).padStart(2, "0")
              ] }),
              /* @__PURE__ */ jsx("h3", { children: category.name }),
              /* @__PURE__ */ jsx("p", { children: category.description || "Belum ada deskripsi kategori." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "admin-category-card__footer", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                category.studies_count ?? 0,
                " ",
                "kajian"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "admin-user-actions", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    className: "admin-table-button",
                    onClick: () => openEdit(category),
                    children: "Edit"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    className: "admin-table-button admin-table-button--danger",
                    onClick: () => deleteCategory(category),
                    children: "Hapus"
                  }
                )
              ] })
            ] })
          ]
        },
        category.id
      )) : /* @__PURE__ */ jsx("div", { className: "admin-empty", children: "Belum ada kategori." }) })
    ] }),
    showForm && /* @__PURE__ */ jsx("div", { className: "admin-modal-backdrop", children: /* @__PURE__ */ jsxs("div", { className: "admin-modal", children: [
      /* @__PURE__ */ jsxs("div", { className: "admin-modal__header", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: editingCategory ? "EDIT CATEGORY" : "NEW CATEGORY" }),
          /* @__PURE__ */ jsx("h2", { children: editingCategory ? "Edit Kategori" : "Tambah Kategori" })
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
              /* @__PURE__ */ jsx("label", { children: "Nama Kategori" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: form.data.name,
                  onChange: (event) => form.setData(
                    "name",
                    event.target.value
                  ),
                  placeholder: "Contoh: Web Scraping"
                }
              ),
              form.errors.name && /* @__PURE__ */ jsx("div", { className: "form-error", children: form.errors.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "admin-form-field", children: [
              /* @__PURE__ */ jsx("label", { children: "Deskripsi" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: form.data.description,
                  onChange: (event) => form.setData(
                    "description",
                    event.target.value
                  ),
                  rows: "5",
                  placeholder: "Deskripsi singkat kategori"
                }
              ),
              form.errors.description && /* @__PURE__ */ jsx("div", { className: "form-error", children: form.errors.description })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "admin-form-field", children: [
              /* @__PURE__ */ jsx("label", { children: "Gambar Kategori" }),
              (editingCategory == null ? void 0 : editingCategory.image_url) && !form.data.image && /* @__PURE__ */ jsx("div", { className: "admin-category-image-preview", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: editingCategory.image_url,
                  alt: editingCategory.name
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "admin-image-upload", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "category-image",
                    type: "file",
                    accept: "image/jpeg,image/png,image/webp",
                    className: "admin-image-upload__input",
                    onChange: (event) => {
                      var _a;
                      const file = ((_a = event.target.files) == null ? void 0 : _a[0]) ?? null;
                      form.setData("image", file);
                    }
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "label",
                  {
                    htmlFor: "category-image",
                    className: "admin-image-upload__box",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "admin-image-upload__icon", children: "↑" }),
                      /* @__PURE__ */ jsxs("div", { className: "admin-image-upload__text", children: [
                        /* @__PURE__ */ jsx("strong", { children: form.data.image ? form.data.image.name : "Pilih gambar kategori" }),
                        /* @__PURE__ */ jsx("span", { children: form.data.image ? "Klik untuk mengganti gambar" : "JPG, PNG, atau WebP" })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "admin-image-upload__button", children: "Pilih Gambar" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("small", { className: "admin-form-help", children: "Maksimal 5 MB · Disarankan menggunakan gambar landscape." }),
              form.errors.image && /* @__PURE__ */ jsx("div", { className: "form-error", children: form.errors.image })
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
                  children: form.processing ? "Menyimpan..." : editingCategory ? "Simpan Perubahan" : "Tambah Kategori"
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
