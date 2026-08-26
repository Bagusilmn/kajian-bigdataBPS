import { jsxs, jsx } from "react/jsx-runtime";
import { P as PublicLayout } from "./PublicLayout-C3vlCbjw.js";
import { Head } from "@inertiajs/react";
import { S as StudyCard } from "./StudyCard-Gk9iry7L.js";
import "react";
import "./BpsLogo-Bc2wSHH6.js";
function TopicCard({ category, index }) {
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: `/kajian?category=${category.id}`,
      className: "topic-card",
      children: [
        /* @__PURE__ */ jsx("span", { className: "topic-card__number", children: String(index + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsx("h3", { className: "topic-card__title", children: category.name }),
        /* @__PURE__ */ jsxs("span", { className: "topic-card__count", children: [
          category.studies_count ?? 0,
          " kajian"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "topic-card__arrow", children: "→" })
      ]
    }
  );
}
function Home({
  featuredStudy,
  latestStudies,
  categories
}) {
  var _a;
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
          /* @__PURE__ */ jsx("div", { className: "home-eyebrow", children: "Knowledge Platform · Big Data BPS" }),
          /* @__PURE__ */ jsxs("h1", { children: [
            "Eksplorasi Big Data",
            /* @__PURE__ */ jsx("span", { children: "untuk statistik resmi." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "home-hero__description", children: "Temukan kajian, metode, dan insight berbasis data yang mendukung pengembangan statistik resmi dan pemanfaatan Big Data." }),
          /* @__PURE__ */ jsx("div", { className: "home-hero__actions", children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "/kajian",
              className: "home-button home-button--primary",
              children: "Jelajahi Kajian →"
            }
          ) })
        ] }),
        featuredStudy && /* @__PURE__ */ jsxs(
          "a",
          {
            href: `/kajian/${featuredStudy.slug}`,
            className: "home-featured home-featured-link",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "home-featured__image", children: [
                featuredStudy.cover_image ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: `/storage/${featuredStudy.cover_image}`,
                    alt: featuredStudy.title
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "home-featured__placeholder" }),
                /* @__PURE__ */ jsx("span", { className: "home-featured-label", children: "KAJIAN PILIHAN" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "home-featured__content", children: [
                /* @__PURE__ */ jsx("div", { className: "home-featured__category", children: ((_a = featuredStudy.category) == null ? void 0 : _a.name) ?? "KAJIAN" }),
                /* @__PURE__ */ jsx("h2", { className: "home-featured__title", children: featuredStudy.title }),
                /* @__PURE__ */ jsx("p", { className: "home-featured__excerpt", children: featuredStudy.excerpt })
              ] })
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "home-latest", children: [
        /* @__PURE__ */ jsxs("div", { className: "home-section-header", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "home-section-eyebrow", children: "Explore" }),
            /* @__PURE__ */ jsx("h2", { className: "home-section-title", children: "Kajian Terbaru" })
          ] }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/kajian",
              className: "home-section-link",
              children: "Lihat semua →"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "study-grid", children: latestStudies == null ? void 0 : latestStudies.map((study) => /* @__PURE__ */ jsx(
          StudyCard,
          {
            study
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
              /* @__PURE__ */ jsx("div", { className: "home-topics__eyebrow", children: "Explore by Topic" }),
              /* @__PURE__ */ jsx("h2", { className: "home-topics__title", children: "Fokus Kajian" }),
              /* @__PURE__ */ jsx("p", { className: "home-topics__description", children: "Jelajahi kajian berdasarkan topik dan bidang pemanfaatan Big Data." })
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
          /* @__PURE__ */ jsx("div", { className: "home-statement__eyebrow", children: "Big Data BPS" }),
          /* @__PURE__ */ jsxs("h2", { children: [
            "Data bukan hanya",
            /* @__PURE__ */ jsx("span", { children: "angka." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { children: "Kajian Big Data menjadi ruang untuk mengeksplorasi sumber data alternatif, metode baru, serta insight yang dapat mendukung penyelenggaraan statistik resmi." })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "home-cta", children: /* @__PURE__ */ jsxs("div", { className: "home-cta__box", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "home-cta__eyebrow", children: "Knowledge Center" }),
          /* @__PURE__ */ jsx("h2", { children: "Temukan kajian yang relevan dengan kebutuhanmu." }),
          /* @__PURE__ */ jsx("p", { children: "Jelajahi berbagai kajian Big Data, metode, dan insight yang telah dipublikasikan." })
        ] }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/kajian",
            className: "home-button home-button--primary",
            children: "Jelajahi Semua Kajian →"
          }
        )
      ] }) })
    ] })
  ] });
}
export {
  Home as default
};
