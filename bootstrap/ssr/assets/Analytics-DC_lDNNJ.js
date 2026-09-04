import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { D as DashboardLayout } from "./DashboardLayout-Y_7hl2u9.js";
import "@inertiajs/react";
import "./BpsLogo-CvcnsC1A.js";
function Analytics({
  totalReviews = 0,
  revisionCount = 0,
  forwardedCount = 0,
  rejectedCount = 0,
  recentReviews = [],
  decisionLabels = [],
  decisionData = [],
  reviewTrendLabels = [],
  reviewTrendData = []
}) {
  const decisionChartRef = useRef(null);
  const trendChartRef = useRef(null);
  const decisionChartInstance = useRef(null);
  const trendChartInstance = useRef(null);
  useEffect(() => {
    if (!decisionChartRef.current) {
      return;
    }
    if (decisionChartInstance.current) {
      decisionChartInstance.current.destroy();
    }
    decisionChartInstance.current = new Chart(
      decisionChartRef.current,
      {
        type: "doughnut",
        data: {
          labels: decisionLabels,
          datasets: [
            {
              data: decisionData,
              borderWidth: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom"
            }
          }
        }
      }
    );
    return () => {
      if (decisionChartInstance.current) {
        decisionChartInstance.current.destroy();
        decisionChartInstance.current = null;
      }
    };
  }, [decisionLabels, decisionData]);
  useEffect(() => {
    if (!trendChartRef.current) {
      return;
    }
    if (trendChartInstance.current) {
      trendChartInstance.current.destroy();
    }
    trendChartInstance.current = new Chart(
      trendChartRef.current,
      {
        type: "line",
        data: {
          labels: reviewTrendLabels,
          datasets: [
            {
              label: "Review",
              data: reviewTrendData,
              borderWidth: 2,
              tension: 0.35,
              pointRadius: 3,
              pointHoverRadius: 5,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      }
    );
    return () => {
      if (trendChartInstance.current) {
        trendChartInstance.current.destroy();
        trendChartInstance.current = null;
      }
    };
  }, [reviewTrendLabels, reviewTrendData]);
  return /* @__PURE__ */ jsx(DashboardLayout, { children: /* @__PURE__ */ jsxs("div", { className: "reviewer-analytics", children: [
    /* @__PURE__ */ jsx("div", { className: "reviewer-analytics-header", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "REVIEW ANALYTICS" }),
      /* @__PURE__ */ jsx("h1", { children: "Analytics Review" }),
      /* @__PURE__ */ jsx("p", { children: "Ringkasan aktivitas review yang kamu lakukan." })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "reviewer-analytics-stats", children: [
      /* @__PURE__ */ jsxs("div", { className: "reviewer-analytics-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "TOTAL REVIEW" }),
        /* @__PURE__ */ jsx("strong", { children: totalReviews }),
        /* @__PURE__ */ jsx("small", { children: "Kajian yang saya review" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "reviewer-analytics-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "REVISION" }),
        /* @__PURE__ */ jsx("strong", { children: revisionCount }),
        /* @__PURE__ */ jsx("small", { children: "Meminta perbaikan" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "reviewer-analytics-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "FORWARDED" }),
        /* @__PURE__ */ jsx("strong", { children: forwardedCount }),
        /* @__PURE__ */ jsx("small", { children: "Diteruskan ke Direktur" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "reviewer-analytics-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "REJECTED" }),
        /* @__PURE__ */ jsx("strong", { children: rejectedCount }),
        /* @__PURE__ */ jsx("small", { children: "Kajian ditolak" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "reviewer-analytics-grid", children: [
      /* @__PURE__ */ jsxs("section", { className: "reviewer-analytics-section", children: [
        /* @__PURE__ */ jsx("div", { className: "reviewer-analytics-heading", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "DECISION ANALYTICS" }),
          /* @__PURE__ */ jsx("h2", { children: "Distribusi Keputusan" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "reviewer-analytics-chart-card", children: /* @__PURE__ */ jsx("div", { className: "reviewer-analytics-chart reviewer-analytics-chart--small", children: /* @__PURE__ */ jsx("canvas", { ref: decisionChartRef }) }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "reviewer-analytics-section", children: [
        /* @__PURE__ */ jsx("div", { className: "reviewer-analytics-heading", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "REVIEW ACTIVITY" }),
          /* @__PURE__ */ jsx("h2", { children: "Aktivitas Review" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "reviewer-analytics-chart-card", children: /* @__PURE__ */ jsx("div", { className: "reviewer-analytics-chart", children: /* @__PURE__ */ jsx("canvas", { ref: trendChartRef }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "reviewer-analytics-section", children: [
      /* @__PURE__ */ jsx("div", { className: "reviewer-analytics-heading", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "REVIEW HISTORY" }),
        /* @__PURE__ */ jsx("h2", { children: "Aktivitas Review Terbaru" })
      ] }) }),
      recentReviews.length > 0 ? /* @__PURE__ */ jsx("div", { className: "reviewer-analytics-history", children: recentReviews.map((review) => {
        var _a, _b, _c;
        return /* @__PURE__ */ jsx(
          "article",
          {
            className: "reviewer-history-card",
            children: /* @__PURE__ */ jsxs("div", { className: "reviewer-history-card__content", children: [
              /* @__PURE__ */ jsx("div", { className: "reviewer-history-card__status", children: review.decision === "revision" ? "Revision" : review.decision === "approved" ? "Forwarded" : "Rejected" }),
              /* @__PURE__ */ jsx("h3", { children: ((_a = review.study) == null ? void 0 : _a.title) ?? "Kajian" }),
              /* @__PURE__ */ jsx("p", { className: "reviewer-history-card__category", children: ((_c = (_b = review.study) == null ? void 0 : _b.category) == null ? void 0 : _c.name) ?? "Kajian" }),
              /* @__PURE__ */ jsx("div", { className: "reviewer-history-card__footer", children: /* @__PURE__ */ jsx("span", { children: review.created_at ? new Date(
                review.created_at
              ).toLocaleDateString(
                "id-ID",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                }
              ) : "" }) })
            ] })
          },
          review.id
        );
      }) }) : /* @__PURE__ */ jsxs("div", { className: "reviewer-analytics-empty", children: [
        /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "BELUM ADA REVIEW" }),
        /* @__PURE__ */ jsx("h3", { children: "Belum ada aktivitas review" }),
        /* @__PURE__ */ jsx("p", { children: "Riwayat review yang kamu lakukan akan muncul di sini." })
      ] })
    ] })
  ] }) });
}
export {
  Analytics as default
};
