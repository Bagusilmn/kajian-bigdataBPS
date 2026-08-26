import { jsx, jsxs } from "react/jsx-runtime";
import { useForm } from "@inertiajs/react";
import { B as BpsLogo } from "./BpsLogo-Bc2wSHH6.js";
function VerifyEmail({ status }) {
  const verificationForm = useForm({});
  const logoutForm = useForm({});
  function resendVerification() {
    verificationForm.post("/email/verification-notification");
  }
  function logout(event) {
    event.preventDefault();
    logoutForm.post("/logout");
  }
  return /* @__PURE__ */ jsx("main", { className: "auth-page-react", children: /* @__PURE__ */ jsxs("div", { className: "auth-container-react", children: [
    /* @__PURE__ */ jsxs("div", { className: "auth-header-react", children: [
      /* @__PURE__ */ jsx("div", { className: "auth-mark-react", children: /* @__PURE__ */ jsx(BpsLogo, {}) }),
      /* @__PURE__ */ jsx("div", { className: "auth-eyebrow", children: "KAJIAN BIG DATA BPS" }),
      /* @__PURE__ */ jsx("h1", { children: "Verifikasi Email" }),
      /* @__PURE__ */ jsx("p", { children: "Satu langkah lagi sebelum masuk ke platform." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "auth-card-react", children: [
      /* @__PURE__ */ jsx("div", { className: "auth-description", children: "Terima kasih telah mendaftar. Silakan verifikasi alamat email dengan mengklik tautan yang telah kami kirimkan." }),
      status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "auth-status", children: "Tautan verifikasi baru telah dikirim ke alamat email yang kamu gunakan saat mendaftar." }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "auth-button-react",
          onClick: resendVerification,
          disabled: verificationForm.processing,
          children: verificationForm.processing ? "Mengirim..." : "Kirim Ulang Email Verifikasi"
        }
      ),
      /* @__PURE__ */ jsx("form", { onSubmit: logout, children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "auth-logout-link",
          disabled: logoutForm.processing,
          children: "Keluar"
        }
      ) })
    ] })
  ] }) });
}
export {
  VerifyEmail as default
};
