import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { createPortal } from "react-dom";
import { useState, useRef, useEffect } from "react";
import { P as PublicLayout } from "./PublicLayout-WfD6WHc7.js";
import { u as useFeedback } from "./FeedbackProvider-Chsn1HxW.js";
import { u as useLanguage } from "../ssr.js";
import { usePage, useForm, Head, router } from "@inertiajs/react";
import "./BpsLogo-CvcnsC1A.js";
import "@inertiajs/react/server";
import "react-dom/server";
function StudyDetail({
  study,
  seo,
  totalViews,
  uniqueVisitors,
  totalLikes,
  hasLiked,
  comments,
  totalComments,
  recommendedStudies
}) {
  var _a, _b, _c, _d, _e, _f, _g;
  const { t } = useLanguage();
  const {
    showToast
  } = useFeedback();
  const { auth } = usePage().props;
  console.log("STUDY DETAIL:", study);
  (seo == null ? void 0 : seo.description) || ((_a = study.excerpt) == null ? void 0 : _a.trim()) || `Kajian ${study.title} dari Kajian Big Data BPS.`;
  (seo == null ? void 0 : seo.image) ?? null;
  (seo == null ? void 0 : seo.url) ?? `/kajian/${study.slug}`;
  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareButtonRef = useRef(null);
  const [shareMenuPosition, setShareMenuPosition] = useState({
    top: 0,
    left: 0
  });
  const updateShareMenuPosition = () => {
    const button = shareButtonRef.current;
    if (!button) {
      return;
    }
    const rect = button.getBoundingClientRect();
    setShareMenuPosition({
      top: rect.bottom + 8,
      left: rect.left
    });
  };
  useEffect(() => {
    if (!showShareMenu) {
      return;
    }
    updateShareMenuPosition();
    const handleScroll = () => {
      updateShareMenuPosition();
    };
    const handleResize = () => {
      updateShareMenuPosition();
    };
    window.addEventListener(
      "scroll",
      handleScroll,
      true
    );
    window.addEventListener(
      "resize",
      handleResize
    );
    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
        true
      );
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [showShareMenu]);
  const shareStudy = async (platform) => {
    const url = window.location.href;
    const title = study.title;
    if (platform === "copy") {
      try {
        await navigator.clipboard.writeText(url);
        router.post(
          `/kajian/${study.slug}/share`,
          {
            platform: "copy"
          },
          {
            preserveScroll: true,
            preserveState: true
          }
        );
        showToast(
          "Link kajian berhasil disalin.",
          "success"
        );
      } catch (error) {
        showToast(
          "Link kajian gagal disalin.",
          "error"
        );
      }
      return;
    }
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(
        `${title}
${url}`
      )}`,
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`
    };
    router.post(
      `/kajian/${study.slug}/share`,
      {
        platform
      },
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
          window.open(
            shareUrls[platform],
            "_blank",
            "noopener,noreferrer"
          );
        }
      }
    );
    setShowShareMenu(false);
  };
  const toggleLike = () => {
    router.post(
      `/kajian/${study.slug}/like`,
      {},
      {
        preserveScroll: true
      }
    );
  };
  const commentForm = useForm({
    comment: ""
  });
  const submitComment = (event) => {
    event.preventDefault();
    commentForm.post(
      `/kajian/${study.slug}/comment`,
      {
        preserveScroll: true,
        onSuccess: () => {
          commentForm.reset("comment");
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: seo.title }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "description",
          name: "description",
          content: seo.description
        }
      ),
      /* @__PURE__ */ jsx(
        "link",
        {
          "head-key": "canonical",
          rel: "canonical",
          href: seo.url
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "og:title",
          property: "og:title",
          content: seo.title
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "og:description",
          property: "og:description",
          content: seo.description
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "og:type",
          property: "og:type",
          content: "article"
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "og:url",
          property: "og:url",
          content: seo.url
        }
      ),
      seo.image && /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "og:image",
          property: "og:image",
          content: seo.image
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "twitter:card",
          name: "twitter:card",
          content: seo.image ? "summary_large_image" : "summary"
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "twitter:title",
          name: "twitter:title",
          content: seo.title
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "twitter:description",
          name: "twitter:description",
          content: seo.description
        }
      ),
      seo.image && /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "twitter:image",
          name: "twitter:image",
          content: seo.image
        }
      ),
      /* @__PURE__ */ jsx(
        "script",
        {
          type: "application/ld+json",
          dangerouslySetInnerHTML: {
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: study.title,
              description: seo.description,
              image: seo.image ? [seo.image] : void 0,
              datePublished: study.published_at || study.created_at,
              dateModified: study.published_at && study.updated_at && new Date(study.updated_at) < new Date(study.published_at) ? study.published_at : study.updated_at || study.published_at || study.created_at,
              author: {
                "@type": "Person",
                name: ((_b = study.user) == null ? void 0 : _b.name) || "Kajian Big Data BPS"
              },
              publisher: {
                "@type": "Organization",
                name: "Badan Pusat Statistik"
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": seo.url
              },
              keywords: (_c = study.keywords) == null ? void 0 : _c.map((keyword) => keyword.name).join(", "),
              articleSection: ((_d = study.category) == null ? void 0 : _d.name) || "Kajian Big Data"
            })
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "detail-page", children: [
      /* @__PURE__ */ jsxs(
        "section",
        {
          className: "detail-hero",
          style: study.cover_image ? {
            backgroundImage: `url('/storage/${study.cover_image}')`
          } : void 0,
          children: [
            /* @__PURE__ */ jsx("div", { className: "detail-hero__overlay" }),
            /* @__PURE__ */ jsxs("div", { className: "detail-container detail-hero__container", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "/kajian",
                  className: "detail-hero__back",
                  children: "← Kembali ke Kajian"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "detail-hero__category", children: ((_e = study.category) == null ? void 0 : _e.name) ?? "KAJIAN" }),
              /* @__PURE__ */ jsx("h1", { className: "detail-hero__title", children: study.title }),
              /* @__PURE__ */ jsxs("div", { className: "detail-hero__meta", children: [
                /* @__PURE__ */ jsx("span", { children: new Date(
                  study.published_at || study.created_at
                ).toLocaleDateString(
                  "id-ID",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  }
                ) }),
                /* @__PURE__ */ jsx("span", { children: "•" }),
                /* @__PURE__ */ jsx("span", { children: "Kajian Big Data BPS" }),
                /* @__PURE__ */ jsx("span", { children: "•" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "👁 ",
                  Number(totalViews).toLocaleString("id-ID"),
                  " views"
                ] }),
                /* @__PURE__ */ jsx("span", { children: "•" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "👥 ",
                  Number(uniqueVisitors).toLocaleString("id-ID"),
                  " pengunjung"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "detail-hero__engagement", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    className: `detail-like ${hasLiked ? "detail-like--active" : ""}`,
                    onClick: toggleLike,
                    children: [
                      /* @__PURE__ */ jsx("span", { children: hasLiked ? "♥" : "♡" }),
                      /* @__PURE__ */ jsx("span", { children: Number(totalLikes).toLocaleString("id-ID") }),
                      /* @__PURE__ */ jsx("span", { children: "suka" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "detail-share-wrapper", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      ref: shareButtonRef,
                      type: "button",
                      className: "detail-share",
                      onClick: () => {
                        if (!showShareMenu) {
                          updateShareMenuPosition();
                        }
                        setShowShareMenu(
                          !showShareMenu
                        );
                      },
                      children: "↗ Bagikan"
                    }
                  ),
                  showShareMenu && shareButtonRef.current && createPortal(
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: "detail-share-menu detail-share-menu--portal",
                        style: {
                          position: "fixed",
                          top: shareMenuPosition.top,
                          left: shareMenuPosition.left
                        },
                        children: [
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => shareStudy("whatsapp"),
                              children: "WhatsApp"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => shareStudy("x"),
                              children: "X"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => shareStudy("linkedin"),
                              children: "LinkedIn"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => shareStudy("copy"),
                              children: "Salin Link"
                            }
                          )
                        ]
                      }
                    ),
                    document.body
                  )
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx("section", { className: "detail-content-section", children: /* @__PURE__ */ jsxs("div", { className: "detail-container detail-reading", children: [
        study.excerpt && /* @__PURE__ */ jsx("div", { className: "detail-excerpt", children: study.excerpt }),
        ((_f = study.keywords) == null ? void 0 : _f.length) > 0 && /* @__PURE__ */ jsxs("div", { className: "detail-keywords", children: [
          /* @__PURE__ */ jsx("div", { className: "detail-keywords__label", children: "Kata Kunci" }),
          /* @__PURE__ */ jsx("div", { className: "detail-keywords__list", children: study.keywords.map((keyword) => /* @__PURE__ */ jsx(
            "a",
            {
              href: `/kajian?search=${encodeURIComponent(
                keyword.name
              )}`,
              className: "detail-keyword",
              children: keyword.name
            },
            keyword.id
          )) })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "detail-content",
            dangerouslySetInnerHTML: {
              __html: study.content
            }
          }
        ),
        /* @__PURE__ */ jsxs("section", { className: "detail-comments", children: [
          /* @__PURE__ */ jsxs("div", { className: "detail-comments__header", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "detail-eyebrow", children: "DISKUSI" }),
              /* @__PURE__ */ jsx("h2", { children: "Komentar" })
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              Number(totalComments).toLocaleString("id-ID"),
              " komentar"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "detail-comment-form", children: (auth == null ? void 0 : auth.user) ? /* @__PURE__ */ jsxs("form", { onSubmit: submitComment, children: [
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: commentForm.data.comment,
                onChange: (event) => commentForm.setData(
                  "comment",
                  event.target.value
                ),
                rows: "5",
                placeholder: t.studyDetail.commentPlaceholder
              }
            ),
            commentForm.errors.comment && /* @__PURE__ */ jsx("div", { className: "form-error", children: commentForm.errors.comment }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "dashboard-primary-button",
                disabled: commentForm.processing,
                children: commentForm.processing ? "Mengirim..." : "Kirim Komentar"
              }
            )
          ] }) : /* @__PURE__ */ jsxs("div", { className: "detail-comment-login", children: [
            /* @__PURE__ */ jsx("p", { children: "Masuk untuk memberikan komentar pada kajian ini." }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "/login",
                className: "dashboard-primary-button",
                children: "Masuk"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "detail-comment-list", children: ((_g = comments == null ? void 0 : comments.data) == null ? void 0 : _g.length) > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
            comments.data.map((comment) => {
              var _a2, _b2, _c2, _d2;
              return /* @__PURE__ */ jsxs(
                "article",
                {
                  className: "detail-comment",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "detail-comment__avatar", children: ((_c2 = (_b2 = (_a2 = comment.user) == null ? void 0 : _a2.name) == null ? void 0 : _b2.charAt(0)) == null ? void 0 : _c2.toUpperCase()) ?? "U" }),
                    /* @__PURE__ */ jsxs("div", { className: "detail-comment__body", children: [
                      /* @__PURE__ */ jsxs("div", { className: "detail-comment__meta", children: [
                        /* @__PURE__ */ jsx("strong", { children: ((_d2 = comment.user) == null ? void 0 : _d2.name) ?? "Pengguna" }),
                        /* @__PURE__ */ jsx("span", { children: comment.created_at ? new Date(
                          comment.created_at
                        ).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                          }
                        ) : "" })
                      ] }),
                      /* @__PURE__ */ jsx("p", { children: comment.comment })
                    ] })
                  ]
                },
                comment.id
              );
            }),
            comments.last_page > 1 && /* @__PURE__ */ jsxs("div", { className: "detail-comments-pagination", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  disabled: !comments.prev_page_url,
                  onClick: () => {
                    if (comments.prev_page_url) {
                      router.get(
                        comments.prev_page_url,
                        {},
                        {
                          preserveScroll: true,
                          preserveState: true
                        }
                      );
                    }
                  },
                  children: "← Sebelumnya"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "detail-comments-pagination__pages", children: Array.from(
                {
                  length: comments.last_page
                },
                (_, index) => index + 1
              ).map((page) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: page === comments.current_page ? "is-active" : "",
                  onClick: () => {
                    if (page !== comments.current_page) {
                      router.get(
                        comments.path + `?page=${page}`,
                        {},
                        {
                          preserveScroll: true,
                          preserveState: true
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
                  disabled: !comments.next_page_url,
                  onClick: () => {
                    if (comments.next_page_url) {
                      router.get(
                        comments.next_page_url,
                        {},
                        {
                          preserveScroll: true,
                          preserveState: true
                        }
                      );
                    }
                  },
                  children: "Berikutnya →"
                }
              )
            ] })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "detail-comments-empty", children: [
            /* @__PURE__ */ jsx("h3", { children: "Belum ada komentar" }),
            /* @__PURE__ */ jsx("p", { children: "Jadilah orang pertama yang memberikan tanggapan pada kajian ini." })
          ] }) })
        ] })
      ] }) }),
      (recommendedStudies == null ? void 0 : recommendedStudies.length) > 0 && /* @__PURE__ */ jsx("section", { className: "detail-recommendations", children: /* @__PURE__ */ jsxs("div", { className: "detail-container", children: [
        /* @__PURE__ */ jsx("div", { className: "detail-recommendations__header", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "detail-eyebrow", children: "BACA JUGA" }),
          /* @__PURE__ */ jsx("h2", { children: "Kajian yang Relevan" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "detail-recommendations__grid", children: recommendedStudies.map((recommended) => {
          var _a2;
          return /* @__PURE__ */ jsxs(
            "a",
            {
              href: `/kajian/${recommended.slug}`,
              className: "detail-recommendation-card",
              children: [
                /* @__PURE__ */ jsx("div", { className: "detail-recommendation-card__image", children: recommended.cover_image ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: `/storage/${recommended.cover_image}`,
                    alt: recommended.title
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "detail-recommendation-card__placeholder" }) }),
                /* @__PURE__ */ jsxs("div", { className: "detail-recommendation-card__content", children: [
                  /* @__PURE__ */ jsx("span", { children: ((_a2 = recommended.category) == null ? void 0 : _a2.name) ?? "Kajian" }),
                  /* @__PURE__ */ jsx("h3", { children: recommended.title }),
                  /* @__PURE__ */ jsx("p", { children: recommended.excerpt }),
                  /* @__PURE__ */ jsx("strong", { children: "Baca Kajian →" })
                ] })
              ]
            },
            recommended.id
          );
        }) })
      ] }) })
    ] })
  ] });
}
export {
  StudyDetail as default
};
