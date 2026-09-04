import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import { u as useLanguage, P as PublicLayout } from "./PublicLayout-CV7vGuTx.js";
import { S as StudyCard } from "./StudyCard-Cvwsc5ty.js";
import "./BpsLogo-CvcnsC1A.js";
function Studies({
  studies,
  categories,
  filters
}) {
  var _a, _b;
  const { t } = useLanguage();
  const hasFilter = Boolean(filters == null ? void 0 : filters.search) || Boolean(filters == null ? void 0 : filters.category);
  const pageTitle = hasFilter ? `Hasil Pencarian Kajian Big Data | Kajian Big Data BPS` : `Kajian Big Data | Kajian Big Data BPS`;
  const pageDescription = hasFilter ? `Temukan kajian Big Data BPS berdasarkan kata kunci dan kategori yang relevan.` : `Jelajahi kajian, analisis, metode, dan pemanfaatan Big Data dalam mendukung statistik resmi di Badan Pusat Statistik.`;
  const canonicalUrl = typeof window !== "undefined" ? `${window.location.origin}/kajian` : "/kajian";
  const [search, setSearch] = useState((filters == null ? void 0 : filters.search) ?? "");
  const [category, setCategory] = useState((filters == null ? void 0 : filters.category) ?? "");
  const handleSearch = () => {
    router.get(
      "/kajian",
      {
        search: search || void 0,
        category: category || void 0
      },
      {
        preserveState: true,
        preserveScroll: true,
        replace: true
      }
    );
  };
  const handleReset = () => {
    setSearch("");
    setCategory("");
    router.get(
      "/kajian",
      {},
      {
        preserveState: true,
        preserveScroll: true
      }
    );
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentSearch = (filters == null ? void 0 : filters.search) ?? "";
      const currentCategory = (filters == null ? void 0 : filters.category) ?? "";
      if (search === currentSearch && category === currentCategory) {
        return;
      }
      handleSearch();
    }, 350);
    return () => clearTimeout(timer);
  }, [search, category]);
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: pageTitle }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "description",
          name: "description",
          content: pageDescription
        }
      ),
      /* @__PURE__ */ jsx(
        "link",
        {
          "head-key": "canonical",
          rel: "canonical",
          href: canonicalUrl
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "og:title",
          property: "og:title",
          content: pageTitle
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "og:description",
          property: "og:description",
          content: pageDescription
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
          content: canonicalUrl
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
          content: pageTitle
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "twitter:description",
          name: "twitter:description",
          content: pageDescription
        }
      ),
      hasFilter && /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "robots",
          name: "robots",
          content: "noindex,follow"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "studies-page", children: [
      /* @__PURE__ */ jsx("section", { className: "studies-header", children: /* @__PURE__ */ jsxs("div", { className: "studies-header__inner", children: [
        /* @__PURE__ */ jsx("div", { className: "studies-eyebrow", children: "Knowledge Center" }),
        /* @__PURE__ */ jsx("h1", { children: "Kajian Big Data" }),
        /* @__PURE__ */ jsx("p", { children: "Eksplorasi berbagai kajian, analisis, dan pemanfaatan Big Data dalam mendukung statistik resmi." })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "studies-content", children: /* @__PURE__ */ jsxs("div", { className: "studies-container", children: [
        /* @__PURE__ */ jsxs(
          "form",
          {
            onSubmit: (event) => event.preventDefault(),
            className: "studies-filter",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "studies-search", children: [
                /* @__PURE__ */ jsx("span", { className: "studies-search__icon", children: "⌕" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: search,
                    onChange: (event) => setSearch(event.target.value),
                    placeholder: t.studies.searchPlaceholder
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: category,
                  onChange: (event) => setCategory(event.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Semua kategori" }),
                    categories == null ? void 0 : categories.map((item) => /* @__PURE__ */ jsx(
                      "option",
                      {
                        value: item.id,
                        children: item.name
                      },
                      item.id
                    ))
                  ]
                }
              ),
              (search || category) && /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: handleReset,
                  className: "studies-filter__reset",
                  children: "Reset"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "studies-result-meta", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            "Menampilkan",
            " ",
            /* @__PURE__ */ jsx("strong", { children: (studies == null ? void 0 : studies.total) ?? 0 }),
            " ",
            "kajian"
          ] }),
          (search || category) && /* @__PURE__ */ jsx("div", { className: "studies-active-filter", children: "Filter aktif" })
        ] }),
        ((_a = studies == null ? void 0 : studies.data) == null ? void 0 : _a.length) > 0 ? /* @__PURE__ */ jsx("div", { className: "study-grid", children: studies.data.map((study) => /* @__PURE__ */ jsx(
          StudyCard,
          {
            study
          },
          study.id
        )) }) : /* @__PURE__ */ jsxs("div", { className: "studies-empty", children: [
          /* @__PURE__ */ jsx("div", { className: "studies-empty__icon", children: "↗" }),
          /* @__PURE__ */ jsx("h2", { children: "Kajian tidak ditemukan" }),
          /* @__PURE__ */ jsx("p", { children: "Coba gunakan kata kunci atau kategori lain." }),
          (search || category) && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "home-button home-button--secondary",
              onClick: handleReset,
              children: "Reset Filter"
            }
          )
        ] }),
        (studies == null ? void 0 : studies.last_page) > 1 && /* @__PURE__ */ jsxs("nav", { className: "studies-pagination", children: [
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
              children: "←"
            }
          ),
          (_b = studies.links) == null ? void 0 : _b.slice(1, -1).map((link, index) => {
            if (link.url === null) {
              return /* @__PURE__ */ jsx(
                "span",
                {
                  className: "studies-pagination__ellipsis",
                  children: "..."
                },
                index
              );
            }
            return /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: link.active ? "is-active" : "",
                onClick: () => {
                  router.get(
                    link.url,
                    {},
                    {
                      preserveState: true,
                      preserveScroll: true
                    }
                  );
                },
                children: link.label
              },
              index
            );
          }),
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
              children: "→"
            }
          )
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Studies as default
};
