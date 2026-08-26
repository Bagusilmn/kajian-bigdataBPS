import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { D as DashboardLayout } from "./DashboardLayout-DP3XBUYL.js";
import "@inertiajs/react";
import "./BpsLogo-Bc2wSHH6.js";
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
    /* @__PURE__ */ jsx("div", { className: "admin-header", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "ADMIN DASHBOARD" }),
      /* @__PURE__ */ jsx("h1", { children: "Management Platform" }),
      /* @__PURE__ */ jsx("p", { children: "Kelola pengguna, kategori, kajian, dan pantau aktivitas platform Kajian Big Data BPS." })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "admin-stats", children: [
      /* @__PURE__ */ jsxs("div", { className: "admin-stat-card", children: [
        /* @__PURE__ */ jsx("span", { children: "TOTAL KAJIAN" }),
        /* @__PURE__ */ jsx("strong", { children: totalStudies }),
        /* @__PURE__ */ jsx("small", { children: "Semua kajian" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "admin-stat-card", children: [
        /* @__PURE__ */ jsx("span", { children: "PUBLISHED" }),
        /* @__PURE__ */ jsx("strong", { children: publishedStudies }),
        /* @__PURE__ */ jsx("small", { children: "Sudah diterbitkan" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "admin-stat-card", children: [
        /* @__PURE__ */ jsx("span", { children: "MENUNGGU REVIEW" }),
        /* @__PURE__ */ jsx("strong", { children: submittedStudies }),
        /* @__PURE__ */ jsx("small", { children: "Menunggu reviewer" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "admin-stat-card", children: [
        /* @__PURE__ */ jsx("span", { children: "UNDER REVIEW" }),
        /* @__PURE__ */ jsx("strong", { children: underReviewStudies }),
        /* @__PURE__ */ jsx("small", { children: "Sedang direview" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "admin-stat-card", children: [
        /* @__PURE__ */ jsx("span", { children: "REVIEW DIREKTUR" }),
        /* @__PURE__ */ jsx("strong", { children: directorReviewStudies }),
        /* @__PURE__ */ jsx("small", { children: "Menunggu keputusan final" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "admin-stat-card", children: [
        /* @__PURE__ */ jsx("span", { children: "REJECTED" }),
        /* @__PURE__ */ jsx("strong", { children: rejectedStudies }),
        /* @__PURE__ */ jsx("small", { children: "Kajian ditolak" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "admin-stat-card", children: [
        /* @__PURE__ */ jsx("span", { children: "REVISION" }),
        /* @__PURE__ */ jsx("strong", { children: revisionStudies }),
        /* @__PURE__ */ jsx("small", { children: "Perlu perbaikan" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "admin-stat-card admin-stat-card--accent", children: [
        /* @__PURE__ */ jsx("span", { children: "TOTAL VIEWS" }),
        /* @__PURE__ */ jsx("strong", { children: Number(totalViews).toLocaleString("id-ID") }),
        /* @__PURE__ */ jsx("small", { children: "Semua kajian" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "admin-stat-card", children: [
        /* @__PURE__ */ jsx("span", { children: "UNIQUE VISITORS" }),
        /* @__PURE__ */ jsx("strong", { children: Number(uniqueVisitors).toLocaleString("id-ID") }),
        /* @__PURE__ */ jsx("small", { children: "Pengunjung unik" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "admin-stat-card", children: [
        /* @__PURE__ */ jsx("span", { children: "TOTAL LIKES" }),
        /* @__PURE__ */ jsx("strong", { children: Number(totalLikes).toLocaleString("id-ID") }),
        /* @__PURE__ */ jsx("small", { children: "Semua kajian" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "admin-stat-card", children: [
        /* @__PURE__ */ jsx("span", { children: "TOTAL COMMENTS" }),
        /* @__PURE__ */ jsx("strong", { children: Number(totalComments).toLocaleString("id-ID") }),
        /* @__PURE__ */ jsx("small", { children: "Komentar publik" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "admin-stat-card", children: [
        /* @__PURE__ */ jsx("span", { children: "TOTAL SHARES" }),
        /* @__PURE__ */ jsx("strong", { children: Number(totalShares).toLocaleString("id-ID") }),
        /* @__PURE__ */ jsx("small", { children: "Semua platform" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "admin-analytics-grid", children: [
      /* @__PURE__ */ jsxs("section", { className: "admin-section", children: [
        /* @__PURE__ */ jsxs("div", { className: "admin-section__heading", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "TRAFFIC ANALYTICS" }),
            /* @__PURE__ */ jsx("h2", { children: "Kunjungan 7 Hari Terakhir" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "admin-chart-summary", children: [
            Number(totalViews).toLocaleString("id-ID"),
            " ",
            "total views"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "admin-chart-card", children: /* @__PURE__ */ jsx("div", { className: "admin-chart", children: /* @__PURE__ */ jsx("canvas", { ref: chartRef }) }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "admin-section", children: [
        /* @__PURE__ */ jsxs("div", { className: "admin-section__heading", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "STUDY STATUS" }),
            /* @__PURE__ */ jsx("h2", { children: "Distribusi Status Kajian" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "admin-chart-summary", children: [
            Number(totalStudies).toLocaleString("id-ID"),
            " ",
            "total kajian"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "admin-chart-card", children: /* @__PURE__ */ jsx("div", { className: "admin-chart admin-chart--small", children: /* @__PURE__ */ jsx("canvas", { ref: statusChartRef }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "admin-section", children: [
      /* @__PURE__ */ jsx("div", { className: "admin-section__heading", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "PERFORMANCE" }),
        /* @__PURE__ */ jsx("h2", { children: "Kajian dengan Engagement Tertinggi" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "admin-top-studies", children: (topStudies == null ? void 0 : topStudies.length) > 0 ? topStudies.map((study, index) => {
        var _a;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "admin-top-study",
            children: [
              /* @__PURE__ */ jsx("div", { className: "admin-top-study__rank", children: String(index + 1).padStart(2, "0") }),
              /* @__PURE__ */ jsxs("div", { className: "admin-top-study__info", children: [
                /* @__PURE__ */ jsx("h3", { children: study.title }),
                /* @__PURE__ */ jsx("span", { children: ((_a = study.category) == null ? void 0 : _a.name) ?? "Kajian" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "admin-top-study__metrics", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("strong", { children: Number(
                    study.views_count
                  ).toLocaleString("id-ID") }),
                  /* @__PURE__ */ jsx("small", { children: "views" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("strong", { children: Number(
                    study.likes_count
                  ).toLocaleString("id-ID") }),
                  /* @__PURE__ */ jsx("small", { children: "likes" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("strong", { children: Number(
                    study.comments_count
                  ).toLocaleString("id-ID") }),
                  /* @__PURE__ */ jsx("small", { children: "comments" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("strong", { children: Number(
                    study.shares_count
                  ).toLocaleString("id-ID") }),
                  /* @__PURE__ */ jsx("small", { children: "shares" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "admin-top-study__engagement", children: [
                  /* @__PURE__ */ jsxs("strong", { children: [
                    Number(
                      study.engagement_rate
                    ).toLocaleString("id-ID"),
                    "%"
                  ] }),
                  /* @__PURE__ */ jsx("small", { children: "engagement" })
                ] })
              ] })
            ]
          },
          study.id
        );
      }) : /* @__PURE__ */ jsx("div", { className: "admin-empty", children: "Belum ada data kajian populer." }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "admin-section", children: [
      /* @__PURE__ */ jsx("div", { className: "admin-section__heading", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "MANAGEMENT" }),
        /* @__PURE__ */ jsx("h2", { children: "Kelola Platform" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "admin-management-grid", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/admin/users",
            className: "admin-management-card",
            children: [
              /* @__PURE__ */ jsx("span", { className: "admin-management-card__eyebrow", children: "USER MANAGEMENT" }),
              /* @__PURE__ */ jsx("h3", { children: "Kelola Pengguna" }),
              /* @__PURE__ */ jsx("p", { children: "Tambah pengguna, ubah role, dan kelola akun pengguna platform." }),
              /* @__PURE__ */ jsx("span", { className: "admin-management-card__link", children: "Kelola User →" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/admin/categories",
            className: "admin-management-card",
            children: [
              /* @__PURE__ */ jsx("span", { className: "admin-management-card__eyebrow", children: "CATEGORY MANAGEMENT" }),
              /* @__PURE__ */ jsx("h3", { children: "Kelola Kategori" }),
              /* @__PURE__ */ jsx("p", { children: "Tambahkan dan kelola kategori kajian Big Data." }),
              /* @__PURE__ */ jsx("span", { className: "admin-management-card__link", children: "Kelola Kategori →" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/admin/studies",
            className: "admin-management-card",
            children: [
              /* @__PURE__ */ jsx("span", { className: "admin-management-card__eyebrow", children: "STUDY MANAGEMENT" }),
              /* @__PURE__ */ jsx("h3", { children: "Kelola Kajian" }),
              /* @__PURE__ */ jsx("p", { children: "Pantau kajian yang masuk dan tangani permintaan penghapusan." }),
              /* @__PURE__ */ jsx("span", { className: "admin-management-card__link", children: "Kelola Kajian →" })
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
