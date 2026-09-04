var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Quill from "quill";
import QuillResize from "quill-resize-module";
/* empty css                */
import { D as DashboardLayout } from "./DashboardLayout-Y_7hl2u9.js";
import "./BpsLogo-CvcnsC1A.js";
const BlockEmbed = Quill.import("blots/block/embed");
class PdfBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    node.setAttribute("contenteditable", "false");
    node.dataset.url = value.url;
    node.dataset.name = value.name || "Dokumen PDF";
    node.innerHTML = `
            <div class="study-pdf-header">
                <div class="study-pdf-info">
                    <div class="study-pdf-icon">
                        PDF
                    </div>

                    <div class="study-pdf-title">
                        <strong>
                            ${escapeHtml(value.name || "Dokumen PDF")}
                        </strong>

                        <span>
                            Dokumen PDF
                        </span>
                    </div>
                </div>

                <a
                    href="${value.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="study-pdf-open"
                >
                    Buka penuh
                </a>
            </div>

            <div class="study-pdf-viewer">
                <iframe
                    src="${value.url}#toolbar=1&navpanes=0&view=FitH"
                    title="${escapeHtml(value.name || "Dokumen PDF")}"
                    loading="lazy"
                ></iframe>
            </div>
        `;
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
    node.setAttribute("contenteditable", "false");
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
    node.setAttribute("contenteditable", "false");
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
                    title="${escapeHtml("Konten embed kajian")}"
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
    node.setAttribute("contenteditable", "false");
    node.dataset.variant = value.variant || "info";
    node.dataset.text = value.text || "";
    node.innerHTML = `
            <div class="study-callout study-callout--${value.variant || "info"}">
                <div class="study-callout__icon">
                    ${getCalloutIcon(value.variant)}
                </div>

                <div class="study-callout__content">
                    <strong>
                        ${escapeHtml(value.title || "Catatan")}
                    </strong>

                    <p>
                        ${escapeHtml(value.text || "")}
                    </p>
                </div>
            </div>
        `;
    return node;
  }
  static value(node) {
    return {
      variant: node.dataset.variant || "info",
      text: node.dataset.text || ""
    };
  }
}
__publicField(CalloutBlot, "blotName", "callout");
__publicField(CalloutBlot, "tagName", "div");
__publicField(CalloutBlot, "className", "study-callout-block");
class DividerBlot extends BlockEmbed {
  static create() {
    const node = super.create();
    node.setAttribute("contenteditable", "false");
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
    node.setAttribute("contenteditable", "false");
    node.dataset.url = value.url || "";
    node.dataset.label = value.label || "Lihat Selengkapnya";
    node.innerHTML = `
            <a
                href="${value.url || "#"}"
                target="_blank"
                rel="noopener noreferrer"
                class="study-content-button"
            >
                ${escapeHtml(value.label || "Lihat Selengkapnya")}
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
    node.setAttribute("contenteditable", "false");
    const images = Array.isArray(value.images) ? value.images : [];
    node.dataset.images = JSON.stringify(images);
    node.innerHTML = `
            <div class="study-gallery">
                ${images.map((image) => `
                    <figure class="study-gallery__item">
                        <img
                            src="${image.url}"
                            alt="${escapeHtml(image.alt || "Gambar kajian")}"
                        />
                        ${image.caption ? `<figcaption>${escapeHtml(image.caption)}</figcaption>` : ""}
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
Quill.register("modules/resize", QuillResize);
function escapeHtml(value = "") {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
function getCalloutIcon(variant = "info") {
  if (variant === "warning") {
    return "!";
  }
  if (variant === "success") {
    return "✓";
  }
  if (variant === "important") {
    return "!";
  }
  return "i";
}
function getVideoEmbedUrl(url) {
  if (!url) {
    return null;
  }
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    if (parsed.hostname === "youtu.be") {
      const videoId = parsed.pathname.replace("/", "");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    if (parsed.hostname.includes("vimeo.com")) {
      const videoId = parsed.pathname.split("/").filter(Boolean).pop();
      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}`;
      }
    }
  } catch {
    return null;
  }
  return null;
}
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
    keywords: ["github", "repository", "repo", "code"]
  },
  {
    group: "EMBED",
    type: "gitlab",
    label: "GitLab",
    description: "Tampilkan repository GitLab",
    keywords: ["gitlab", "repository", "repo", "code"]
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
function Create({ categories = [] }) {
  var _a;
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const slashRangeRef = useRef(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [showBlockMenu, setShowBlockMenu] = useState(false);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({
    top: 0,
    left: 0
  });
  const [slashQuery, setSlashQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState("PRIMARY");
  const [selectedCommand, setSelectedCommand] = useState(0);
  const [editorModal, setEditorModal] = useState({
    open: false,
    type: null,
    title: "",
    fields: {}
  });
  const [showPreview, setShowPreview] = useState(false);
  const [submitAction, setSubmitAction] = useState(null);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [pendingImage, setPendingImage] = useState(null);
  const form = useForm({
    title: "",
    category_id: "",
    excerpt: "",
    content: "",
    cover_image: null,
    keywords: [],
    approval_flow: "reviewer_director",
    submit_for_review: false
  });
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
    form.setData(
      "keywords",
      keywords
    );
  }, [keywords]);
  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/webp";
    input.click();
    input.onchange = () => {
      var _a2;
      const file = (_a2 = input.files) == null ? void 0 : _a2[0];
      if (!file) {
        return;
      }
      if (file.size > 4 * 1024 * 1024) {
        alert(
          "Ukuran gambar maksimal 4 MB."
        );
        return;
      }
      setPendingImage(file);
      setEditorModal({
        open: true,
        type: "image",
        title: "Tambahkan Gambar",
        fields: {
          alt: ""
        }
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
      const files = Array.from(
        input.files || []
      );
      if (!files.length) {
        return;
      }
      if (files.length > 8) {
        alert(
          "Gallery maksimal 8 gambar."
        );
        return;
      }
      const invalid = files.find(
        (file) => file.size > 4 * 1024 * 1024
      );
      if (invalid) {
        alert(
          "Setiap gambar maksimal 4 MB."
        );
        return;
      }
      setUploadingGallery(true);
      try {
        const images = [];
        for (const file of files) {
          const data = new FormData();
          data.append(
            "image",
            file
          );
          const response = await fetch(
            "/user/studies/content-image",
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
              result.message || "Gagal mengupload gallery."
            );
          }
          images.push({
            url: result.url,
            alt: file.name,
            caption: ""
          });
        }
        const quill = quillRef.current;
        if (!quill) {
          return;
        }
        const range = quill.getSelection(true);
        removeSlash();
        quill.insertEmbed(
          range.index,
          "gallery",
          {
            images
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
          error.message || "Gallery gagal diupload."
        );
      } finally {
        setUploadingGallery(false);
      }
    };
  };
  const handlePdfUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/pdf";
    input.click();
    input.onchange = async () => {
      var _a2, _b;
      const file = (_a2 = input.files) == null ? void 0 : _a2[0];
      if (!file) {
        return;
      }
      if (file.type !== "application/pdf") {
        alert(
          "File yang dipilih harus berupa PDF."
        );
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert(
          "Ukuran PDF maksimal 10 MB."
        );
        return;
      }
      setUploadingPdf(true);
      const data = new FormData();
      data.append(
        "pdf",
        file
      );
      try {
        const response = await fetch(
          "/user/studies/content-pdf",
          {
            method: "POST",
            headers: {
              "X-CSRF-TOKEN": (_b = document.querySelector(
                'meta[name="csrf-token"]'
              )) == null ? void 0 : _b.getAttribute(
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
            result.message || "Upload PDF gagal."
          );
        }
        insertPdf(
          result.url,
          result.name
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
  };
  useEffect(() => {
    if (!editorRef.current) {
      return;
    }
    const quill = new Quill(
      editorRef.current,
      {
        theme: "snow",
        placeholder: "Mulai menulis kajian... Ketik / untuk menambahkan blok.",
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
    const handlePaste = async (event) => {
      var _a2, _b;
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
        const data = new FormData();
        data.append("image", file);
        try {
          const response = await fetch(
            "/user/studies/content-image",
            {
              method: "POST",
              headers: {
                "X-CSRF-TOKEN": (_b = document.querySelector(
                  'meta[name="csrf-token"]'
                )) == null ? void 0 : _b.getAttribute("content"),
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
          insertImage(
            result.url,
            "Ilustrasi kajian Big Data BPS"
          );
        } catch (error) {
          console.error(
            "❌ GAGAL UPLOAD:",
            error
          );
          alert(
            error.message || "Gagal mengupload gambar."
          );
        }
      }
    };
    quill.root.addEventListener(
      "paste",
      handlePaste,
      true
    );
    const handleTextChange = () => {
      form.setData(
        "content",
        quill.root.innerHTML
      );
      updateSlashMenu();
    };
    const handleSelectionChange = () => {
      updateSlashMenu();
    };
    quill.on(
      "text-change",
      handleTextChange
    );
    quill.on(
      "selection-change",
      handleSelectionChange
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
        "paste",
        handlePaste,
        true
      );
      quillRef.current = null;
    };
  }, []);
  const updateSlashMenu = () => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }
    const range = quill.getSelection();
    if (!range) {
      return;
    }
    const [line, offset] = quill.getLine(
      range.index
    );
    if (!line) {
      setShowSlashMenu(false);
      return;
    }
    const lineText = line.domNode.textContent || "";
    const beforeCursor = lineText.slice(
      0,
      offset
    );
    const match = beforeCursor.match(
      /^\/([^\s]*)$/
    );
    if (!match) {
      setShowSlashMenu(false);
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
  const insertImage = (url, alt = "") => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }
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
  const insertPdf = (url, name) => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }
    removeSlash();
    const range = quill.getSelection(true);
    quill.insertEmbed(
      range.index,
      "pdf",
      {
        url,
        name
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
  const insertDivider = () => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }
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
    removeSlash();
    const range = quill.getSelection(true);
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
  };
  const insertVideo = ({
    url,
    preset = "video"
  } = {}) => {
    const quill = quillRef.current;
    if (!quill || !url) {
      return;
    }
    removeSlash();
    const range = quill.getSelection(true);
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
    removeSlash();
    const range = quill.getSelection(true);
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
  };
  const insertText = () => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }
    quill.focus();
  };
  const insertHeading = (level) => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }
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
  const insertQuote = () => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }
    const range = quill.getSelection(true);
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
    const range = quill.getSelection(true);
    quill.formatLine(
      range.index,
      1,
      "code-block",
      true,
      "user"
    );
    quill.focus();
  };
  const executeCommand = (command) => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }
    const slashRange = slashRangeRef.current;
    if (slashRange) {
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
        removeSlash();
        handleImageUpload();
        break;
      case "gallery":
        removeSlash();
        handleGalleryUpload();
        break;
      case "divider":
        removeSlash();
        insertDivider();
        break;
      case "quote":
        removeSlash();
        insertQuote();
        break;
      case "callout":
        openEditorModal("callout", {
          title: "Catatan",
          text: "",
          variant: "info"
        });
        break;
      case "video":
        openEditorModal("video", {
          preset: "video",
          url: ""
        });
        break;
      case "file":
        removeSlash();
        handlePdfUpload();
        break;
      case "button":
        openEditorModal("button", {
          label: "Lihat Selengkapnya",
          url: ""
        });
        break;
      case "code":
        removeSlash();
        insertCode();
        break;
      case "youtube":
        openEditorModal("video", { preset: "youtube", url: "" });
        break;
      case "github":
        openEditorModal("embed", { preset: "github", url: "" });
        break;
      case "gitlab":
        openEditorModal("embed", { preset: "gitlab", url: "" });
        break;
      case "vimeo":
        openEditorModal("video", { preset: "vimeo", url: "" });
        break;
      case "embed":
        openEditorModal("embed", { preset: "url", url: "" });
        break;
    }
  };
  const handleEditorKeyDown = (event) => {
    if (event.key === "/") {
      setTimeout(() => {
        updateSlashMenu();
      }, 0);
      return;
    }
    if (!showSlashMenu) {
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedCommand(
        (current) => Math.min(
          current + 1,
          filteredCommands.length - 1
        )
      );
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedCommand(
        (current) => Math.max(
          current - 1,
          0
        )
      );
      return;
    }
    if (event.key === "Enter") {
      if (filteredCommands.length) {
        event.preventDefault();
        executeCommand(
          filteredCommands[selectedCommand]
        );
      }
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setShowSlashMenu(false);
    }
  };
  const handleCoverChange = (event) => {
    var _a2;
    const file = (_a2 = event.target.files) == null ? void 0 : _a2[0];
    if (!file) {
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert(
        "Ukuran cover maksimal 2 MB."
      );
      event.target.value = "";
      return;
    }
    form.setData(
      "cover_image",
      file
    );
    const previewUrl = URL.createObjectURL(
      file
    );
    setCoverPreview(
      previewUrl
    );
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitAction("draft");
    form.post("/user/studies", {
      forceFormData: true,
      onSuccess: () => {
        setSubmitAction(null);
      },
      onError: () => {
        setSubmitAction(null);
      }
    });
  };
  const handleSubmitForReview = () => {
    setShowSubmitConfirm(true);
  };
  const confirmSubmitForReview = () => {
    setShowSubmitConfirm(false);
    setSubmitAction("review");
    const quill = quillRef.current;
    form.transform((data) => ({
      ...data,
      content: quill ? quill.root.innerHTML : data.content,
      keywords,
      submit_for_review: true
    }));
    form.post("/user/studies", {
      forceFormData: true,
      onSuccess: () => {
        setSubmitAction(null);
      },
      onError: () => {
        setSubmitAction(null);
      }
    });
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsxs("div", { className: "study-create-page", children: [
      /* @__PURE__ */ jsxs("div", { className: "study-create-header", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "NEW STUDY" }),
          /* @__PURE__ */ jsx("h1", { children: "Ajukan Kajian" }),
          /* @__PURE__ */ jsx("p", { children: "Buat kajian baru untuk dipublikasikan melalui portal Kajian Big Data BPS." })
        ] }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/user/dashboard",
            className: "study-create-back",
            children: "← Kembali"
          }
        )
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
                  /* @__PURE__ */ jsx("p", { children: "Tentukan judul, kategori, dan kata kunci." })
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
                    ),
                    placeholder: "Masukkan judul kajian..."
                  }
                ),
                form.errors.title && /* @__PURE__ */ jsx("div", { className: "form-error", children: form.errors.title })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "form-field", children: [
                /* @__PURE__ */ jsx("label", { children: "Kategori" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: form.data.category_id,
                    onChange: (event) => form.setData(
                      "category_id",
                      event.target.value
                    ),
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "Pilih kategori" }),
                      categories.map(
                        (category) => /* @__PURE__ */ jsx(
                          "option",
                          {
                            value: category.id,
                            children: category.name
                          },
                          category.id
                        )
                      )
                    ]
                  }
                ),
                form.errors.category_id && /* @__PURE__ */ jsx("div", { className: "form-error", children: form.errors.category_id })
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
                  /* @__PURE__ */ jsx("div", { className: "keyword-tags", children: keywords.map(
                    (keyword) => /* @__PURE__ */ jsxs(
                      "span",
                      {
                        className: "keyword-tag",
                        children: [
                          /* @__PURE__ */ jsx("span", { children: keyword }),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => removeKeyword(
                                keyword
                              ),
                              children: "×"
                            }
                          )
                        ]
                      },
                      keyword
                    )
                  ) }),
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
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-section", children: [
              /* @__PURE__ */ jsxs("div", { className: "form-section__heading", children: [
                /* @__PURE__ */ jsx("span", { children: "02" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h2", { children: "Ringkasan" }),
                  /* @__PURE__ */ jsx("p", { children: "Tambahkan cover dan ringkasan singkat." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "form-field", children: [
                /* @__PURE__ */ jsx("label", { children: "Cover Kajian" }),
                coverPreview && /* @__PURE__ */ jsx("div", { className: "cover-preview", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: coverPreview,
                    alt: "Preview cover"
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "admin-image-upload", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "study-cover",
                      type: "file",
                      accept: "image/jpeg,image/png,image/webp",
                      className: "admin-image-upload__input",
                      onChange: handleCoverChange
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "label",
                    {
                      htmlFor: "study-cover",
                      className: "admin-image-upload__box",
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "admin-image-upload__icon", children: "↑" }),
                        /* @__PURE__ */ jsxs("div", { className: "admin-image-upload__text", children: [
                          /* @__PURE__ */ jsx("strong", { children: "Pilih cover kajian" }),
                          /* @__PURE__ */ jsx("span", { children: "JPG, PNG, atau WebP" })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "admin-image-upload__button", children: "Pilih Gambar" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("small", { className: "admin-form-help", children: "Maksimal 2 MB · Disarankan menggunakan gambar landscape." }),
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
                    ),
                    placeholder: "Jelaskan secara singkat isi kajian..."
                  }
                ),
                /* @__PURE__ */ jsx("small", { children: "Maksimal 500 karakter." }),
                form.errors.excerpt && /* @__PURE__ */ jsx("div", { className: "form-error", children: form.errors.excerpt })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-section study-editor-section", children: [
              /* @__PURE__ */ jsxs("div", { className: "form-section__heading", children: [
                /* @__PURE__ */ jsx("span", { children: "03" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h2", { children: "Isi Kajian" }),
                  /* @__PURE__ */ jsxs("p", { children: [
                    "Tulis kajian seperti dokumen profesional. Ketik ",
                    /* @__PURE__ */ jsx("strong", { children: "/" }),
                    "untuk menambahkan blok."
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "form-field", children: [
                /* @__PURE__ */ jsx("label", { children: "Isi Kajian" }),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "study-editor-shell",
                    onKeyDown: handleEditorKeyDown,
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "study-editor-toolbar", children: [
                        /* @__PURE__ */ jsxs(
                          "button",
                          {
                            type: "button",
                            className: "study-add-block",
                            onClick: () => {
                              setShowBlockMenu(
                                (value) => !value
                              );
                              setShowSlashMenu(
                                false
                              );
                            },
                            children: [
                              /* @__PURE__ */ jsx("span", { children: "+" }),
                              "Tambahkan blok"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxs("div", { className: "study-editor-hint", children: [
                          "Ketik ",
                          /* @__PURE__ */ jsx("kbd", { children: "/" }),
                          " untuk command"
                        ] })
                      ] }),
                      showBlockMenu && /* @__PURE__ */ jsxs("div", { className: "study-command-menu study-command-menu--button", children: [
                        /* @__PURE__ */ jsxs("div", { className: "study-command-menu__tabs", children: [
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              className: activeMenu === "PRIMARY" ? "is-active" : "",
                              onClick: () => setActiveMenu(
                                "PRIMARY"
                              ),
                              children: "PRIMARY"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              className: activeMenu === "EMBED" ? "is-active" : "",
                              onClick: () => setActiveMenu(
                                "EMBED"
                              ),
                              children: "EMBED"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "study-command-menu__items", children: COMMANDS.filter(
                          (command) => command.group === activeMenu
                        ).map(
                          (command) => /* @__PURE__ */ jsxs(
                            "button",
                            {
                              type: "button",
                              className: "study-command-item",
                              onClick: () => executeCommand(
                                command
                              ),
                              children: [
                                /* @__PURE__ */ jsx("span", { className: "study-command-item__icon", children: command.icon }),
                                /* @__PURE__ */ jsxs("span", { className: "study-command-item__text", children: [
                                  /* @__PURE__ */ jsx("strong", { children: command.label }),
                                  /* @__PURE__ */ jsx("small", { children: command.description })
                                ] })
                              ]
                            },
                            command.type
                          )
                        ) })
                      ] }),
                      showSlashMenu && /* @__PURE__ */ jsxs(
                        "div",
                        {
                          className: "study-command-menu study-command-menu--slash",
                          style: {
                            top: `${slashMenuPosition.top}px`,
                            left: `${slashMenuPosition.left}px`
                          },
                          children: [
                            /* @__PURE__ */ jsx("div", { className: "study-command-menu__label", children: slashQuery ? `COMMAND /${slashQuery}` : "COMMAND" }),
                            /* @__PURE__ */ jsx("div", { className: "study-command-menu__items", children: filteredCommands.length === 0 ? /* @__PURE__ */ jsx("div", { className: "study-command-empty", children: "Tidak ada block yang cocok." }) : filteredCommands.map(
                              (command, index) => /* @__PURE__ */ jsxs(
                                "button",
                                {
                                  type: "button",
                                  className: `study-command-item ${index === selectedCommand ? "is-selected" : ""}`,
                                  onMouseDown: (event) => {
                                    event.preventDefault();
                                    executeCommand(
                                      command
                                    );
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
                              )
                            ) })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          ref: editorRef,
                          className: "study-editor"
                        }
                      )
                    ]
                  }
                ),
                (uploadingImage || uploadingPdf || uploadingGallery) && /* @__PURE__ */ jsxs("div", { className: "editor-upload-status", children: [
                  uploadingImage && "Mengupload gambar...",
                  uploadingPdf && "Mengupload PDF...",
                  uploadingGallery && "Mengupload gallery..."
                ] }),
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
                  children: submitAction === "draft" ? "Menyimpan..." : "Simpan sebagai Draft"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "dashboard-primary-button",
                  onClick: handleSubmitForReview,
                  disabled: form.processing || uploadingImage || uploadingPdf || uploadingGallery,
                  children: submitAction === "review" ? "Mengajukan..." : "Ajukan Kajian"
                }
              )
            ] })
          ]
        }
      ),
      editorModal.open && /* @__PURE__ */ jsx(
        "div",
        {
          className: "study-editor-modal__overlay",
          onMouseDown: (event) => {
            if (event.target === event.currentTarget) {
              closeEditorModal();
            }
          },
          children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: "study-editor-modal",
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": "study-editor-modal-title",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "study-editor-modal__header", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "EDITOR" }),
                    /* @__PURE__ */ jsx("h2", { id: "study-editor-modal-title", children: editorModal.title })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      className: "study-editor-modal__close",
                      onClick: closeEditorModal,
                      "aria-label": "Tutup",
                      children: "×"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "study-editor-modal__body", children: [
                  editorModal.type === "callout" && /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsxs("div", { className: "study-editor-modal__field", children: [
                      /* @__PURE__ */ jsx("label", { children: "Judul Callout" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: editorModal.fields.title ?? "",
                          onChange: (event) => setEditorModal((current) => ({
                            ...current,
                            fields: {
                              ...current.fields,
                              title: event.target.value
                            }
                          })),
                          placeholder: "Catatan",
                          autoFocus: true
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "study-editor-modal__field", children: [
                      /* @__PURE__ */ jsx("label", { children: "Isi Callout" }),
                      /* @__PURE__ */ jsx(
                        "textarea",
                        {
                          rows: "5",
                          value: editorModal.fields.text ?? "",
                          onChange: (event) => setEditorModal((current) => ({
                            ...current,
                            fields: {
                              ...current.fields,
                              text: event.target.value
                            }
                          })),
                          placeholder: "Tulis informasi yang ingin ditonjolkan..."
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "study-editor-modal__field", children: [
                      /* @__PURE__ */ jsx("label", { children: "Tipe" }),
                      /* @__PURE__ */ jsxs(
                        "select",
                        {
                          value: editorModal.fields.variant ?? "info",
                          onChange: (event) => setEditorModal((current) => ({
                            ...current,
                            fields: {
                              ...current.fields,
                              variant: event.target.value
                            }
                          })),
                          children: [
                            /* @__PURE__ */ jsx("option", { value: "info", children: "Informasi" }),
                            /* @__PURE__ */ jsx("option", { value: "warning", children: "Peringatan" }),
                            /* @__PURE__ */ jsx("option", { value: "success", children: "Sukses" }),
                            /* @__PURE__ */ jsx("option", { value: "important", children: "Penting" })
                          ]
                        }
                      )
                    ] })
                  ] }),
                  editorModal.type === "video" && /* @__PURE__ */ jsxs("div", { className: "study-editor-modal__field", children: [
                    /* @__PURE__ */ jsx("label", { children: editorModal.fields.preset === "youtube" ? "URL YouTube" : editorModal.fields.preset === "vimeo" ? "URL Vimeo" : editorModal.fields.preset === "embed" ? "URL Embed" : "URL Video" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "url",
                        value: editorModal.fields.url ?? "",
                        onChange: (event) => setEditorModal((current) => ({
                          ...current,
                          fields: {
                            ...current.fields,
                            url: event.target.value
                          }
                        })),
                        placeholder: "https://...",
                        autoFocus: true
                      }
                    ),
                    /* @__PURE__ */ jsx("small", { children: "Masukkan URL video yang ingin ditampilkan." })
                  ] }),
                  editorModal.type === "embed" && /* @__PURE__ */ jsxs("div", { className: "study-editor-modal__field", children: [
                    /* @__PURE__ */ jsx("label", { children: editorModal.fields.preset === "github" ? "URL Repository GitHub" : editorModal.fields.preset === "gitlab" ? "URL Repository GitLab" : "URL Embed" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "url",
                        value: editorModal.fields.url ?? "",
                        onChange: (event) => setEditorModal((current) => ({
                          ...current,
                          fields: {
                            ...current.fields,
                            url: event.target.value
                          }
                        })),
                        placeholder: "https://...",
                        autoFocus: true
                      }
                    ),
                    /* @__PURE__ */ jsx("small", { children: editorModal.fields.preset === "github" ? "Masukkan URL repository GitHub." : editorModal.fields.preset === "gitlab" ? "Masukkan URL repository GitLab." : "Masukkan URL yang ingin di-embed ke dalam kajian." })
                  ] }),
                  editorModal.type === "button" && /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsxs("div", { className: "study-editor-modal__field", children: [
                      /* @__PURE__ */ jsx("label", { children: "Teks Tombol" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: editorModal.fields.label ?? "",
                          onChange: (event) => setEditorModal((current) => ({
                            ...current,
                            fields: {
                              ...current.fields,
                              label: event.target.value
                            }
                          })),
                          placeholder: "Lihat Selengkapnya",
                          autoFocus: true
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "study-editor-modal__field", children: [
                      /* @__PURE__ */ jsx("label", { children: "URL Tujuan" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "url",
                          value: editorModal.fields.url ?? "",
                          onChange: (event) => setEditorModal((current) => ({
                            ...current,
                            fields: {
                              ...current.fields,
                              url: event.target.value
                            }
                          })),
                          placeholder: "https://..."
                        }
                      )
                    ] })
                  ] }),
                  editorModal.type === "image" && /* @__PURE__ */ jsxs("div", { className: "study-editor-modal__field", children: [
                    /* @__PURE__ */ jsx("label", { children: "Deskripsi Gambar" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: editorModal.fields.alt ?? "",
                        onChange: (event) => setEditorModal((current) => ({
                          ...current,
                          fields: {
                            ...current.fields,
                            alt: event.target.value
                          }
                        })),
                        placeholder: "Jelaskan isi gambar...",
                        autoFocus: true
                      }
                    ),
                    /* @__PURE__ */ jsx("small", { children: "Digunakan untuk aksesibilitas dan SEO." })
                  ] }),
                  !["callout", "video", "button", "image"].includes(
                    editorModal.type
                  ) && /* @__PURE__ */ jsx("p", { children: "Formulir blok belum tersedia." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "study-editor-modal__footer", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      className: "study-secondary-button",
                      onClick: closeEditorModal,
                      children: "Batal"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      className: "dashboard-primary-button",
                      onClick: () => {
                        var _a2, _b, _c, _d;
                        if (editorModal.type === "callout") {
                          insertCallout({
                            title: editorModal.fields.title,
                            text: editorModal.fields.text,
                            variant: editorModal.fields.variant
                          });
                          closeEditorModal();
                          return;
                        }
                        if (editorModal.type === "video") {
                          if (!((_a2 = editorModal.fields.url) == null ? void 0 : _a2.trim())) {
                            return;
                          }
                          insertVideo({
                            url: editorModal.fields.url,
                            preset: editorModal.fields.preset || "video"
                          });
                          closeEditorModal();
                          return;
                        }
                        if (editorModal.type === "embed") {
                          if (!((_b = editorModal.fields.url) == null ? void 0 : _b.trim())) {
                            return;
                          }
                          insertEmbed({
                            url: editorModal.fields.url,
                            type: editorModal.fields.preset || "url"
                          });
                          closeEditorModal();
                          return;
                        }
                        if (editorModal.type === "button") {
                          if (!((_c = editorModal.fields.url) == null ? void 0 : _c.trim())) {
                            return;
                          }
                          insertButton({
                            label: editorModal.fields.label || "Lihat Selengkapnya",
                            url: editorModal.fields.url
                          });
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
                          data.append(
                            "image",
                            file
                          );
                          fetch(
                            "/user/studies/content-image",
                            {
                              method: "POST",
                              headers: {
                                "X-CSRF-TOKEN": (_d = document.querySelector(
                                  'meta[name="csrf-token"]'
                                )) == null ? void 0 : _d.getAttribute(
                                  "content"
                                ),
                                Accept: "application/json"
                              },
                              body: data
                            }
                          ).then(async (response) => {
                            var _a3;
                            const result = await response.json();
                            if (!response.ok || !result.success) {
                              throw new Error(
                                result.message || "Gagal mengupload gambar."
                              );
                            }
                            insertImage(
                              result.url,
                              ((_a3 = editorModal.fields.alt) == null ? void 0 : _a3.trim()) || "Ilustrasi kajian Big Data BPS"
                            );
                            setPendingImage(null);
                            closeEditorModal();
                          }).catch((error) => {
                            console.error(error);
                            alert(
                              error.message || "Gagal mengupload gambar."
                            );
                          }).finally(() => {
                            setUploadingImage(false);
                          });
                          return;
                        }
                      },
                      children: "Tambahkan"
                    }
                  )
                ] })
              ]
            }
          )
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
                    /* @__PURE__ */ jsx("div", { className: "study-public-preview__category", children: ((_a = categories.find(
                      (category) => String(category.id) === String(form.data.category_id)
                    )) == null ? void 0 : _a.name) || "Kategori" }),
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
                "iframe",
                {
                  className: "study-public-preview__content",
                  title: "Pratinjau isi kajian",
                  sandbox: "",
                  srcDoc: form.data.content || "<p>Belum ada isi kajian.</p>"
                }
              )
            ] })
          ] })
        }
      )
    ] }),
    showSubmitConfirm && /* @__PURE__ */ jsx(
      "div",
      {
        className: "study-confirm-overlay",
        onClick: () => setShowSubmitConfirm(false),
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "study-confirm-modal",
            onClick: (event) => event.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "study-confirm-header", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "study-confirm-label", children: "KONFIRMASI" }),
                  /* @__PURE__ */ jsx("h2", { children: "Ajukan Kajian?" })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    className: "study-confirm-close",
                    onClick: () => setShowSubmitConfirm(false),
                    "aria-label": "Tutup",
                    children: "×"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "study-confirm-body", children: "Kajian akan diajukan untuk proses review." }),
              /* @__PURE__ */ jsxs("div", { className: "study-confirm-actions", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    className: "study-confirm-cancel",
                    onClick: () => setShowSubmitConfirm(false),
                    children: "Batal"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    className: "study-confirm-submit",
                    onClick: confirmSubmitForReview,
                    children: "Ya, Ajukan"
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
export {
  Create as default
};
