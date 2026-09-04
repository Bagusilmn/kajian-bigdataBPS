import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { D as DashboardLayout } from "./DashboardLayout-Y_7hl2u9.js";
import "@inertiajs/react";
import "./BpsLogo-CvcnsC1A.js";
function Analytics({
  totalStudies = 0,
  publishedStudies = 0,
  totalViews = 0,
  totalLikes = 0,
  totalComments = 0,
  totalShares = 0,
  topStudies = [],
  trendLabels = [],
  trendData = []
}) {
  const viewsChartRef = useRef(null);
  const engagementChartRef = useRef(null);
  const viewsChartInstance = useRef(null);
  const engagementChartInstance = useRef(null);
  useEffect(() => {
    if (!viewsChartRef.current) {
      return;
    }
    if (viewsChartInstance.current) {
      viewsChartInstance.current.destroy();
    }
    viewsChartInstance.current = new Chart(
      viewsChartRef.current,
      {
        type: "line",
        data: {
          labels: trendLabels,
          datasets: [
            {
              label: "Views",
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
      if (viewsChartInstance.current) {
        viewsChartInstance.current.destroy();
        viewsChartInstance.current = null;
      }
    };
  }, [trendLabels, trendData]);
  useEffect(() => {
    if (!engagementChartRef.current) {
      return;
    }
    if (engagementChartInstance.current) {
      engagementChartInstance.current.destroy();
    }
    const labels = topStudies.map(
      (_, index) => `#${index + 1}`
    );
    const likes = topStudies.map(
      (study) => study.likes_count
    );
    const comments = topStudies.map(
      (study) => study.comments_count
    );
    const shares = topStudies.map(
      (study) => study.shares_count
    );
    engagementChartInstance.current = new Chart(
      engagementChartRef.current,
      {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Likes",
              data: likes
            },
            {
              label: "Comments",
              data: comments
            },
            {
              label: "Shares",
              data: shares
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom"
            },
            tooltip: {
              callbacks: {
                title: (items) => {
                  var _a, _b;
                  const index = (_a = items[0]) == null ? void 0 : _a.dataIndex;
                  return index !== void 0 ? ((_b = topStudies[index]) == null ? void 0 : _b.title) ?? "" : "";
                }
              }
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
      if (engagementChartInstance.current) {
        engagementChartInstance.current.destroy();
        engagementChartInstance.current = null;
      }
    };
  }, [topStudies]);
  return /* @__PURE__ */ jsx(DashboardLayout, { children: /* @__PURE__ */ jsxs("div", { className: "user-dashboard", children: [
    /* @__PURE__ */ jsx("div", { className: "dashboard-header", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "MY ANALYTICS" }),
      /* @__PURE__ */ jsx("h1", { children: "Analytics Kajian" }),
      /* @__PURE__ */ jsx("p", { children: "Lihat performa dan engagement dari kajian yang kamu publikasikan." })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "dashboard-stats", children: [
      /* @__PURE__ */ jsxs("div", { className: "dashboard-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "TOTAL KAJIAN" }),
        /* @__PURE__ */ jsx("strong", { children: totalStudies }),
        /* @__PURE__ */ jsx("small", { children: "Semua kajian saya" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "dashboard-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "PUBLISHED" }),
        /* @__PURE__ */ jsx("strong", { children: publishedStudies }),
        /* @__PURE__ */ jsx("small", { children: "Sudah diterbitkan" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "dashboard-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "TOTAL VIEWS" }),
        /* @__PURE__ */ jsx("strong", { children: Number(totalViews).toLocaleString("id-ID") }),
        /* @__PURE__ */ jsx("small", { children: "Seluruh kajian" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "dashboard-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "LIKES" }),
        /* @__PURE__ */ jsx("strong", { children: Number(totalLikes).toLocaleString("id-ID") }),
        /* @__PURE__ */ jsx("small", { children: "Total suka" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "dashboard-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "COMMENTS" }),
        /* @__PURE__ */ jsx("strong", { children: Number(totalComments).toLocaleString("id-ID") }),
        /* @__PURE__ */ jsx("small", { children: "Total komentar" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "dashboard-stat", children: [
        /* @__PURE__ */ jsx("span", { children: "SHARES" }),
        /* @__PURE__ */ jsx("strong", { children: Number(totalShares).toLocaleString("id-ID") }),
        /* @__PURE__ */ jsx("small", { children: "Total dibagikan" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "user-analytics-grid", children: [
      /* @__PURE__ */ jsxs("section", { className: "user-studies-section", children: [
        /* @__PURE__ */ jsxs("div", { className: "user-studies-heading", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "TRAFFIC" }),
            /* @__PURE__ */ jsx("h2", { children: "Perkembangan Views" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "dashboard-secondary-link", children: "7 hari terakhir" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "user-analytics-chart-card", children: /* @__PURE__ */ jsx("div", { className: "user-analytics-chart", children: /* @__PURE__ */ jsx("canvas", { ref: viewsChartRef }) }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "user-studies-section", children: [
        /* @__PURE__ */ jsx("div", { className: "user-studies-heading", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "ENGAGEMENT" }),
          /* @__PURE__ */ jsx("h2", { children: "Interaksi Kajian" }),
          /* @__PURE__ */ jsx("p", { children: "Perbandingan likes, comments, dan shares pada kajian dengan performa terbaik." })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "user-analytics-chart-card", children: /* @__PURE__ */ jsx("div", { className: "user-analytics-chart user-analytics-chart--large", children: /* @__PURE__ */ jsx("canvas", { ref: engagementChartRef }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "user-studies-section", children: [
      /* @__PURE__ */ jsx("div", { className: "user-studies-heading", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "PERFORMANCE" }),
        /* @__PURE__ */ jsx("h2", { children: "Kajian Terpopuler" })
      ] }) }),
      topStudies.length > 0 ? /* @__PURE__ */ jsx("div", { className: "user-study-grid", children: topStudies.map((study, index) => {
        var _a;
        return /* @__PURE__ */ jsx(
          "article",
          {
            className: "user-study-card",
            children: /* @__PURE__ */ jsxs("div", { className: "user-study-card__content", children: [
              /* @__PURE__ */ jsxs("div", { className: "dashboard-eyebrow", children: [
                "#",
                String(index + 1).padStart(2, "0")
              ] }),
              /* @__PURE__ */ jsx("h3", { children: study.title }),
              /* @__PURE__ */ jsx("p", { children: ((_a = study.category) == null ? void 0 : _a.name) ?? "Kajian" }),
              /* @__PURE__ */ jsxs("div", { className: "user-analytics-metrics", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("strong", { children: Number(
                    study.views_count
                  ).toLocaleString("id-ID") }),
                  /* @__PURE__ */ jsx("small", { children: "Views" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("strong", { children: study.likes_count }),
                  /* @__PURE__ */ jsx("small", { children: "Likes" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("strong", { children: study.comments_count }),
                  /* @__PURE__ */ jsx("small", { children: "Comments" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("strong", { children: study.shares_count }),
                  /* @__PURE__ */ jsx("small", { children: "Shares" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("strong", { children: [
                    study.engagement_rate,
                    "%"
                  ] }),
                  /* @__PURE__ */ jsx("small", { children: "Engagement" })
                ] })
              ] })
            ] })
          },
          study.id
        );
      }) }) : /* @__PURE__ */ jsxs("div", { className: "user-empty-state", children: [
        /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "BELUM ADA DATA" }),
        /* @__PURE__ */ jsx("h3", { children: "Belum ada kajian published" }),
        /* @__PURE__ */ jsx("p", { children: "Analytics akan muncul setelah kajian kamu diterbitkan." })
      ] })
    ] })
  ] }) });
}
export {
  Analytics as default
};
