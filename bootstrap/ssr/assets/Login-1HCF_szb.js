import { jsx, jsxs } from "react/jsx-runtime";
import { useForm } from "@inertiajs/react";
import { B as BpsLogo } from "./BpsLogo-CvcnsC1A.js";
function Login({
  canResetPassword,
  status
}) {
  const form = useForm({
    email: "",
    password: "",
    remember: false
  });
  function submit(event) {
    event.preventDefault();
    form.post("/login");
  }
  return /* @__PURE__ */ jsx("main", { className: "auth-page-react", children: /* @__PURE__ */ jsxs("div", { className: "auth-container-react", children: [
    /* @__PURE__ */ jsxs("div", { className: "auth-header-react", children: [
      /* @__PURE__ */ jsx("div", { className: "auth-mark-react", children: /* @__PURE__ */ jsx(BpsLogo, {}) }),
      /* @__PURE__ */ jsx("div", { className: "auth-eyebrow", children: "KAJIAN BIG DATA BPS" }),
      /* @__PURE__ */ jsx("h1", { children: "Masuk" }),
      /* @__PURE__ */ jsx("p", { children: "Akses platform Kajian Big Data BPS" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "auth-card-react", children: [
      status && /* @__PURE__ */ jsx("div", { className: "auth-status", children: status }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
        /* @__PURE__ */ jsxs("div", { className: "auth-field-react", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "email",
              type: "email",
              value: form.data.email,
              onChange: (event) => form.setData(
                "email",
                event.target.value
              ),
              autoFocus: true,
              autoComplete: "username",
              placeholder: "nama@email.com"
            }
          ),
          form.errors.email && /* @__PURE__ */ jsx("div", { className: "auth-error", children: form.errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "auth-field-react", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "password", children: "Password" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "password",
              type: "password",
              value: form.data.password,
              onChange: (event) => form.setData(
                "password",
                event.target.value
              ),
              autoComplete: "current-password",
              placeholder: "Masukkan password"
            }
          ),
          form.errors.password && /* @__PURE__ */ jsx("div", { className: "auth-error", children: form.errors.password })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "auth-options-react", children: [
          /* @__PURE__ */ jsxs("label", { children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: form.data.remember,
                onChange: (event) => form.setData(
                  "remember",
                  event.target.checked
                )
              }
            ),
            /* @__PURE__ */ jsx("span", { children: "Ingat saya" })
          ] }),
          canResetPassword && /* @__PURE__ */ jsx(
            "a",
            {
              href: "/forgot-password",
              className: "auth-link-react",
              children: "Lupa password?"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "auth-button-react",
            disabled: form.processing,
            children: form.processing ? "Memproses..." : "Masuk"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "auth-footer-react", children: [
        /* @__PURE__ */ jsx("span", { children: "Belum memiliki akun?" }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/register",
            className: "auth-link-react",
            children: "Daftar"
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  Login as default
};
