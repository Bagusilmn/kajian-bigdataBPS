import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { u as useLanguage, P as PublicLayout } from "./PublicLayout-CV7vGuTx.js";
import { Head } from "@inertiajs/react";
import { S as StudyCard } from "./StudyCard-Cvwsc5ty.js";
import "./BpsLogo-CvcnsC1A.js";
function TopicCard({ category, index }) {
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: `/kajian?category=${category.id}`,
      className: "topic-card",
      children: [
        /* @__PURE__ */ jsx("div", { className: "topic-card__image", children: category.image ? /* @__PURE__ */ jsx(
          "img",
          {
            src: `/storage/${category.image}`,
            alt: category.name
          }
        ) : /* @__PURE__ */ jsx("div", { className: "topic-card__placeholder" }) }),
        /* @__PURE__ */ jsx("div", { className: "topic-card__overlay" }),
        /* @__PURE__ */ jsxs("div", { className: "topic-card__content", children: [
          /* @__PURE__ */ jsx("span", { className: "topic-card__number", children: String(index + 1).padStart(2, "0") }),
          /* @__PURE__ */ jsx("h3", { className: "topic-card__title", children: category.name }),
          /* @__PURE__ */ jsxs("div", { className: "topic-card__bottom", children: [
            /* @__PURE__ */ jsxs("span", { className: "topic-card__count", children: [
              category.studies_count ?? 0,
              " kajian"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "topic-card__arrow", children: "→" })
          ] })
        ] })
      ]
    }
  );
}
function Home({
  popularStudies,
  latestStudies,
  categories
}) {
  var _a;
  const { language, t } = useLanguage();
  const [activePopular, setActivePopular] = useState(0);
  useEffect(() => {
    if (!(popularStudies == null ? void 0 : popularStudies.length) || popularStudies.length <= 1) {
      return;
    }
    const timer = setInterval(() => {
      setActivePopular(
        (current) => (current + 1) % popularStudies.length
      );
    }, 5e3);
    return () => clearInterval(timer);
  }, [popularStudies]);
  const currentPopular = (popularStudies == null ? void 0 : popularStudies[activePopular]) ?? null;
  const seoTitle = "Kajian Big Data BPS | Badan Pusat Statistik";
  const seoDescription = "Temukan kajian, analisis, metode, dan pemanfaatan Big Data yang mendukung pengembangan statistik resmi di Badan Pusat Statistik.";
  const seoUrl = typeof window !== "undefined" ? `${window.location.origin}/` : "/";
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: seoTitle }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "description",
          name: "description",
          content: seoDescription
        }
      ),
      /* @__PURE__ */ jsx(
        "link",
        {
          "head-key": "canonical",
          rel: "canonical",
          href: seoUrl
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "og:title",
          property: "og:title",
          content: seoTitle
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "og:description",
          property: "og:description",
          content: seoDescription
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "og:type",
          property: "og:type",
          content: "website"
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "og:url",
          property: "og:url",
          content: seoUrl
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "twitter:card",
          name: "twitter:card",
          content: "summary"
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "twitter:title",
          name: "twitter:title",
          content: seoTitle
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "twitter:description",
          name: "twitter:description",
          content: seoDescription
        }
      ),
      /* @__PURE__ */ jsx(
        "script",
        {
          type: "application/ld+json",
          dangerouslySetInnerHTML: {
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Kajian Big Data BPS",
              url: seoUrl,
              description: seoDescription,
              publisher: {
                "@type": "Organization",
                name: "Badan Pusat Statistik"
              }
            })
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "home-page", children: [
      /* @__PURE__ */ jsx("section", { className: "home-hero", children: /* @__PURE__ */ jsxs("div", { className: "home-hero__grid", children: [
        /* @__PURE__ */ jsxs("div", { className: "home-hero__content", children: [
          /* @__PURE__ */ jsx("div", { className: "home-eyebrow", children: t.home.eyebrow }),
          /* @__PURE__ */ jsxs("h1", { children: [
            t.home.heroTitle,
            /* @__PURE__ */ jsx("span", { children: t.home.heroTitleHighlight })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "home-hero__description", children: t.home.heroDescription }),
          /* @__PURE__ */ jsx("div", { className: "home-hero__actions", children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: "/kajian",
              className: "home-button home-button--primary",
              children: [
                t.home.exploreStudies,
                " →"
              ]
            }
          ) })
        ] }),
        currentPopular && /* @__PURE__ */ jsxs("div", { className: "home-featured", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: `/kajian/${currentPopular.slug}`,
              className: "home-featured-link",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "home-featured__image", children: [
                  currentPopular.cover_image ? /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: currentPopular.cover_image.startsWith("http") ? currentPopular.cover_image : `/storage/${currentPopular.cover_image.replace(/^\/+/, "").replace(/^storage\//, "")}`,
                      alt: currentPopular.title
                    }
                  ) : /* @__PURE__ */ jsx("div", { className: "home-featured__placeholder" }),
                  /* @__PURE__ */ jsx("span", { className: "home-featured-label", children: t.home.popularStudy })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "home-featured__content", children: [
                  /* @__PURE__ */ jsx("div", { className: "home-featured__category", children: ((_a = currentPopular.category) == null ? void 0 : _a.name) ?? "KAJIAN" }),
                  /* @__PURE__ */ jsx("h2", { className: "home-featured__title", children: currentPopular.title }),
                  currentPopular.excerpt && /* @__PURE__ */ jsx("p", { className: "home-featured__excerpt", children: currentPopular.excerpt })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "home-featured__navigation", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "home-featured__arrow",
                onClick: () => {
                  setActivePopular(
                    (current) => current === 0 ? popularStudies.length - 1 : current - 1
                  );
                },
                "aria-label": t.home.previousStudy,
                children: "←"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "home-featured__dots", children: popularStudies.map((study, index) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: `home-featured__dot ${index === activePopular ? "is-active" : ""}`,
                onClick: () => {
                  setActivePopular(index);
                },
                "aria-label": `${t.home.study} ${index + 1}`
              },
              study.id
            )) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "home-featured__arrow",
                onClick: () => {
                  setActivePopular(
                    (current) => (current + 1) % popularStudies.length
                  );
                },
                "aria-label": t.home.nextStudy,
                children: "→"
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "home-latest", children: [
        /* @__PURE__ */ jsxs("div", { className: "home-section-header", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "home-section-eyebrow", children: t.home.explore }),
            /* @__PURE__ */ jsx("h2", { className: "home-section-title", children: t.home.latestStudies })
          ] }),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "/kajian",
              className: "home-section-link",
              children: [
                t.home.seeAll,
                " →"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "home-latest-slider", children: latestStudies == null ? void 0 : latestStudies.map((study) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "home-latest-slider__item",
            children: /* @__PURE__ */ jsx(StudyCard, { study })
          },
          study.id
        )) })
      ] }),
      /* @__PURE__ */ jsxs(
        "section",
        {
          id: "topics",
          className: "home-topics",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "home-topics__header", children: [
              /* @__PURE__ */ jsx("div", { className: "home-topics__eyebrow", children: t.home.exploreByTopic }),
              /* @__PURE__ */ jsx("h2", { className: "home-topics__title", children: t.home.focusStudies }),
              /* @__PURE__ */ jsx("p", { className: "home-topics__description", children: t.home.focusDescription })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "topic-grid", children: categories == null ? void 0 : categories.map((category, index) => /* @__PURE__ */ jsx(
              TopicCard,
              {
                category,
                index
              },
              category.id
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsx("section", { className: "home-statement", children: /* @__PURE__ */ jsxs("div", { className: "home-statement__inner", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "home-statement__eyebrow", children: t.home.bigDataBps }),
          /* @__PURE__ */ jsxs("h2", { children: [
            t.home.dataNotOnly,
            /* @__PURE__ */ jsx("span", { children: t.home.numbers })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { children: t.home.statement })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "home-cta", children: /* @__PURE__ */ jsxs("div", { className: "home-cta__box", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "home-cta__eyebrow", children: t.home.knowledgeCenter }),
          /* @__PURE__ */ jsxs("h2", { children: [
            t.home.findRelevant,
            /* @__PURE__ */ jsx("span", { children: t.home.withYourNeeds })
          ] }),
          /* @__PURE__ */ jsx("p", { children: t.home.ctaDescription })
        ] }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/kajian",
            className: "home-button home-button--primary",
            children: t.home.ctaDescription
          }
        )
      ] }) })
    ] })
  ] });
}
export {
  Home as default
};
