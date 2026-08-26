import { jsx, jsxs } from "react/jsx-runtime";
import { B as BpsLogo } from "./BpsLogo-Bc2wSHH6.js";
import { useForm } from "@inertiajs/react";
function ConfirmPassword() {
  const form = useForm({
    password: ""
  });
  function submit(event) {
    event.preventDefault();
    form.post("/confirm-password");
  }
  return /* @__PURE__ */ jsx("main", { className: "auth-page-react", children: /* @__PURE__ */ jsxs("div", { className: "auth-container-react", children: [
    /* @__PURE__ */ jsxs("div", { className: "auth-header-react", children: [
      /* @__PURE__ */ jsx("div", { className: "auth-mark-react", children: /* @__PURE__ */ jsx(BpsLogo, {}) }),
      /* @__PURE__ */ jsx("div", { className: "auth-eyebrow", children: "KAJIAN BIG DATA BPS" }),
      /* @__PURE__ */ jsx("h1", { children: "Konfirmasi Password" }),
      /* @__PURE__ */ jsx("p", { children: "Verifikasi password sebelum melanjutkan ke area aman." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "auth-card-react", children: [
      /* @__PURE__ */ jsx("div", { className: "auth-description", children: "Ini adalah area aman aplikasi. Silakan konfirmasi password kamu sebelum melanjutkan." }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
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
              autoFocus: true,
              autoComplete: "current-password",
              placeholder: "Masukkan password"
            }
          ),
          form.errors.password && /* @__PURE__ */ jsx("div", { className: "auth-error", children: form.errors.password })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "auth-button-react",
            disabled: form.processing,
            children: form.processing ? "Memverifikasi..." : "Konfirmasi"
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  ConfirmPassword as default
};
