import { jsxs, jsx } from "react/jsx-runtime";
import { u as useLanguage } from "../ssr.js";
function StudyCard({ study }) {
  var _a, _b;
  const { t } = useLanguage();
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString(
      "id-ID",
      {
        day: "numeric",
        month: "short",
        year: "numeric"
      }
    );
  };
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: `/kajian/${study.slug}`,
      className: "study-card",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "study-card__image", children: [
          study.cover_image ? /* @__PURE__ */ jsx(
            "img",
            {
              src: study.cover_image.startsWith("http") ? study.cover_image : `/storage/${study.cover_image.replace(/^\/+/, "").replace(/^storage\//, "")}`,
              alt: study.title
            }
          ) : /* @__PURE__ */ jsxs("div", { className: "study-card__placeholder", children: [
            /* @__PURE__ */ jsx("div", { className: "study-card__placeholder-pattern" }),
            /* @__PURE__ */ jsxs("div", { className: "study-card__placeholder-content", children: [
              /* @__PURE__ */ jsx("span", { className: "study-card__placeholder-eyebrow", children: t.studyCard.study }),
              /* @__PURE__ */ jsx("strong", { children: t.studyCard.bigData }),
              /* @__PURE__ */ jsx("span", { children: t.studyCard.statistics })
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "study-card__category", children: ((_a = study.category) == null ? void 0 : _a.name) ?? "Kajian" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "study-card__content", children: [
          /* @__PURE__ */ jsxs("div", { className: "study-card__meta", children: [
            /* @__PURE__ */ jsx("span", { className: "study-card__date", children: formatDate(
              study.published_at || study.created_at
            ) }),
            /* @__PURE__ */ jsx("span", { className: "study-card__dot", children: "•" }),
            /* @__PURE__ */ jsx("span", { className: "study-card__status", children: t.studyCard.published })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "study-card__title", children: study.title }),
          /* @__PURE__ */ jsx("p", { className: "study-card__excerpt", children: study.excerpt }),
          ((_b = study.keywords) == null ? void 0 : _b.length) > 0 && /* @__PURE__ */ jsxs("div", { className: "study-card__keywords", children: [
            study.keywords.slice(0, 3).map((keyword) => /* @__PURE__ */ jsx(
              "span",
              {
                className: "study-card__keyword",
                children: keyword.name
              },
              keyword.id
            )),
            study.keywords.length > 3 && /* @__PURE__ */ jsxs("span", { className: "study-card__keyword study-card__keyword--more", children: [
              "+",
              study.keywords.length - 3
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "study-card__footer", children: [
            /* @__PURE__ */ jsx("span", { className: "study-card__link", children: t.studyCard.readStudy }),
            /* @__PURE__ */ jsx("span", { className: "study-card__arrow", children: "→" })
          ] })
        ] })
      ]
    }
  );
}
export {
  StudyCard as S
};
