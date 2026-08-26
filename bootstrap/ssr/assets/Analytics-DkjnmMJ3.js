import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { D as DashboardLayout } from "./DashboardLayout-DP3XBUYL.js";
import "@inertiajs/react";
import "./BpsLogo-Bc2wSHH6.js";
function Analytics({
  directorReviewStudies = 0,
  revisionStudies = 0,
  publishedStudies = 0,
  rejectedStudies = 0,
  recentReviews = [],
  statusLabels = [],
  statusData = [],
  trendLabels = [],
  trendData = []
}) {
  const trendChartRef = useRef(null);
  const statusChartRef = useRef(null);
  const statusChartInstance = useRef(null);
  const trendChartInstance = useRef(null);
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
          labels: trendLabels,
          datasets: [
            {
              label: "Final Review",
              data: trendData,
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
  }, [trendLabels, trendData]);
  useEffect(() => {
    if (!statusChartRef.current) {
      return;
    }
    if (statusChartInstance.current) {
      statusChartInstance.current.destroy();
    }
    statusChartInstance.current = new Chart(
      statusChartRef.current,
      {
        type: "doughnut",
        data: {
          labels: statusLabels,
          datasets: [
            {
              data: statusData,
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
      if (statusChartInstance.current) {
        statusChartInstance.current.destroy();
        statusChartInstance.current = null;
      }
    };
  }, [statusLabels, statusData]);
  return /* @__PURE__ */ jsx(DashboardLayout, { children: /* @__PURE__ */ jsxs("div", { className: "user-dashboard", children: [
    /* @__PURE__ */ jsx("div", { className: "dashboard-header", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "FINAL REVIEW ANALYTICS" }),
      /* @__PURE__ */ jsx("h1", { children: "Analytics Direktur" }),
      /* @__PURE__ */ jsx("p", { children: "Ringkasan keputusan final yang kamu lakukan." })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "dashboard-stats", children: [
      /* @__PURE__ */ jsxs("div", { className: "dashboard-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "MENUNGGU REVIEW FINAL" }),
        /* @__PURE__ */ jsx("strong", { children: directorReviewStudies }),
        /* @__PURE__ */ jsx("small", { children: "Menunggu keputusan" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "dashboard-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "REVISION" }),
        /* @__PURE__ */ jsx("strong", { children: revisionStudies }),
        /* @__PURE__ */ jsx("small", { children: "Kondisi saat ini" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "dashboard-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "PUBLISHED" }),
        /* @__PURE__ */ jsx("strong", { children: publishedStudies }),
        /* @__PURE__ */ jsx("small", { children: "Kondisi saat ini" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "dashboard-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "REJECTED" }),
        /* @__PURE__ */ jsx("strong", { children: rejectedStudies }),
        /* @__PURE__ */ jsx("small", { children: "Kondisi saat ini" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "director-analytics-grid", children: [
      /* @__PURE__ */ jsxs("section", { className: "user-studies-section", children: [
        /* @__PURE__ */ jsx("div", { className: "user-studies-heading", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "STATUS DISTRIBUTION" }),
          /* @__PURE__ */ jsx("h2", { children: "Distribusi Status Kajian" }),
          /* @__PURE__ */ jsx("p", { children: "Komposisi seluruh kajian berdasarkan status terkini." })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "user-analytics-chart-card", children: /* @__PURE__ */ jsx("div", { className: "user-analytics-chart user-analytics-chart--small", children: /* @__PURE__ */ jsx("canvas", { ref: statusChartRef }) }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "user-studies-section", children: [
        /* @__PURE__ */ jsx("div", { className: "user-studies-heading", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "FINAL REVIEW ACTIVITY" }),
          /* @__PURE__ */ jsx("h2", { children: "Aktivitas 7 Hari Terakhir" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "user-analytics-chart-card", children: /* @__PURE__ */ jsx("div", { className: "user-analytics-chart", children: /* @__PURE__ */ jsx("canvas", { ref: trendChartRef }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "user-studies-section", children: [
      /* @__PURE__ */ jsx("div", { className: "user-studies-heading", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "REVIEW HISTORY" }),
        /* @__PURE__ */ jsx("h2", { children: "Keputusan Terbaru" })
      ] }) }),
      recentReviews.length > 0 ? /* @__PURE__ */ jsx("div", { className: "user-study-grid", children: recentReviews.map((review) => {
        var _a, _b, _c;
        return /* @__PURE__ */ jsx(
          "article",
          {
            className: "user-study-card",
            children: /* @__PURE__ */ jsxs("div", { className: "user-study-card__content", children: [
              /* @__PURE__ */ jsx("div", { className: "user-study-card__status", children: /* @__PURE__ */ jsx("span", { className: "user-study-card__status", children: review.stage === "director" ? review.decision === "approved" ? "Approved" : review.decision === "revision" ? "Revision" : "Rejected" : "Review" }) }),
              /* @__PURE__ */ jsx("h3", { children: ((_a = review.study) == null ? void 0 : _a.title) ?? "Kajian" }),
              /* @__PURE__ */ jsx("p", { children: ((_c = (_b = review.study) == null ? void 0 : _b.category) == null ? void 0 : _c.name) ?? "Kajian" }),
              /* @__PURE__ */ jsx("div", { className: "user-study-card__footer", children: /* @__PURE__ */ jsx("span", { children: review.created_at ? new Date(
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
      }) }) : /* @__PURE__ */ jsxs("div", { className: "user-empty-state", children: [
        /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "BELUM ADA DATA" }),
        /* @__PURE__ */ jsx("h3", { children: "Belum ada keputusan final" }),
        /* @__PURE__ */ jsx("p", { children: "Riwayat keputusan final kamu akan muncul di sini." })
      ] })
    ] })
  ] }) });
}
export {
  Analytics as default
};
