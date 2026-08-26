var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Quill from "quill";
import QuillResize from "quill-resize-module";
/* empty css                */
import { D as DashboardLayout } from "./DashboardLayout-DP3XBUYL.js";
import "./BpsLogo-Bc2wSHH6.js";
const BlockEmbed = Quill.import("blots/block/embed");
class PdfBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    const iframe = document.createElement("iframe");
    iframe.src = value.url;
    iframe.title = value.name || "Dokumen PDF";
    iframe.loading = "lazy";
    node.setAttribute("contenteditable", "false");
    node.dataset.url = value.url;
    node.dataset.name = value.name || "Dokumen PDF";
    iframe.style.width = "100%";
    iframe.style.height = "700px";
    iframe.style.border = "0";
    iframe.style.borderRadius = "8px";
    node.appendChild(iframe);
    return node;
  }
  static value(node) {
    return {
      url: node.dataset.url,
      name: node.dataset.name
    };
  }
}
__publicField(PdfBlot, "blotName", "pdf");
__publicField(PdfBlot, "tagName", "div");
__publicField(PdfBlot, "className", "pdf-embed");
Quill.register(PdfBlot);
Quill.register("modules/resize", QuillResize);
function Edit({ study, categories }) {
  var _a, _b, _c;
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [coverPreview, setCoverPreview] = useState(
    study.cover_image ? `/storage/${study.cover_image}` : null
  );
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState(
    ((_a = study.keywords) == null ? void 0 : _a.map(
      (keyword) => keyword.name
    )) ?? []
  );
  const form = useForm({
    title: study.title ?? "",
    category_id: study.category_id ?? "",
    excerpt: study.excerpt ?? "",
    content: study.content ?? "",
    cover_image: null,
    keywords: ((_b = study.keywords) == null ? void 0 : _b.map(
      (keyword) => keyword.name
    )) ?? []
  });
  const addKeyword = () => {
    const value = keywordInput.trim();
    if (!value) {
      return;
    }
    const normalized = value.toLowerCase();
    if (keywords.includes(normalized)) {
      setKeywordInput("");
      return;
    }
    if (keywords.length >= 7) {
      alert("Maksimal 7 kata kunci.");
      return;
    }
    setKeywords([
      ...keywords,
      normalized
    ]);
    setKeywordInput("");
  };
  const removeKeyword = (keyword) => {
    setKeywords(
      keywords.filter(
        (item) => item !== keyword
      )
    );
  };
  const handleKeywordKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addKeyword();
    }
  };
  useEffect(() => {
    form.setData("keywords", keywords);
  }, [keywords]);
  const latestReview = ((_c = study.reviews) == null ? void 0 : _c[0]) ?? null;
  useEffect(() => {
    if (!editorRef.current || quillRef.current) {
      return;
    }
    const quill = new Quill(editorRef.current, {
      theme: "snow",
      placeholder: "Perbaiki isi kajian...",
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["blockquote", "code-block"],
            ["link", "image", "pdf"],
            ["clean"]
          ],
          handlers: {
            image: handleImageUpload,
            pdf: handlePdfUpload
          }
        },
        resize: {
          modules: [
            "Resize",
            "DisplaySize"
          ]
        }
      }
    });
    if (study.content) {
      quill.root.innerHTML = study.content;
    }
    quill.on("text-change", () => {
      form.setData("content", quill.root.innerHTML);
    });
    quillRef.current = quill;
    return () => {
      quill.off("text-change");
      quillRef.current = null;
    };
  }, []);
  async function handleImageUpload() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/webp";
    input.click();
    input.onchange = async () => {
      var _a2, _b2;
      const file = (_a2 = input.files) == null ? void 0 : _a2[0];
      if (!file) {
        return;
      }
      const altText = window.prompt(
        "Deskripsi gambar untuk aksesibilitas dan SEO:",
        ""
      );
      if (altText === null) {
        return;
      }
      if (file.size > 4 * 1024 * 1024) {
        alert("Ukuran gambar maksimal 4 MB.");
        return;
      }
      setUploadingImage(true);
      const data = new FormData();
      data.append("image", file);
      try {
        const response = await fetch(
          `/user/studies/${study.id}/content-image`,
          {
            method: "POST",
            headers: {
              "X-CSRF-TOKEN": (_b2 = document.querySelector(
                'meta[name="csrf-token"]'
              )) == null ? void 0 : _b2.getAttribute("content"),
              "Accept": "application/json"
            },
            body: data
          }
        );
        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Upload gambar gagal."
          );
        }
        const quill = quillRef.current;
        if (!quill) {
          return;
        }
        const range = quill.getSelection(true);
        quill.insertEmbed(
          range.index,
          "image",
          result.url,
          "user"
        );
        setTimeout(() => {
          const images = quill.root.querySelectorAll(
            `img[src="${result.url}"]`
          );
          const image = images[images.length - 1];
          if (image) {
            image.setAttribute(
              "alt",
              altText.trim() || "Ilustrasi kajian Big Data BPS"
            );
          }
        }, 0);
        quill.setSelection(range.index + 1);
      } catch (error) {
        console.error(error);
        alert(
          error.message || "Gambar gagal diupload."
        );
      } finally {
        setUploadingImage(false);
      }
    };
  }
  async function handlePdfUpload() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/pdf";
    input.click();
    input.onchange = async () => {
      var _a2, _b2;
      const file = (_a2 = input.files) == null ? void 0 : _a2[0];
      if (!file) {
        return;
      }
      if (file.type !== "application/pdf") {
        alert("File yang dipilih harus berupa PDF.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert("Ukuran PDF maksimal 10 MB.");
        return;
      }
      setUploadingPdf(true);
      const data = new FormData();
      data.append("pdf", file);
      try {
        const response = await fetch(
          `/user/studies/${study.id}/content-pdf`,
          {
            method: "POST",
            headers: {
              "X-CSRF-TOKEN": (_b2 = document.querySelector(
                'meta[name="csrf-token"]'
              )) == null ? void 0 : _b2.getAttribute("content"),
              "Accept": "application/json"
            },
            body: data
          }
        );
        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Upload PDF gagal."
          );
        }
        const quill = quillRef.current;
        if (!quill) {
          return;
        }
        const range = quill.getSelection(true);
        quill.insertEmbed(
          range.index,
          "pdf",
          {
            url: result.url,
            name: result.name
          },
          "user"
        );
        quill.insertText(
          range.index + 1,
          "\n",
          "user"
        );
        quill.setSelection(
          range.index + 2,
          0,
          "user"
        );
      } catch (error) {
        console.error(error);
        alert(
          error.message || "PDF gagal diupload."
        );
      } finally {
        setUploadingPdf(false);
      }
    };
  }
  function handleCoverChange(event) {
    var _a2;
    const file = (_a2 = event.target.files) == null ? void 0 : _a2[0];
    if (!file) {
      return;
    }
    form.setData("cover_image", file);
    setCoverPreview(URL.createObjectURL(file));
  }
  function handleSubmit(event) {
    event.preventDefault();
    form.patch(
      `/user/studies/${study.id}`,
      {
        forceFormData: true
      }
    );
  }
  function handleResubmit() {
    if (!window.confirm(
      "Sudah memastikan revisi selesai dan ingin mengajukannya kembali?"
    )) {
      return;
    }
    form.patch(
      `/user/studies/${study.id}/resubmit`
    );
  }
  return /* @__PURE__ */ jsx(DashboardLayout, { children: /* @__PURE__ */ jsxs("div", { className: "study-create-page", children: [
    /* @__PURE__ */ jsxs("div", { className: "study-create-header", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: study.status === "revision" ? "REVISI KAJIAN" : "EDIT KAJIAN" }),
        /* @__PURE__ */ jsx("h1", { children: "Perbarui Kajian" }),
        /* @__PURE__ */ jsx("p", { children: "Perbaiki dan perbarui kajian sebelum diajukan kembali." })
      ] }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/user/dashboard",
          className: "study-create-back",
          children: "← Kembali ke Dashboard"
        }
      )
    ] }),
    study.status === "revision" && latestReview && /* @__PURE__ */ jsxs("div", { className: "revision-note", children: [
      /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "CATATAN REVIEWER" }),
      /* @__PURE__ */ jsx("p", { children: latestReview.notes })
    ] }),
    /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "study-create-form",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "form-section", children: [
            /* @__PURE__ */ jsxs("div", { className: "form-section__heading", children: [
              /* @__PURE__ */ jsx("span", { children: "01" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h2", { children: "Informasi Kajian" }),
                /* @__PURE__ */ jsx("p", { children: "Perbarui judul dan kategori." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-field", children: [
              /* @__PURE__ */ jsx("label", { children: "Judul Kajian" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: form.data.title,
                  onChange: (event) => form.setData(
                    "title",
                    event.target.value
                  )
                }
              ),
              form.errors.title && /* @__PURE__ */ jsx("div", { className: "form-error", children: form.errors.title })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-field", children: [
              /* @__PURE__ */ jsx("label", { children: "Kategori" }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  value: form.data.category_id,
                  onChange: (event) => form.setData(
                    "category_id",
                    event.target.value
                  ),
                  children: categories == null ? void 0 : categories.map((category) => /* @__PURE__ */ jsx(
                    "option",
                    {
                      value: category.id,
                      children: category.name
                    },
                    category.id
                  ))
                }
              ),
              form.errors.category_id && /* @__PURE__ */ jsx("div", { className: "form-error", children: form.errors.category_id })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-field", children: [
            /* @__PURE__ */ jsx("label", { children: "Kata Kunci" }),
            /* @__PURE__ */ jsxs("div", { className: "keyword-input-wrapper", children: [
              /* @__PURE__ */ jsx("div", { className: "keyword-tags", children: keywords.map((keyword) => /* @__PURE__ */ jsxs(
                "span",
                {
                  className: "keyword-tag",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: keyword }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => removeKeyword(keyword),
                        children: "×"
                      }
                    )
                  ]
                },
                keyword
              )) }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: keywordInput,
                  onChange: (event) => setKeywordInput(
                    event.target.value
                  ),
                  onKeyDown: handleKeywordKeyDown,
                  placeholder: keywords.length >= 7 ? "Maksimal 7 kata kunci" : "Ketik kata kunci lalu tekan Enter...",
                  disabled: keywords.length >= 7
                }
              )
            ] }),
            /* @__PURE__ */ jsx("small", { children: "Tambahkan 3–7 kata kunci yang paling relevan dengan kajian." }),
            form.errors.keywords && /* @__PURE__ */ jsx("div", { className: "form-error", children: form.errors.keywords })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-section", children: [
            /* @__PURE__ */ jsxs("div", { className: "form-section__heading", children: [
              /* @__PURE__ */ jsx("span", { children: "02" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h2", { children: "Ringkasan & Cover" }),
                /* @__PURE__ */ jsx("p", { children: "Perbarui cover atau ringkasan kajian." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-field", children: [
              /* @__PURE__ */ jsx("label", { children: "Cover Kajian" }),
              coverPreview && /* @__PURE__ */ jsx("div", { className: "cover-preview", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: coverPreview,
                  alt: study.title
                }
              ) }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  accept: "image/jpeg,image/png,image/webp",
                  onChange: handleCoverChange
                }
              ),
              /* @__PURE__ */ jsx("small", { children: "Kosongkan jika tidak ingin mengganti cover." }),
              form.errors.cover_image && /* @__PURE__ */ jsx("div", { className: "form-error", children: form.errors.cover_image })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-field", children: [
              /* @__PURE__ */ jsx("label", { children: "Ringkasan Kajian" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: "5",
                  maxLength: "500",
                  value: form.data.excerpt,
                  onChange: (event) => form.setData(
                    "excerpt",
                    event.target.value
                  )
                }
              ),
              form.errors.excerpt && /* @__PURE__ */ jsx("div", { className: "form-error", children: form.errors.excerpt })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-section", children: [
            /* @__PURE__ */ jsxs("div", { className: "form-section__heading", children: [
              /* @__PURE__ */ jsx("span", { children: "03" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h2", { children: "Isi Kajian" }),
                /* @__PURE__ */ jsx("p", { children: "Perbaiki isi sesuai catatan reviewer." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-field", children: [
              /* @__PURE__ */ jsx("label", { children: "Isi Kajian" }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  ref: editorRef,
                  className: "study-editor"
                }
              ),
              uploadingImage && /* @__PURE__ */ jsx("div", { className: "editor-upload-status", children: "Mengupload gambar..." }),
              form.errors.content && /* @__PURE__ */ jsx("div", { className: "form-error", children: form.errors.content })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "study-create-actions", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "/user/dashboard",
                className: "study-secondary-button",
                children: "Batal"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "dashboard-primary-button",
                disabled: form.processing,
                children: form.processing ? "Menyimpan..." : "Simpan Perubahan"
              }
            )
          ] })
        ]
      }
    ),
    (study.status === "revision" || study.status === "draft") && /* @__PURE__ */ jsxs("div", { className: "resubmit-panel", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Sudah selesai memperbaiki?" }),
        /* @__PURE__ */ jsx("p", { children: "Ajukan kembali kajian untuk diproses oleh reviewer." })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "dashboard-primary-button",
          onClick: handleResubmit,
          disabled: form.processing,
          children: "Ajukan Ulang untuk Review"
        }
      )
    ] })
  ] }) });
}
export {
  Edit as default
};
