import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import { B as BpsLogo } from "./BpsLogo-CvcnsC1A.js";
function Sidebar({ isOpen = false, onClose }) {
  const { auth } = usePage().props;
  const currentUrl = usePage().url;
  const user = auth == null ? void 0 : auth.user;
  const role = (user == null ? void 0 : user.role) ?? "user";
  const menus = {
    user: [
      {
        label: "Dashboard",
        href: "/user/dashboard"
      },
      {
        label: "Analytics",
        href: "/user/analytics"
      },
      {
        label: "Ajukan Kajian",
        href: "/user/studies/create"
      }
    ],
    reviewer: [
      {
        label: "Dashboard",
        href: "/reviewer/dashboard"
      },
      {
        label: "Sedang Direview",
        href: "/reviewer/studies/active"
      },
      {
        label: "Analytics",
        href: "/reviewer/analytics"
      }
    ],
    admin: [
      {
        label: "Dashboard",
        href: "/admin/dashboard"
      },
      {
        label: "Pengguna",
        href: "/admin/users"
      },
      {
        label: "Kategori",
        href: "/admin/categories"
      },
      {
        label: "Kelola Kajian",
        href: "/admin/studies"
      }
    ],
    director: [
      {
        label: "Dashboard",
        href: "/director/dashboard"
      },
      {
        label: "Analytics",
        href: "/director/analytics"
      }
    ]
  };
  const currentMenus = menus[role] ?? menus.user;
  const roleLabel = {
    user: "Peneliti",
    reviewer: "Reviewer",
    director: "Direktur",
    admin: "Administrator"
  };
  const handleNavigation = () => {
    if (onClose) {
      onClose();
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    isOpen && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "dashboard-sidebar__overlay",
        onClick: onClose,
        "aria-label": "Tutup menu"
      }
    ),
    /* @__PURE__ */ jsxs(
      "aside",
      {
        className: `dashboard-sidebar ${isOpen ? "is-open" : ""}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "dashboard-sidebar__header", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "/",
                className: "dashboard-brand",
                onClick: handleNavigation,
                children: [
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "dashboard-brand__mark",
                      style: {
                        width: "36px",
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        overflow: "hidden"
                      },
                      children: /* @__PURE__ */ jsx(BpsLogo, {})
                    }
                  ),
                  /* @__PURE__ */ jsxs("span", { className: "dashboard-brand__text", children: [
                    /* @__PURE__ */ jsx("strong", { children: "KAJIAN BIG DATA BPS" }),
                    /* @__PURE__ */ jsx("small", { children: roleLabel[role] ?? "Portal Kajian" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "dashboard-sidebar__close",
                onClick: onClose,
                "aria-label": "Tutup menu",
                children: "×"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("nav", { className: "dashboard-nav", children: currentMenus.map((menu) => {
            const isActive = currentUrl === menu.href || currentUrl.startsWith(`${menu.href}/`);
            return /* @__PURE__ */ jsx(
              "a",
              {
                href: menu.href,
                className: `dashboard-nav__link ${isActive ? "is-active" : ""}`,
                onClick: handleNavigation,
                children: menu.label
              },
              menu.label
            );
          }) }),
          /* @__PURE__ */ jsxs("div", { className: "dashboard-sidebar__bottom", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "/profile",
                className: "dashboard-nav__link",
                onClick: handleNavigation,
                children: "Profil"
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                className: "dashboard-logout",
                onClick: () => {
                  if (onClose) {
                    onClose();
                  }
                  router.post("/logout");
                },
                children: [
                  /* @__PURE__ */ jsx("span", { className: "dashboard-logout__icon", children: "↪" }),
                  /* @__PURE__ */ jsx("span", { children: "Logout" })
                ]
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function DashboardLayout({ children }) {
  const { flash, url } = usePage().props;
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const getPageTitle = (currentUrl) => {
    const path = (currentUrl == null ? void 0 : currentUrl.split("?")[0]) ?? "";
    const pageTitles = {
      // ADMIN
      "/admin/dashboard": "Dashboard",
      "/admin/users": "Pengguna",
      "/admin/categories": "Kategori",
      "/admin/studies": "Kelola Kajian",
      // REVIEWER
      "/reviewer/dashboard": "Dashboard",
      "/reviewer/studies/active": "Sedang Direview",
      "/reviewer/analytics": "Analytics",
      // DIRECTOR
      "/director/dashboard": "Dashboard",
      "/director/analytics": "Analytics",
      // USER / PENELITI
      "/user/dashboard": "Dashboard",
      "/user/analytics": "Analytics",
      "/user/studies/create": "Ajukan Kajian"
    };
    if (pageTitles[path]) {
      return pageTitles[path];
    }
    if (path.startsWith("/admin/users/")) {
      return "Pengguna";
    }
    if (path.startsWith("/admin/categories/")) {
      return "Kategori";
    }
    if (path.startsWith("/admin/studies/")) {
      return "Kelola Kajian";
    }
    if (path.startsWith("/reviewer/studies/")) {
      return "Sedang Direview";
    }
    if (path.startsWith("/user/studies/")) {
      return "Kajian";
    }
    return "Dashboard";
  };
  const pageTitle = getPageTitle(url);
  useEffect(() => {
    const message = (flash == null ? void 0 : flash.success) || (flash == null ? void 0 : flash.error) || (flash == null ? void 0 : flash.warning) || (flash == null ? void 0 : flash.info);
    if (!message) {
      return;
    }
    const type = flash.success ? "success" : flash.error ? "error" : flash.warning ? "warning" : "info";
    setToast({
      message,
      type
    });
    const timer = setTimeout(() => {
      setToast(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [
    flash == null ? void 0 : flash.success,
    flash == null ? void 0 : flash.error,
    flash == null ? void 0 : flash.warning,
    flash == null ? void 0 : flash.info
  ]);
  return /* @__PURE__ */ jsxs("div", { className: "dashboard-shell", children: [
    /* @__PURE__ */ jsx(
      Sidebar,
      {
        isOpen: sidebarOpen,
        onClose: () => setSidebarOpen(false)
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "dashboard-main", children: [
      /* @__PURE__ */ jsxs("header", { className: "dashboard-topbar", children: [
        /* @__PURE__ */ jsx("span", { children: pageTitle }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "dashboard-mobile-menu",
            onClick: () => setSidebarOpen(true),
            "aria-label": "Buka menu",
            children: "☰"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("main", { className: "dashboard-page", children })
    ] }),
    toast && /* @__PURE__ */ jsxs(
      "div",
      {
        className: `dashboard-toast dashboard-toast--${toast.type}`,
        role: "status",
        children: [
          /* @__PURE__ */ jsxs("span", { className: "dashboard-toast__icon", children: [
            toast.type === "success" && "✓",
            toast.type === "error" && "×",
            toast.type === "warning" && "!",
            toast.type === "info" && "i"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "dashboard-toast__message", children: toast.message }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "dashboard-toast__close",
              onClick: () => setToast(null),
              "aria-label": "Tutup",
              children: "×"
            }
          )
        ]
      }
    )
  ] });
}
export {
  DashboardLayout as D
};
