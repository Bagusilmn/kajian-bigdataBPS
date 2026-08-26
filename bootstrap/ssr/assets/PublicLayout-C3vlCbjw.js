import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import { B as BpsLogo } from "./BpsLogo-Bc2wSHH6.js";
function Navbar() {
  var _a, _b;
  const { auth } = usePage().props;
  const user = auth == null ? void 0 : auth.user;
  const [showProfile, setShowProfile] = useState(false);
  const roleLabel = {
    user: "Peneliti",
    reviewer: "Reviewer",
    director: "Direktur",
    admin: "Administrator"
  };
  const handleLogout = () => {
    router.post("/logout");
  };
  return /* @__PURE__ */ jsx("nav", { className: "site-navbar", children: /* @__PURE__ */ jsxs("div", { className: "site-navbar__inner", children: [
    /* @__PURE__ */ jsxs(
      "a",
      {
        href: "/",
        className: "site-brand",
        children: [
          /* @__PURE__ */ jsx("span", { className: "site-brand__mark", children: /* @__PURE__ */ jsx(BpsLogo, {}) }),
          /* @__PURE__ */ jsxs("span", { className: "site-brand__text", children: [
            /* @__PURE__ */ jsx("strong", { children: "KAJIAN BIG DATA BPS" }),
            /* @__PURE__ */ jsx("small", { children: "Badan Pusat Statistik" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "site-nav", children: [
      /* @__PURE__ */ jsx("a", { href: "/", children: "Beranda" }),
      /* @__PURE__ */ jsx("a", { href: "/kajian", children: "Kajian" }),
      /* @__PURE__ */ jsx("a", { href: "/#topics", children: "Topik" }),
      user && /* @__PURE__ */ jsxs("div", { className: "site-profile", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            className: "site-profile__button",
            onClick: () => setShowProfile(!showProfile),
            children: [
              /* @__PURE__ */ jsx("span", { className: "site-profile__avatar", children: ((_b = (_a = user.name) == null ? void 0 : _a.charAt(0)) == null ? void 0 : _b.toUpperCase()) ?? "U" }),
              /* @__PURE__ */ jsxs("span", { className: "site-profile__info", children: [
                /* @__PURE__ */ jsx("strong", { children: user.name }),
                /* @__PURE__ */ jsx("small", { children: roleLabel[user.role] ?? "Pengguna" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "site-profile__arrow", children: showProfile ? "▲" : "▼" })
            ]
          }
        ),
        showProfile && /* @__PURE__ */ jsxs("div", { className: "site-profile__dropdown", children: [
          /* @__PURE__ */ jsxs("div", { className: "site-profile__dropdown-header", children: [
            /* @__PURE__ */ jsx("strong", { children: user.name }),
            /* @__PURE__ */ jsx("span", { children: roleLabel[user.role] ?? "Pengguna" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "site-profile__dropdown-divider" }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/dashboard",
              className: "site-profile__dropdown-item",
              children: "Dashboard"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/profile",
              className: "site-profile__dropdown-item",
              children: "Profil"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "site-profile__dropdown-divider" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "site-profile__dropdown-item site-profile__dropdown-item--logout",
              onClick: handleLogout,
              children: "Logout"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "site-footer", children: [
    /* @__PURE__ */ jsxs("div", { className: "site-footer__inner", children: [
      /* @__PURE__ */ jsxs("div", { className: "site-footer__brand", children: [
        /* @__PURE__ */ jsx("span", { className: "site-brand__mark", children: /* @__PURE__ */ jsx(BpsLogo, {}) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: "KAJIAN BIG DATA BPS" }),
          /* @__PURE__ */ jsx("p", { children: "Platform kajian dan eksplorasi pemanfaatan Big Data untuk mendukung statistik resmi." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "site-footer__links", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "site-footer__heading", children: "NAVIGASI" }),
          /* @__PURE__ */ jsx("a", { href: "/", children: "Beranda" }),
          /* @__PURE__ */ jsx("a", { href: "/kajian", children: "Kajian" }),
          /* @__PURE__ */ jsx("a", { href: "/#topics", children: "Topik" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "site-footer__heading", children: "PLATFORM" }),
          /* @__PURE__ */ jsx("a", { href: "/login", children: "Masuk" }),
          /* @__PURE__ */ jsx("a", { href: "/register", children: "Daftar" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "site-footer__bottom", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Badan Pusat Statistik"
      ] }),
      /* @__PURE__ */ jsx("div", { children: "Kajian Big Data BPS" })
    ] })
  ] });
}
function PublicLayout({ children }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { children }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  PublicLayout as P
};
