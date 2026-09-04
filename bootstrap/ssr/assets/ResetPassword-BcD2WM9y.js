import { jsx, jsxs } from "react/jsx-runtime";
import { useForm } from "@inertiajs/react";
import { B as BpsLogo } from "./BpsLogo-CvcnsC1A.js";
function ResetPassword({
  token,
  email
}) {
  const form = useForm({
    token: token ?? "",
    email: email ?? "",
    password: "",
    password_confirmation: ""
  });
  function submit(event) {
    event.preventDefault();
    form.post("/reset-password");
  }
  return /* @__PURE__ */ jsx("main", { className: "auth-page-react", children: /* @__PURE__ */ jsxs("div", { className: "auth-container-react", children: [
    /* @__PURE__ */ jsxs("div", { className: "auth-header-react", children: [
      /* @__PURE__ */ jsx("div", { className: "auth-mark-react", children: /* @__PURE__ */ jsx(BpsLogo, {}) }),
      /* @__PURE__ */ jsx("div", { className: "auth-eyebrow", children: "KAJIAN BIG DATA BPS" }),
      /* @__PURE__ */ jsx("h1", { children: "Reset Password" }),
      /* @__PURE__ */ jsx("p", { children: "Buat password baru untuk akunmu." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "auth-card-react", children: [
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
              autoComplete: "username"
            }
          ),
          form.errors.email && /* @__PURE__ */ jsx("div", { className: "auth-error", children: form.errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "auth-field-react", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "password", children: "Password Baru" }),
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
              autoComplete: "new-password",
              placeholder: "Masukkan password baru"
            }
          ),
          form.errors.password && /* @__PURE__ */ jsx("div", { className: "auth-error", children: form.errors.password })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "auth-field-react", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "password_confirmation", children: "Konfirmasi Password" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "password_confirmation",
              type: "password",
              value: form.data.password_confirmation,
              onChange: (event) => form.setData(
                "password_confirmation",
                event.target.value
              ),
              autoComplete: "new-password",
              placeholder: "Ulangi password baru"
            }
          ),
          form.errors.password_confirmation && /* @__PURE__ */ jsx("div", { className: "auth-error", children: form.errors.password_confirmation })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "auth-button-react",
            disabled: form.processing,
            children: form.processing ? "Menyimpan..." : "Reset Password"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "auth-footer-react", children: /* @__PURE__ */ jsx(
        "a",
        {
          href: "/login",
          className: "auth-link-react",
          children: "Kembali ke Login"
        }
      ) })
    ] })
  ] }) });
}
export {
  ResetPassword as default
};
