import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { D as DashboardLayout } from "./DashboardLayout-Y_7hl2u9.js";
import "@inertiajs/react";
import "./BpsLogo-CvcnsC1A.js";
function Dashboard({
  publishedStudies,
  submittedStudies,
  underReviewStudies,
  revisionStudies,
  directorReviewStudies,
  rejectedStudies,
  draftStudies,
  totalViews,
  uniqueVisitors,
  totalStudies,
  totalLikes,
  totalComments,
  totalShares,
  totalUsers,
  totalResearchers,
  totalReviewers,
  totalDirectors,
  totalCategories,
  topStudies,
  trendLabels,
  trendData,
  statusLabels,
  statusData
}) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const statusChartRef = useRef(null);
  const statusChartInstance = useRef(null);
  useEffect(() => {
    if (!chartRef.current) {
      return;
    }
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    chartInstance.current = new Chart(
      chartRef.current,
      {
        type: "line",
        data: {
          labels: trendLabels ?? [],
          datasets: [
            {
              label: "Kunjungan",
              data: trendData ?? [],
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
              },
              grid: {
                color: "#eef2f6"
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
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
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
          labels: statusLabels ?? [],
          datasets: [
            {
              data: statusData ?? [],
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
  return /* @__PURE__ */ jsx(DashboardLayout, { children: /* @__PURE__ */ jsxs("div", { className: "admin-dashboard", children: [
    /* @__PURE__ */ jsx("header", { className: "admin-header", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "ADMIN DASHBOARD" }),
      /* @__PURE__ */ jsx("h1", { children: "Management Platform" }),
      /* @__PURE__ */ jsx("p", { children: "Kelola pengguna, kategori, kajian, dan pantau aktivitas platform Kajian Big Data BPS." })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "admin-overview", children: [
      /* @__PURE__ */ jsx("div", { className: "admin-section-label", children: "OVERVIEW" }),
      /* @__PURE__ */ jsxs("div", { className: "admin-overview-grid", children: [
        /* @__PURE__ */ jsxs("div", { className: "admin-overview-card admin-overview-card--primary", children: [
          /* @__PURE__ */ jsx("span", { children: "Total Kajian" }),
          /* @__PURE__ */ jsx("strong", { children: Number(totalStudies).toLocaleString("id-ID") }),
          /* @__PURE__ */ jsx("small", { children: "Seluruh kajian di platform" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "admin-overview-card", children: [
          /* @__PURE__ */ jsx("span", { children: "Published" }),
          /* @__PURE__ */ jsx("strong", { children: Number(publishedStudies).toLocaleString("id-ID") }),
          /* @__PURE__ */ jsx("small", { children: "Kajian telah diterbitkan" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "admin-overview-card", children: [
          /* @__PURE__ */ jsx("span", { children: "Menunggu Review" }),
          /* @__PURE__ */ jsx("strong", { children: Number(submittedStudies).toLocaleString("id-ID") }),
          /* @__PURE__ */ jsx("small", { children: "Menunggu reviewer" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "admin-overview-card", children: [
          /* @__PURE__ */ jsx("span", { children: "Total Views" }),
          /* @__PURE__ */ jsx("strong", { children: Number(totalViews).toLocaleString("id-ID") }),
          /* @__PURE__ */ jsx("small", { children: "Seluruh kunjungan kajian" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "admin-secondary", children: [
      /* @__PURE__ */ jsxs("div", { className: "admin-secondary-item", children: [
        /* @__PURE__ */ jsx("span", { children: "Unique Visitors" }),
        /* @__PURE__ */ jsx("strong", { children: Number(uniqueVisitors).toLocaleString("id-ID") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "admin-secondary-item", children: [
        /* @__PURE__ */ jsx("span", { children: "Total Likes" }),
        /* @__PURE__ */ jsx("strong", { children: Number(totalLikes).toLocaleString("id-ID") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "admin-secondary-item", children: [
        /* @__PURE__ */ jsx("span", { children: "Total Comments" }),
        /* @__PURE__ */ jsx("strong", { children: Number(totalComments).toLocaleString("id-ID") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "admin-secondary-item", children: [
        /* @__PURE__ */ jsx("span", { children: "Total Shares" }),
        /* @__PURE__ */ jsx("strong", { children: Number(totalShares).toLocaleString("id-ID") })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "admin-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "admin-section__heading", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "admin-section-label", children: "ANALYTICS" }),
          /* @__PURE__ */ jsx("h2", { children: "Platform activity" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "admin-chart-summary", children: "Aktivitas 7 hari terakhir" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "admin-analytics-grid", children: [
        /* @__PURE__ */ jsxs("div", { className: "admin-chart-card", children: [
          /* @__PURE__ */ jsxs("div", { className: "admin-card-heading", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Traffic" }),
              /* @__PURE__ */ jsx("span", { children: "Views kajian" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "admin-card-period", children: "7 hari" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "admin-chart", children: /* @__PURE__ */ jsx("canvas", { ref: chartRef }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "admin-chart-card", children: [
          /* @__PURE__ */ jsx("div", { className: "admin-card-heading", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Status Kajian" }),
            /* @__PURE__ */ jsx("span", { children: "Distribusi workflow" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "admin-chart admin-chart--status", children: /* @__PURE__ */ jsx("canvas", { ref: statusChartRef }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "admin-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "admin-section__heading", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "admin-section-label", children: "PERFORMANCE" }),
          /* @__PURE__ */ jsx("h2", { children: "Kajian terpopuler" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "admin-chart-summary", children: "Berdasarkan engagement" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "admin-top-studies", children: topStudies.length > 0 ? topStudies.map((study, index) => {
        var _a;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "admin-top-study",
            children: [
              /* @__PURE__ */ jsx("div", { className: "admin-top-study__rank", children: String(index + 1).padStart(2, "0") }),
              /* @__PURE__ */ jsxs("div", { className: "admin-top-study__info", children: [
                /* @__PURE__ */ jsx("h3", { children: study.title }),
                /* @__PURE__ */ jsx("span", { children: ((_a = study.category) == null ? void 0 : _a.name) ?? "Tanpa kategori" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "admin-top-study__metrics", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("strong", { children: Number(study.views_count).toLocaleString("id-ID") }),
                  /* @__PURE__ */ jsx("small", { children: "views" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("strong", { children: [
                    Number(study.engagement_rate ?? 0).toFixed(1),
                    "%"
                  ] }),
                  /* @__PURE__ */ jsx("small", { children: "engagement" })
                ] })
              ] })
            ]
          },
          study.id
        );
      }) : /* @__PURE__ */ jsx("div", { className: "admin-empty", children: "Belum ada kajian yang dapat ditampilkan." }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "admin-section admin-management", children: [
      /* @__PURE__ */ jsx("div", { className: "admin-section__heading", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "admin-section-label", children: "MANAGEMENT" }),
        /* @__PURE__ */ jsx("h2", { children: "Kelola platform" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "admin-management-grid", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/admin/users",
            className: "admin-management-card",
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "admin-management-card__eyebrow", children: "USERS" }),
                /* @__PURE__ */ jsx("h3", { children: "Pengguna" }),
                /* @__PURE__ */ jsx("p", { children: "Kelola akun peneliti, reviewer, direktur, dan administrator." })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "admin-management-card__arrow", children: "→" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/admin/categories",
            className: "admin-management-card",
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "admin-management-card__eyebrow", children: "CONTENT" }),
                /* @__PURE__ */ jsx("h3", { children: "Kategori" }),
                /* @__PURE__ */ jsx("p", { children: "Kelola kategori yang digunakan pada kajian." })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "admin-management-card__arrow", children: "→" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/admin/studies",
            className: "admin-management-card",
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "admin-management-card__eyebrow", children: "STUDIES" }),
                /* @__PURE__ */ jsx("h3", { children: "Kelola Kajian" }),
                /* @__PURE__ */ jsx("p", { children: "Pantau seluruh kajian dan request penghapusan." })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "admin-management-card__arrow", children: "→" })
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  Dashboard as default
};
