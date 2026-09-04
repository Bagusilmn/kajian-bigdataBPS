import { jsx, jsxs } from "react/jsx-runtime";
import { useForm } from "@inertiajs/react";
import { B as BpsLogo } from "./BpsLogo-CvcnsC1A.js";
function ForgotPassword({ status }) {
  const form = useForm({
    email: ""
  });
  function submit(event) {
    event.preventDefault();
    form.post("/forgot-password");
  }
  return /* @__PURE__ */ jsx("main", { className: "auth-page-react", children: /* @__PURE__ */ jsxs("div", { className: "auth-container-react", children: [
    /* @__PURE__ */ jsxs("div", { className: "auth-header-react", children: [
      /* @__PURE__ */ jsx("div", { className: "auth-mark-react", children: /* @__PURE__ */ jsx(BpsLogo, {}) }),
      /* @__PURE__ */ jsx("div", { className: "auth-eyebrow", children: "KAJIAN BIG DATA BPS" }),
      /* @__PURE__ */ jsx("h1", { children: "Lupa Password?" }),
      /* @__PURE__ */ jsx("p", { children: "Kami akan mengirimkan link untuk mengatur ulang password akunmu." })
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
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "auth-button-react",
            disabled: form.processing,
            children: form.processing ? "Mengirim..." : "Kirim Link Reset"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "auth-footer-react", children: [
        /* @__PURE__ */ jsx("span", { children: "Ingat password?" }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/login",
            className: "auth-link-react",
            children: "Kembali ke Login"
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  ForgotPassword as default
};
