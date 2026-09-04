var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Quill from "quill";
import QuillResize from "quill-resize-module";
/* empty css                */
import { D as DashboardLayout } from "./DashboardLayout-Y_7hl2u9.js";
import { u as useFeedback } from "./FeedbackProvider-Chsn1HxW.js";
import "./BpsLogo-CvcnsC1A.js";
const escapeHtml = (value = "") => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
const getCalloutIcon = (variant = "info") => {
  const icons = {
    info: "ⓘ",
    success: "✓",
    warning: "⚠",
    danger: "!",
    tip: "💡"
  };
  return icons[variant] || icons.info;
};
const getVideoEmbedUrl = (url = "") => {
  const value = String(url).trim();
  if (!value) return "";
  try {
    const parsed = new URL(value);
    if (parsed.hostname === "youtube.com" || parsed.hostname === "www.youtube.com" || parsed.hostname === "m.youtube.com") {
      const videoId = parsed.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : value;
    }
    if (parsed.hostname === "youtu.be") {
      const videoId = parsed.pathname.replace(/^\/+/, "").split("/")[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : value;
    }
    if (parsed.hostname === "vimeo.com" || parsed.hostname === "www.vimeo.com") {
      const match = parsed.pathname.match(/\/(\d+)/);
      return (match == null ? void 0 : match[1]) ? `https://player.vimeo.com/video/${match[1]}` : value;
    }
    return value;
  } catch {
    return value;
  }
};
const BlockEmbed = Quill.import("blots/block/embed");
Quill.import("delta");
class PdfBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    node.setAttribute("contenteditable", "false");
    node.dataset.url = value.url;
    node.dataset.name = value.name || "Dokumen PDF";
    const header = document.createElement("div");
    header.className = "study-pdf-header";
    const info = document.createElement("div");
    info.className = "study-pdf-info";
    const icon = document.createElement("div");
    icon.className = "study-pdf-icon";
    icon.textContent = "PDF";
    const title = document.createElement("div");
    title.className = "study-pdf-title";
    const strong = document.createElement("strong");
    strong.textContent = value.name || "Dokumen PDF";
    const type = document.createElement("span");
    type.textContent = "Dokumen PDF";
    title.appendChild(strong);
    title.appendChild(type);
    info.appendChild(icon);
    info.appendChild(title);
    const openLink = document.createElement("a");
    openLink.href = value.url;
    openLink.target = "_blank";
    openLink.rel = "noopener noreferrer";
    openLink.className = "study-pdf-open";
    openLink.textContent = "Buka penuh";
    header.appendChild(info);
    header.appendChild(openLink);
    const viewer = document.createElement("div");
    viewer.className = "study-pdf-viewer";
    const iframe = document.createElement("iframe");
    iframe.src = `${value.url}#toolbar=1&navpanes=0&view=FitH`;
    iframe.title = value.name || "Dokumen PDF";
    iframe.loading = "lazy";
    viewer.appendChild(iframe);
    node.appendChild(header);
    node.appendChild(viewer);
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
__publicField(PdfBlot, "className", "study-pdf-block");
class VideoBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    node.setAttribute(
      "contenteditable",
      "false"
    );
    const url = value.url || "";
    const embedUrl = getVideoEmbedUrl(url);
    node.dataset.url = url;
    node.dataset.type = value.type || "video";
    if (embedUrl) {
      node.innerHTML = `
                <div class="study-video-frame">
                    <iframe
                        src="${embedUrl}"
                        title="${escapeHtml("Video kajian")}"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>
            `;
    } else {
      node.innerHTML = `
                <div class="study-video-frame">
                    <video controls>
                        <source src="${url}">
                    </video>
                </div>
            `;
    }
    return node;
  }
  static value(node) {
    return {
      url: node.dataset.url,
      type: node.dataset.type
    };
  }
}
__publicField(VideoBlot, "blotName", "studyVideo");
__publicField(VideoBlot, "tagName", "div");
__publicField(VideoBlot, "className", "study-video-block");
class EmbedBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    node.setAttribute(
      "contenteditable",
      "false"
    );
    const url = String(value.url || "").trim();
    const type = value.type || "url";
    node.dataset.url = url;
    node.dataset.type = type;
    if (!url) {
      return node;
    }
    if (type === "github" || type === "gitlab") {
      const platform = type === "github" ? "GitHub" : "GitLab";
      node.innerHTML = `
                <div class="study-repository-card">
                    <div class="study-repository-platform">
                        ${platform}
                    </div>

                    <div class="study-repository-url">
                        ${url}
                    </div>

                    <a
                        href="${url}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Buka Repository
                    </a>
                </div>
            `;
      return node;
    }
    node.innerHTML = `
            <div class="study-embed-frame">
                <iframe
                    src="${url}"
                    title="${escapeHtml("Embed kajian")}"
                    loading="lazy"
                    allowfullscreen
                ></iframe>
            </div>
        `;
    return node;
  }
  static value(node) {
    return {
      url: node.dataset.url,
      type: node.dataset.type
    };
  }
}
__publicField(EmbedBlot, "blotName", "studyEmbed");
__publicField(EmbedBlot, "tagName", "div");
__publicField(EmbedBlot, "className", "study-embed-block");
Quill.register(EmbedBlot);
class CalloutBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    node.setAttribute(
      "contenteditable",
      "false"
    );
    node.dataset.variant = value.variant || "info";
    node.dataset.title = value.title || "Catatan";
    node.dataset.text = value.text || "";
    node.innerHTML = `
            <div class="study-callout study-callout--${value.variant || "info"}">

                <div class="study-callout__icon">
                    ${getCalloutIcon(value.variant)}
                </div>

                <div class="study-callout__content">

                    <strong>
                        ${escapeHtml(
      value.title || "Catatan"
    )}
                    </strong>

                    <p>
                        ${escapeHtml(
      value.text || ""
    )}
                    </p>

                </div>

            </div>
        `;
    return node;
  }
  static value(node) {
    var _a, _b;
    return {
      title: node.dataset.title || ((_a = node.querySelector(".study-callout__content strong")) == null ? void 0 : _a.textContent) || "Catatan",
      variant: node.dataset.variant || "info",
      text: node.dataset.text || ((_b = node.querySelector(".study-callout__content p")) == null ? void 0 : _b.textContent) || ""
    };
  }
}
__publicField(CalloutBlot, "blotName", "callout");
__publicField(CalloutBlot, "tagName", "div");
__publicField(CalloutBlot, "className", "study-callout-block");
class DividerBlot extends BlockEmbed {
  static create() {
    const node = super.create();
    node.setAttribute(
      "contenteditable",
      "false"
    );
    node.innerHTML = `
            <div class="study-divider"></div>
        `;
    return node;
  }
  static value() {
    return true;
  }
}
__publicField(DividerBlot, "blotName", "divider");
__publicField(DividerBlot, "tagName", "div");
__publicField(DividerBlot, "className", "study-divider-block");
class ButtonBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    node.setAttribute(
      "contenteditable",
      "false"
    );
    node.dataset.url = value.url || "";
    node.dataset.label = value.label || "Lihat Selengkapnya";
    node.innerHTML = `
            <a
                href="${value.url || "#"}"
                target="_blank"
                rel="noopener noreferrer"
                class="study-content-button"
            >
                ${escapeHtml(
      value.label || "Lihat Selengkapnya"
    )}
            </a>
        `;
    return node;
  }
  static value(node) {
    return {
      url: node.dataset.url,
      label: node.dataset.label
    };
  }
}
__publicField(ButtonBlot, "blotName", "studyButton");
__publicField(ButtonBlot, "tagName", "div");
__publicField(ButtonBlot, "className", "study-button-block");
class GalleryBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    node.setAttribute(
      "contenteditable",
      "false"
    );
    const images = Array.isArray(value.images) ? value.images : [];
    node.dataset.images = JSON.stringify(images);
    node.innerHTML = `
            <div class="study-gallery">
                ${images.map((image) => `
                    <figure class="study-gallery__item">

                        <img
                            src="${image.url}"
                            alt="${escapeHtml(
      image.alt || "Gambar kajian"
    )}"
                        />

                        ${image.caption ? `<figcaption>${escapeHtml(
      image.caption
    )}</figcaption>` : ""}

                    </figure>
                `).join("")}
            </div>
        `;
    return node;
  }
  static value(node) {
    try {
      return {
        images: JSON.parse(
          node.dataset.images || "[]"
        )
      };
    } catch {
      return {
        images: []
      };
    }
  }
}
__publicField(GalleryBlot, "blotName", "gallery");
__publicField(GalleryBlot, "tagName", "div");
__publicField(GalleryBlot, "className", "study-gallery-block");
Quill.register(PdfBlot);
Quill.register(VideoBlot);
Quill.register(CalloutBlot);
Quill.register(DividerBlot);
Quill.register(ButtonBlot);
Quill.register(GalleryBlot);
Quill.register(
  "modules/resize",
  QuillResize
);
const COMMANDS = [
  {
    group: "PRIMARY",
    type: "text",
    label: "Teks",
    description: "Tulis paragraf biasa",
    keywords: ["text", "teks", "paragraph", "paragraf"],
    icon: "T"
  },
  {
    group: "PRIMARY",
    type: "heading",
    label: "Heading",
    description: "Judul bagian utama",
    keywords: ["heading", "judul", "h1"],
    icon: "H"
  },
  {
    group: "PRIMARY",
    type: "subheading",
    label: "Subheading",
    description: "Subjudul bagian",
    keywords: ["subheading", "subjudul", "h2", "h3"],
    icon: "H2"
  },
  {
    group: "PRIMARY",
    type: "image",
    label: "Gambar",
    description: "Upload atau tambahkan gambar",
    keywords: ["image", "gambar", "img", "foto"],
    icon: "▧"
  },
  {
    group: "PRIMARY",
    type: "gallery",
    label: "Gallery",
    description: "Buat galeri beberapa gambar",
    keywords: ["gallery", "galeri", "photos", "foto"],
    icon: "▦"
  },
  {
    group: "PRIMARY",
    type: "divider",
    label: "Divider",
    description: "Tambahkan garis pemisah",
    keywords: ["divider", "line", "garis", "separator"],
    icon: "—"
  },
  {
    group: "PRIMARY",
    type: "quote",
    label: "Quote",
    description: "Tambahkan kutipan",
    keywords: ["quote", "kutipan", "blockquote"],
    icon: '"'
  },
  {
    group: "PRIMARY",
    type: "callout",
    label: "Callout",
    description: "Kotak informasi yang menonjol",
    keywords: ["callout", "info", "catatan", "warning"],
    icon: "!"
  },
  {
    group: "PRIMARY",
    type: "video",
    label: "Video",
    description: "Tambahkan video dari URL",
    keywords: ["video", "mp4", "movie"],
    icon: "▶"
  },
  {
    group: "PRIMARY",
    type: "file",
    label: "File / PDF",
    description: "Upload dokumen PDF",
    keywords: ["file", "pdf", "dokumen", "document"],
    icon: "PDF"
  },
  {
    group: "PRIMARY",
    type: "button",
    label: "Button",
    description: "Tambahkan tombol tautan",
    keywords: ["button", "tombol", "link"],
    icon: "↗"
  },
  {
    group: "PRIMARY",
    type: "code",
    label: "Code",
    description: "Tambahkan blok kode",
    keywords: ["code", "kode", "programming"],
    icon: "</>"
  },
  {
    group: "EMBED",
    type: "youtube",
    label: "YouTube",
    description: "Embed video YouTube",
    keywords: ["youtube", "video"],
    icon: "▶"
  },
  {
    group: "EMBED",
    type: "github",
    label: "GitHub",
    description: "Tampilkan repository GitHub",
    keywords: ["github", "repository", "repo", "code"],
    icon: "GH"
  },
  {
    group: "EMBED",
    type: "gitlab",
    label: "GitLab",
    description: "Tampilkan repository GitLab",
    keywords: ["gitlab", "repository", "repo", "code"],
    icon: "GL"
  },
  {
    group: "EMBED",
    type: "vimeo",
    label: "Vimeo",
    description: "Embed video Vimeo",
    keywords: ["vimeo", "video"],
    icon: "V"
  },
  {
    group: "EMBED",
    type: "embed",
    label: "Embed",
    description: "Masukkan URL embed",
    keywords: ["embed", "url", "iframe"],
    icon: "↗"
  }
];
function Edit({ study, categories }) {
  var _a, _b, _c, _d;
  const {
    showToast,
    openConfirm
  } = useFeedback();
  const [editorModal, setEditorModal] = useState({
    open: false,
    type: null,
    title: "",
    fields: {}
  });
  const [showPreview, setShowPreview] = useState(false);
  const [pendingImage, setPendingImage] = useState(null);
  const openEditorModal = (type, fields = {}) => {
    setEditorModal({
      open: true,
      type,
      title: type === "callout" ? "Tambahkan Callout" : type === "video" ? "Tambahkan Video" : type === "button" ? "Tambahkan Button" : "Tambahkan Blok",
      fields
    });
  };
  const closeEditorModal = () => {
    setEditorModal({
      open: false,
      type: null,
      title: "",
      fields: {}
    });
  };
  const openPreview = () => {
    const quill = quillRef.current;
    if (quill) {
      form.setData(
        "content",
        quill.root.innerHTML
      );
    }
    setShowPreview(true);
  };
  const closePreview = () => {
    setShowPreview(false);
  };
  const slashRangeRef = useRef(null);
  const insertRangeRef = useRef(null);
  const [showBlockMenu, setShowBlockMenu] = useState(false);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashQuery, setSlashQuery] = useState("");
  const [slashMenuPosition, setSlashMenuPosition] = useState({
    top: 0,
    left: 0
  });
  const [activeMenu, setActiveMenu] = useState("PRIMARY");
  const [selectedCommand, setSelectedCommand] = useState(0);
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [coverPreview, setCoverPreview] = useState(
    study.cover_image ? `/storage/${study.cover_image}` : null
  );
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
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
    )) ?? [],
    approval_flow: study.approval_flow ?? "reviewer_director"
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
      showToast(
        "Maksimal 7 kata kunci.",
        "warning"
      );
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
  const uploadImage = async (file, altText = "") => {
    var _a2;
    if (!file) {
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      showToast(
        "Ukuran gambar maksimal 4 MB.",
        "error"
      );
      return;
    }
    setUploadingImage(true);
    const data = new FormData();
    data.append(
      "image",
      file
    );
    try {
      const response = await fetch(
        `/user/studies/${study.id}/content-image`,
        {
          method: "POST",
          headers: {
            "X-CSRF-TOKEN": (_a2 = document.querySelector(
              'meta[name="csrf-token"]'
            )) == null ? void 0 : _a2.getAttribute(
              "content"
            ),
            Accept: "application/json"
          },
          body: data
        }
      );
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Gagal mengupload gambar."
        );
      }
      const quill = quillRef.current;
      if (!quill) {
        return;
      }
      const range = getEditorRange();
      if (!range) {
        return;
      }
      if (range.length > 0) {
        quill.deleteText(
          range.index,
          range.length,
          "user"
        );
      }
      quill.insertEmbed(
        range.index,
        "image",
        result.url,
        "user"
      );
      slashRangeRef.current = null;
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
      quill.setSelection(
        range.index + 1,
        0,
        "user"
      );
    } catch (error) {
      console.error(error);
      showToast(
        error.message || "Gambar gagal diupload.",
        "error"
      );
    } finally {
      setUploadingImage(false);
    }
  };
  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/webp";
    input.click();
    input.onchange = () => {
      var _a2;
      const file = (_a2 = input.files) == null ? void 0 : _a2[0];
      if (!file) return;
      if (file.size > 4 * 1024 * 1024) {
        showToast("Ukuran gambar maksimal 4 MB.", "error");
        return;
      }
      setPendingImage(file);
      openEditorModal("image", {
        alt: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ")
      });
    };
  };
  const handleGalleryUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/jpeg,image/png,image/webp";
    input.click();
    input.onchange = async () => {
      var _a2;
      const files = Array.from(input.files || []);
      if (!files.length) return;
      if (files.length > 8) {
        showToast("Gallery maksimal 8 gambar.", "error");
        return;
      }
      if (files.some((file) => file.size > 4 * 1024 * 1024)) {
        showToast("Setiap gambar maksimal 4 MB.", "error");
        return;
      }
      setUploadingGallery(true);
      try {
        const images = [];
        for (const file of files) {
          const data = new FormData();
          data.append("image", file);
          const response = await fetch("/user/studies/content-image", {
            method: "POST",
            headers: {
              "X-CSRF-TOKEN": (_a2 = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a2.getAttribute("content"),
              Accept: "application/json"
            },
            body: data
          });
          const result = await response.json();
          if (!response.ok || !result.success) {
            throw new Error(result.message || "Gagal mengupload gallery.");
          }
          images.push({ url: result.url, alt: file.name, caption: "" });
        }
        const quill = quillRef.current;
        if (!quill) return;
        const range = getEditorRange();
        if (!range) return;
        if (range.length > 0) quill.deleteText(range.index, range.length, "user");
        quill.insertEmbed(range.index, "gallery", { images }, "user");
        quill.insertText(range.index + 1, "\n", "user");
        quill.setSelection(range.index + 2, 0, "user");
        slashRangeRef.current = null;
      } catch (error) {
        console.error(error);
        showToast(error.message || "Gallery gagal diupload.", "error");
      } finally {
        setUploadingGallery(false);
      }
    };
  };
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
        showToast(
          "File yang dipilih harus berupa PDF.",
          "error"
        );
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        showToast(
          "Ukuran PDF maksimal 10 MB.",
          "error"
        );
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
        showToast(
          error.message || "PDF gagal diupload.",
          "error"
        );
      } finally {
        setUploadingPdf(false);
      }
    };
  }
  const updateSlashMenu = () => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }
    const range = quill.getSelection();
    if (!range) {
      setShowSlashMenu(false);
      return;
    }
    const [line, offset] = quill.getLine(range.index);
    if (!line) {
      setShowSlashMenu(false);
      return;
    }
    const lineText = line.domNode.textContent || "";
    const beforeCursor = lineText.slice(0, offset);
    const match = beforeCursor.match(/^\/([^\s]*)$/);
    if (!match) {
      setShowSlashMenu(false);
      setSlashQuery("");
      slashRangeRef.current = null;
      return;
    }
    const query = match[1].toLowerCase();
    slashRangeRef.current = {
      index: range.index - beforeCursor.length,
      length: beforeCursor.length
    };
    const bounds = quill.getBounds(range.index);
    const editorElement = editorRef.current;
    if (!editorElement) {
      return;
    }
    const shellElement = editorElement.closest(".study-editor-shell");
    if (!shellElement) {
      return;
    }
    const editorRect = editorElement.getBoundingClientRect();
    const shellRect = shellElement.getBoundingClientRect();
    setSlashMenuPosition({
      top: editorRect.top - shellRect.top + bounds.top + bounds.height + 8,
      left: editorRect.left - shellRect.left + bounds.left
    });
    setSlashQuery(query);
    setSelectedCommand(0);
    setShowSlashMenu(true);
  };
  const filteredCommands = COMMANDS.filter(
    (command) => {
      if (!slashQuery) {
        return true;
      }
      const searchable = [
        command.label,
        command.description,
        ...command.keywords
      ].join(" ").toLowerCase();
      return searchable.includes(
        slashQuery
      );
    }
  );
  const executeCommand = (command) => {
    if (!command) return;
    const quill = quillRef.current;
    if (!quill) return;
    const slashRange = slashRangeRef.current;
    if (slashRange) {
      insertRangeRef.current = {
        index: slashRange.index,
        length: slashRange.length
      };
    } else {
      const selection = quill.getSelection(true);
      insertRangeRef.current = selection ? { index: selection.index, length: selection.length || 0 } : { index: Math.max(0, quill.getLength() - 1), length: 0 };
    }
    if (slashRange) {
      quill.deleteText(slashRange.index, slashRange.length, "user");
      quill.setSelection(slashRange.index, 0, "user");
      slashRangeRef.current = null;
    }
    setShowSlashMenu(false);
    setShowBlockMenu(false);
    setSlashQuery("");
    switch (command.type) {
      case "text":
        insertText();
        break;
      case "heading":
        insertHeading(2);
        break;
      case "subheading":
        insertHeading(3);
        break;
      case "image":
        handleImageUpload();
        break;
      case "gallery":
        handleGalleryUpload();
        break;
      case "divider":
        insertDivider();
        break;
      case "quote":
        insertQuote();
        break;
      case "callout":
        openEditorModal("callout", { title: "Catatan", text: "", variant: "info" });
        break;
      case "video":
      case "youtube":
      case "vimeo":
        openEditorModal("video", {
          preset: command.type,
          url: ""
        });
        break;
      case "github":
      case "gitlab":
      case "embed":
        openEditorModal("embed", {
          preset: command.type === "embed" ? "url" : command.type,
          url: ""
        });
        break;
      case "file":
        handlePdfUpload();
        break;
      case "button":
        openEditorModal("button", { label: "Lihat Selengkapnya", url: "" });
        break;
      case "code":
        insertCode();
        break;
    }
  };
  const handleEditorKeyDown = (event) => {
    if (!showSlashMenu) {
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedCommand((current) => {
        const total = filteredCommands.length;
        if (!total) {
          return 0;
        }
        return (current + 1) % total;
      });
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedCommand((current) => {
        const total = filteredCommands.length;
        if (!total) {
          return 0;
        }
        return (current - 1 + total) % total;
      });
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setShowSlashMenu(false);
      slashRangeRef.current = null;
      return;
    }
    if (event.key !== "Enter") {
      return;
    }
    const command = filteredCommands[selectedCommand];
    if (!command) {
      return;
    }
    event.preventDefault();
    executeCommand(command);
  };
  const removeSlash = () => {
    const quill = quillRef.current;
    const slashRange = slashRangeRef.current;
    if (!quill || !slashRange) {
      return;
    }
    quill.deleteText(
      slashRange.index,
      slashRange.length,
      "user"
    );
    quill.setSelection(
      slashRange.index,
      0,
      "user"
    );
    slashRangeRef.current = null;
  };
  const getEditorRange = () => {
    const quill = quillRef.current;
    if (!quill) {
      return null;
    }
    const savedRange = insertRangeRef.current;
    if (savedRange) {
      return {
        index: savedRange.index,
        length: savedRange.length || 0
      };
    }
    const slashRange = slashRangeRef.current;
    if (slashRange) {
      return { index: slashRange.index, length: slashRange.length };
    }
    const selection = quill.getSelection(true);
    if (selection) {
      return {
        index: selection.index,
        length: selection.length || 0
      };
    }
    return {
      index: Math.max(0, quill.getLength() - 1),
      length: 0
    };
  };
  const insertImage = (url, alt = "") => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }
    removeSlash();
    const range = quill.getSelection(true);
    quill.insertEmbed(
      range.index,
      "image",
      url,
      "user"
    );
    setTimeout(() => {
      const images = quill.root.querySelectorAll(
        `img[src="${url}"]`
      );
      const image = images[images.length - 1];
      if (image) {
        image.setAttribute(
          "alt",
          alt
        );
      }
    }, 0);
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
  };
  const insertDivider = () => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }
    removeSlash();
    const range = quill.getSelection(true);
    quill.insertEmbed(
      range.index,
      "divider",
      true,
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
  };
  const insertCallout = ({
    title = "Catatan",
    text = "",
    variant = "info"
  } = {}) => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }
    const range = getEditorRange();
    if (!range) {
      return;
    }
    if (range.length > 0) {
      quill.deleteText(
        range.index,
        range.length,
        "user"
      );
    }
    quill.insertEmbed(
      range.index,
      "callout",
      {
        title,
        text,
        variant
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
    insertRangeRef.current = null;
    slashRangeRef.current = null;
  };
  const insertVideo = ({
    url,
    preset = "video"
  } = {}) => {
    const quill = quillRef.current;
    if (!quill || !url) {
      return;
    }
    const range = getEditorRange();
    if (!range) {
      return;
    }
    if (range.length > 0) {
      quill.deleteText(
        range.index,
        range.length,
        "user"
      );
    }
    quill.insertEmbed(
      range.index,
      "studyVideo",
      {
        url: url.trim(),
        type: preset
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
    insertRangeRef.current = null;
    slashRangeRef.current = null;
  };
  const insertEmbed = ({
    url,
    type = "url"
  } = {}) => {
    const quill = quillRef.current;
    if (!quill || !url) {
      return;
    }
    removeSlash();
    const range = quill.getSelection(true);
    quill.insertEmbed(
      range.index,
      "studyEmbed",
      {
        url: url.trim(),
        type
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
  };
  const insertButton = ({
    label = "Lihat Selengkapnya",
    url = ""
  } = {}) => {
    const quill = quillRef.current;
    if (!quill || !url) {
      return;
    }
    const range = getEditorRange();
    if (!range) {
      return;
    }
    if (range.length > 0) {
      quill.deleteText(
        range.index,
        range.length,
        "user"
      );
    }
    quill.insertEmbed(
      range.index,
      "studyButton",
      {
        label,
        url: url.trim()
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
    insertRangeRef.current = null;
    slashRangeRef.current = null;
  };
  const insertQuote = () => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }
    removeSlash();
    const range = quill.getSelection(true);
    if (!range) {
      return;
    }
    quill.formatLine(
      range.index,
      1,
      "blockquote",
      true,
      "user"
    );
    quill.focus();
  };
  const insertCode = () => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }
    removeSlash();
    const range = quill.getSelection(true);
    if (!range) {
      return;
    }
    quill.formatLine(
      range.index,
      1,
      "code-block",
      true,
      "user"
    );
    quill.focus();
  };
  const insertText = () => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }
    removeSlash();
    quill.focus();
  };
  const insertHeading = (level) => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }
    removeSlash();
    const range = quill.getSelection(true);
    quill.formatLine(
      range.index,
      1,
      "header",
      level,
      "user"
    );
    quill.focus();
  };
  useEffect(() => {
    if (!editorRef.current || quillRef.current) {
      return;
    }
    const quill = new Quill(
      editorRef.current,
      {
        theme: "snow",
        placeholder: "Perbaiki isi kajian... Ketik / untuk menambahkan blok.",
        modules: {
          toolbar: false,
          resize: {
            modules: [
              "Resize",
              "DisplaySize"
            ]
          }
        }
      }
    );
    if (study.content) {
      const delta = quill.clipboard.convert({
        html: study.content
      });
      delta.ops = delta.ops.map((op) => {
        if (op.insert && op.insert.video && typeof op.insert.video === "string" && /\.pdf(?:#.*)?$/i.test(op.insert.video)) {
          const url = op.insert.video;
          return {
            insert: {
              pdf: {
                url: url.replace(/#.*$/, ""),
                name: "Dokumen PDF"
              }
            }
          };
        }
        return op;
      });
      quill.setContents(delta, "api");
      form.setData(
        "content",
        quill.root.innerHTML
      );
    }
    const handleTextChange = () => {
      form.setData(
        "content",
        quill.root.innerHTML
      );
      requestAnimationFrame(() => {
        updateSlashMenu();
      });
    };
    const handleSelectionChange = () => {
      updateSlashMenu();
    };
    const handleKeyDown = (event) => {
      handleEditorKeyDown(event);
    };
    const handleKeyUp = () => {
      updateSlashMenu();
    };
    const handlePaste = (event) => {
      var _a2;
      const items = (_a2 = event.clipboardData) == null ? void 0 : _a2.items;
      if (!items) return;
      for (const item of items) {
        if (!item.type.startsWith("image/")) {
          continue;
        }
        const file = item.getAsFile();
        if (!file) {
          continue;
        }
        event.preventDefault();
        uploadImage(
          file,
          "Ilustrasi kajian Big Data BPS"
        );
        break;
      }
    };
    quill.root.addEventListener(
      "paste",
      handlePaste,
      true
    );
    quill.on(
      "text-change",
      handleTextChange
    );
    quill.on(
      "selection-change",
      handleSelectionChange
    );
    quill.root.addEventListener(
      "keydown",
      handleKeyDown
    );
    quill.root.addEventListener(
      "keyup",
      handleKeyUp
    );
    quillRef.current = quill;
    return () => {
      quill.off(
        "text-change",
        handleTextChange
      );
      quill.off(
        "selection-change",
        handleSelectionChange
      );
      quill.root.removeEventListener(
        "keydown",
        handleKeyDown
      );
      quill.root.removeEventListener(
        "keyup",
        handleKeyUp
      );
      quill.root.removeEventListener(
        "paste",
        handlePaste,
        true
      );
      quillRef.current = null;
    };
  }, []);
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
    const quill = quillRef.current;
    form.transform((data) => ({
      ...data,
      content: quill ? quill.root.innerHTML : data.content,
      keywords
    }));
    const options = {
      preserveScroll: true
    };
    if (form.data.cover_image) {
      form.transform((data) => ({
        ...data,
        _method: "PATCH",
        content: quill ? quill.root.innerHTML : data.content,
        keywords
      }));
      form.post(
        `/user/studies/${study.id}`,
        {
          ...options,
          forceFormData: true
        }
      );
      return;
    }
    form.patch(
      `/user/studies/${study.id}`,
      options
    );
  }
  function handleResubmit() {
    openConfirm({
      title: "Ajukan Ulang Kajian?",
      message: "Perubahan kajian akan disimpan terlebih dahulu, kemudian diajukan kembali untuk proses review.",
      confirmText: "Ya, Simpan & Ajukan",
      cancelText: "Batal",
      onConfirm: () => {
        const quill = quillRef.current;
        const saveData = (data) => ({
          ...data,
          content: quill ? quill.root.innerHTML : data.content,
          keywords
        });
        form.transform(saveData);
        const submitAfterSave = () => {
          form.patch(
            `/user/studies/${study.id}/resubmit`
          );
        };
        if (form.data.cover_image) {
          form.transform((data) => ({
            ...saveData(data),
            _method: "PATCH"
          }));
          form.post(
            `/user/studies/${study.id}`,
            {
              forceFormData: true,
              preserveScroll: true,
              onSuccess: () => {
                submitAfterSave();
              }
            }
          );
          return;
        }
        form.patch(
          `/user/studies/${study.id}`,
          {
            preserveScroll: true,
            onSuccess: () => {
              submitAfterSave();
            }
          }
        );
      }
    });
  }
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsxs("div", { className: "study-create-page", children: [
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
              /* @__PURE__ */ jsx("label", { children: "Alur Persetujuan" }),
              /* @__PURE__ */ jsxs("div", { className: "approval-flow-options", children: [
                /* @__PURE__ */ jsxs("label", { className: "approval-flow-option", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "radio",
                      name: "approval_flow",
                      value: "reviewer",
                      checked: form.data.approval_flow === "reviewer",
                      onChange: (event) => form.setData(
                        "approval_flow",
                        event.target.value
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Reviewer saja" }),
                    /* @__PURE__ */ jsx("p", { children: "Setelah disetujui Reviewer, kajian langsung dipublikasikan." })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "approval-flow-option", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "radio",
                      name: "approval_flow",
                      value: "reviewer_director",
                      checked: form.data.approval_flow === "reviewer_director",
                      onChange: (event) => form.setData(
                        "approval_flow",
                        event.target.value
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Reviewer + Direktur" }),
                    /* @__PURE__ */ jsx("p", { children: "Setelah disetujui Reviewer, kajian diteruskan ke Direktur untuk persetujuan akhir." })
                  ] })
                ] })
              ] }),
              form.errors.approval_flow && /* @__PURE__ */ jsx("div", { className: "form-error", children: form.errors.approval_flow })
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
                /* @__PURE__ */ jsxs("div", { className: "study-editor-shell", children: [
                  /* @__PURE__ */ jsxs("div", { className: "study-editor-toolbar", children: [
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        type: "button",
                        className: "study-editor-add-button",
                        onClick: () => {
                          setShowBlockMenu(
                            !showBlockMenu
                          );
                          setShowSlashMenu(false);
                        },
                        children: [
                          /* @__PURE__ */ jsx("span", { className: "study-editor-add-button__icon", children: "+" }),
                          /* @__PURE__ */ jsx("span", { children: "Tambahkan blok" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "study-editor-hint", children: [
                      "Ketik",
                      /* @__PURE__ */ jsx("kbd", { children: "/" }),
                      "untuk command"
                    ] }),
                    showBlockMenu && /* @__PURE__ */ jsxs("div", { className: "study-command-menu study-command-menu--button", children: [
                      /* @__PURE__ */ jsxs("div", { className: "study-command-menu__tabs", children: [
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            className: activeMenu === "PRIMARY" ? "is-active" : "",
                            onClick: () => setActiveMenu("PRIMARY"),
                            children: "PRIMARY"
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            className: activeMenu === "EMBED" ? "is-active" : "",
                            onClick: () => setActiveMenu("EMBED"),
                            children: "EMBED"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "study-command-menu__items", children: COMMANDS.filter(
                        (command) => command.group === activeMenu
                      ).map((command) => /* @__PURE__ */ jsxs(
                        "button",
                        {
                          type: "button",
                          className: "study-command-item",
                          onClick: () => {
                            setShowBlockMenu(false);
                            executeCommand(command);
                          },
                          children: [
                            /* @__PURE__ */ jsx("span", { className: "study-command-item__icon", children: command.icon }),
                            /* @__PURE__ */ jsxs("span", { className: "study-command-item__text", children: [
                              /* @__PURE__ */ jsx("strong", { children: command.label }),
                              /* @__PURE__ */ jsx("small", { children: command.description })
                            ] })
                          ]
                        },
                        command.type
                      )) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      ref: editorRef,
                      className: "study-editor"
                    }
                  ),
                  showSlashMenu && /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "study-slash-menu",
                      style: {
                        top: `${slashMenuPosition.top}px`,
                        left: `${slashMenuPosition.left}px`
                      },
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "study-block-menu__header", children: [
                          /* @__PURE__ */ jsx("span", { children: "BLOK" }),
                          slashQuery && /* @__PURE__ */ jsxs("small", { children: [
                            "/",
                            slashQuery
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "study-block-menu__items", children: filteredCommands.length === 0 ? /* @__PURE__ */ jsx("div", { className: "study-slash-menu__empty", children: "Tidak ada command yang cocok." }) : filteredCommands.map(
                          (command, index) => /* @__PURE__ */ jsxs(
                            "button",
                            {
                              type: "button",
                              className: `study-block-menu__item ${selectedCommand === index ? "is-selected" : ""}`,
                              onMouseDown: (event) => {
                                event.preventDefault();
                                executeCommand(command);
                              },
                              children: [
                                /* @__PURE__ */ jsx("span", { className: "study-block-menu__icon", children: command.icon }),
                                /* @__PURE__ */ jsxs("span", { className: "study-block-menu__content", children: [
                                  /* @__PURE__ */ jsx("strong", { children: command.label }),
                                  /* @__PURE__ */ jsx("small", { children: command.description })
                                ] })
                              ]
                            },
                            command.type
                          )
                        ) })
                      ]
                    }
                  ),
                  uploadingImage && /* @__PURE__ */ jsx("div", { className: "editor-upload-status", children: "Mengupload gambar..." }),
                  uploadingPdf && /* @__PURE__ */ jsx("div", { className: "editor-upload-status", children: "Mengupload PDF..." }),
                  uploadingGallery && /* @__PURE__ */ jsx("div", { className: "editor-upload-status", children: "Mengupload gallery..." }),
                  form.errors.content && /* @__PURE__ */ jsx("div", { className: "form-error", children: form.errors.content })
                ] })
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
                  type: "button",
                  className: "study-secondary-button",
                  onClick: openPreview,
                  disabled: form.processing || uploadingImage || uploadingPdf || uploadingGallery,
                  children: "Preview"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  className: "dashboard-primary-button",
                  disabled: form.processing || uploadingImage || uploadingPdf || uploadingGallery,
                  children: form.processing ? "Menyimpan..." : "Simpan sebagai Draft"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "dashboard-primary-button",
                  onClick: handleResubmit,
                  disabled: form.processing || uploadingImage || uploadingPdf || uploadingGallery,
                  children: "Ajukan Kajian"
                }
              )
            ] })
          ]
        }
      )
    ] }),
    editorModal.open && /* @__PURE__ */ jsx(
      "div",
      {
        className: "study-editor-modal__overlay",
        onMouseDown: (event) => {
          if (event.target === event.currentTarget) closeEditorModal();
        },
        children: /* @__PURE__ */ jsxs("div", { className: "study-editor-modal", role: "dialog", "aria-modal": "true", children: [
          /* @__PURE__ */ jsxs("div", { className: "study-editor-modal__header", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "EDITOR" }),
              /* @__PURE__ */ jsx("h2", { children: editorModal.title })
            ] }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "study-editor-modal__close", onClick: closeEditorModal, children: "×" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "study-editor-modal__body", children: [
            editorModal.type === "callout" && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { className: "study-editor-modal__field", children: [
                /* @__PURE__ */ jsx("label", { children: "Judul Callout" }),
                /* @__PURE__ */ jsx("input", { type: "text", value: editorModal.fields.title ?? "", autoFocus: true, placeholder: "Masukkan judul callout...", onChange: (e) => setEditorModal((c) => ({ ...c, fields: { ...c.fields, title: e.target.value } })) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "study-editor-modal__field", children: [
                /* @__PURE__ */ jsx("label", { children: "Isi Callout" }),
                /* @__PURE__ */ jsx("textarea", { rows: "5", value: editorModal.fields.text ?? "", placeholder: "Tulis informasi yang ingin ditonjolkan...", onChange: (e) => setEditorModal((c) => ({ ...c, fields: { ...c.fields, text: e.target.value } })) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "study-editor-modal__field", children: [
                /* @__PURE__ */ jsx("label", { children: "Informasi" }),
                /* @__PURE__ */ jsxs("select", { value: editorModal.fields.variant ?? "info", onChange: (e) => setEditorModal((c) => ({ ...c, fields: { ...c.fields, variant: e.target.value } })), children: [
                  /* @__PURE__ */ jsx("option", { value: "info", children: "Informasi" }),
                  /* @__PURE__ */ jsx("option", { value: "warning", children: "Peringatan" }),
                  /* @__PURE__ */ jsx("option", { value: "success", children: "Sukses" }),
                  /* @__PURE__ */ jsx("option", { value: "important", children: "Penting" })
                ] })
              ] })
            ] }),
            editorModal.type === "video" && /* @__PURE__ */ jsxs("div", { className: "study-editor-modal__field", children: [
              /* @__PURE__ */ jsx("label", { children: editorModal.fields.preset === "youtube" ? "URL YouTube" : editorModal.fields.preset === "vimeo" ? "URL Vimeo" : "URL Embed" }),
              /* @__PURE__ */ jsx("input", { type: "url", value: editorModal.fields.url ?? "", autoFocus: true, placeholder: "https://...", onChange: (e) => setEditorModal((c) => ({ ...c, fields: { ...c.fields, url: e.target.value } })) })
            ] }),
            editorModal.type === "embed" && /* @__PURE__ */ jsxs("div", { className: "study-editor-modal__field", children: [
              /* @__PURE__ */ jsx("label", { children: editorModal.fields.preset === "github" ? "URL Repository GitHub" : editorModal.fields.preset === "gitlab" ? "URL Repository GitLab" : "URL Embed" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "url",
                  value: editorModal.fields.url ?? "",
                  autoFocus: true,
                  placeholder: "https://...",
                  onChange: (e) => setEditorModal((c) => ({
                    ...c,
                    fields: {
                      ...c.fields,
                      url: e.target.value
                    }
                  }))
                }
              ),
              /* @__PURE__ */ jsx("small", { children: editorModal.fields.preset === "github" ? "Masukkan URL repository GitHub." : editorModal.fields.preset === "gitlab" ? "Masukkan URL repository GitLab." : "Masukkan URL yang ingin di-embed ke dalam kajian." })
            ] }),
            editorModal.type === "button" && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { className: "study-editor-modal__field", children: [
                /* @__PURE__ */ jsx("label", { children: "Teks Tombol" }),
                /* @__PURE__ */ jsx("input", { type: "text", value: editorModal.fields.label ?? "", autoFocus: true, placeholder: "Contoh: Lihat Selengkapnya", onChange: (e) => setEditorModal((c) => ({ ...c, fields: { ...c.fields, label: e.target.value } })) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "study-editor-modal__field", children: [
                /* @__PURE__ */ jsx("label", { children: "Deskripsi Gambar" }),
                /* @__PURE__ */ jsx("input", { type: "url", value: editorModal.fields.url ?? "", placeholder: "https://...", onChange: (e) => setEditorModal((c) => ({ ...c, fields: { ...c.fields, url: e.target.value } })) })
              ] })
            ] }),
            editorModal.type === "image" && /* @__PURE__ */ jsxs("div", { className: "study-editor-modal__field", children: [
              /* @__PURE__ */ jsx("label", { children: "Deskripsi Gambar" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: editorModal.fields.alt ?? "", autoFocus: true, placeholder: "Jelaskan isi gambar...", onChange: (e) => setEditorModal((c) => ({ ...c, fields: { ...c.fields, alt: e.target.value } })) }),
              /* @__PURE__ */ jsx("small", { children: "Digunakan untuk aksesibilitas dan SEO." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "study-editor-modal__footer", children: [
            /* @__PURE__ */ jsx("button", { type: "button", className: "study-secondary-button", onClick: closeEditorModal, children: "Batal" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "dashboard-primary-button",
                disabled: uploadingImage,
                onClick: async () => {
                  var _a2, _b2, _c2, _d2, _e;
                  if (editorModal.type === "callout") {
                    insertCallout(editorModal.fields);
                    closeEditorModal();
                    return;
                  }
                  if (editorModal.type === "video") {
                    const url = (_a2 = editorModal.fields.url) == null ? void 0 : _a2.trim();
                    if (!url) {
                      showToast("URL tidak boleh kosong.", "warning");
                      return;
                    }
                    insertVideo({ url, preset: editorModal.fields.preset || "video" });
                    closeEditorModal();
                    return;
                  }
                  if (editorModal.type === "embed") {
                    const url = (_b2 = editorModal.fields.url) == null ? void 0 : _b2.trim();
                    if (!url) {
                      showToast("URL tidak boleh kosong.", "warning");
                      return;
                    }
                    insertEmbed({
                      url,
                      type: editorModal.fields.preset || "url"
                    });
                    closeEditorModal();
                    return;
                  }
                  if (editorModal.type === "button") {
                    const url = (_c2 = editorModal.fields.url) == null ? void 0 : _c2.trim();
                    if (!url) {
                      showToast("URL tidak boleh kosong.", "warning");
                      return;
                    }
                    insertButton({ label: editorModal.fields.label || "Lihat Selengkapnya", url });
                    closeEditorModal();
                    return;
                  }
                  if (editorModal.type === "image") {
                    const file = pendingImage;
                    if (!file) {
                      closeEditorModal();
                      return;
                    }
                    setUploadingImage(true);
                    const data = new FormData();
                    data.append("image", file);
                    try {
                      const response = await fetch(`/user/studies/${study.id}/content-image`, {
                        method: "POST",
                        headers: {
                          "X-CSRF-TOKEN": (_d2 = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _d2.getAttribute("content"),
                          Accept: "application/json"
                        },
                        body: data
                      });
                      const result = await response.json();
                      if (!response.ok || !result.success) throw new Error(result.message || "Gagal mengupload gambar.");
                      insertImage(result.url, ((_e = editorModal.fields.alt) == null ? void 0 : _e.trim()) || "Ilustrasi kajian Big Data BPS");
                      setPendingImage(null);
                      closeEditorModal();
                    } catch (error) {
                      console.error(error);
                      showToast(error.message || "Gagal mengupload gambar.", "error");
                    } finally {
                      setUploadingImage(false);
                    }
                  }
                },
                children: uploadingImage ? "Mengupload..." : "Tambahkan"
              }
            )
          ] })
        ] })
      }
    ),
    showPreview && /* @__PURE__ */ jsx(
      "div",
      {
        className: "study-public-preview-overlay",
        onMouseDown: (event) => {
          if (event.target === event.currentTarget) {
            closePreview();
          }
        },
        children: /* @__PURE__ */ jsxs("div", { className: "study-public-preview", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "study-public-preview__close",
              onClick: closePreview,
              "aria-label": "Tutup preview",
              children: "×"
            }
          ),
          /* @__PURE__ */ jsxs(
            "section",
            {
              className: "study-public-preview__hero",
              style: coverPreview ? {
                backgroundImage: `
                                            linear-gradient(
                                                rgba(5, 25, 48, 0.78),
                                                rgba(5, 45, 80, 0.88)
                                            ),
                                            url("${coverPreview}")
                                        `
              } : void 0,
              children: [
                /* @__PURE__ */ jsx("div", { className: "study-public-preview__hero-pattern" }),
                /* @__PURE__ */ jsxs("div", { className: "study-public-preview__hero-inner", children: [
                  /* @__PURE__ */ jsx("div", { className: "study-public-preview__back", children: "← Kembali ke Kajian" }),
                  /* @__PURE__ */ jsx("div", { className: "study-public-preview__category", children: ((_d = categories.find(
                    (category) => String(category.id) === String(form.data.category_id)
                  )) == null ? void 0 : _d.name) || "Kategori" }),
                  /* @__PURE__ */ jsx("h1", { children: form.data.title || "Judul Kajian" }),
                  /* @__PURE__ */ jsxs("div", { className: "study-public-preview__meta", children: [
                    /* @__PURE__ */ jsx("span", { children: "Preview" }),
                    /* @__PURE__ */ jsx("span", { children: "•" }),
                    /* @__PURE__ */ jsx("span", { children: "Kajian Big Data BPS" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "study-public-preview__actions", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        className: "study-public-preview__like",
                        children: "♥   Suka"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        className: "study-public-preview__share",
                        children: "↗   Bagikan"
                      }
                    )
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("main", { className: "study-public-preview__main", children: [
            form.data.excerpt && /* @__PURE__ */ jsx("div", { className: "study-public-preview__excerpt", children: form.data.excerpt }),
            /* @__PURE__ */ jsx("div", { className: "study-public-preview__divider" }),
            keywords.length > 0 && /* @__PURE__ */ jsxs("div", { className: "study-public-preview__keywords", children: [
              /* @__PURE__ */ jsx("strong", { children: "Kata Kunci" }),
              /* @__PURE__ */ jsx("div", { className: "study-public-preview__keyword-list", children: keywords.map(
                (keyword) => /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "study-public-preview__keyword",
                    children: keyword
                  },
                  keyword
                )
              ) })
            ] }),
            /* @__PURE__ */ jsx(
              "article",
              {
                className: "study-public-preview__content",
                dangerouslySetInnerHTML: {
                  __html: form.data.content || "<p>Belum ada isi kajian.</p>"
                }
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  Edit as default
};
