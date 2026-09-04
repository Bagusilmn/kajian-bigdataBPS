import { jsx, jsxs } from "react/jsx-runtime";
import { usePage, useForm } from "@inertiajs/react";
import { D as DashboardLayout } from "./DashboardLayout-Y_7hl2u9.js";
import { u as useFeedback } from "./FeedbackProvider-Chsn1HxW.js";
import "react";
import "./BpsLogo-CvcnsC1A.js";
function Edit({ user }) {
  const {
    openConfirm
  } = useFeedback();
  const { flash } = usePage().props;
  const profileForm = useForm({
    name: user.name ?? "",
    email: user.email ?? ""
  });
  const passwordForm = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const deleteForm = useForm({
    password: ""
  });
  function updateProfile(event) {
    event.preventDefault();
    profileForm.patch("/profile");
  }
  function updatePassword(event) {
    event.preventDefault();
    passwordForm.put("/password", {
      onSuccess: () => {
        passwordForm.reset();
      }
    });
  }
  function deleteAccount(event) {
    event.preventDefault();
    openConfirm({
      title: "Hapus Akun?",
      message: "Akun kamu akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.",
      confirmText: "Ya, Hapus Akun",
      cancelText: "Batal",
      danger: true,
      onConfirm: () => {
        deleteForm.delete("/profile", {
          onSuccess: () => {
          }
        });
      }
    });
  }
  return /* @__PURE__ */ jsx(DashboardLayout, { children: /* @__PURE__ */ jsxs("div", { className: "profile-page", children: [
    /* @__PURE__ */ jsxs("div", { className: "profile-header", children: [
      /* @__PURE__ */ jsx("div", { className: "dashboard-eyebrow", children: "ACCOUNT SETTINGS" }),
      /* @__PURE__ */ jsx("h1", { children: "Profile" }),
      /* @__PURE__ */ jsx("p", { children: "Kelola informasi akun dan keamanan profil kamu." })
    ] }),
    (flash == null ? void 0 : flash.status) === "profile-updated" && /* @__PURE__ */ jsx("div", { className: "profile-success", children: "Informasi profil berhasil diperbarui." }),
    /* @__PURE__ */ jsxs("section", { className: "profile-card", children: [
      /* @__PURE__ */ jsx("div", { className: "profile-card__heading", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Informasi Profil" }),
        /* @__PURE__ */ jsx("p", { children: "Perbarui nama dan alamat email akun." })
      ] }) }),
      /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: updateProfile,
          className: "profile-form",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "profile-field", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "name", children: "Nama" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "name",
                  type: "text",
                  value: profileForm.data.name,
                  onChange: (event) => profileForm.setData(
                    "name",
                    event.target.value
                  )
                }
              ),
              profileForm.errors.name && /* @__PURE__ */ jsx("div", { className: "form-error", children: profileForm.errors.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "profile-field", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "email", children: "Email" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "email",
                  type: "email",
                  value: profileForm.data.email,
                  onChange: (event) => profileForm.setData(
                    "email",
                    event.target.value
                  )
                }
              ),
              profileForm.errors.email && /* @__PURE__ */ jsx("div", { className: "form-error", children: profileForm.errors.email })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "dashboard-primary-button",
                disabled: profileForm.processing,
                children: profileForm.processing ? "Menyimpan..." : "Simpan Perubahan"
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "profile-card", children: [
      /* @__PURE__ */ jsx("div", { className: "profile-card__heading", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Ubah Password" }),
        /* @__PURE__ */ jsx("p", { children: "Gunakan password yang kuat untuk menjaga keamanan akun." })
      ] }) }),
      /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: updatePassword,
          className: "profile-form",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "profile-field", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "current_password", children: "Password Saat Ini" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "current_password",
                  type: "password",
                  value: passwordForm.data.current_password,
                  onChange: (event) => passwordForm.setData(
                    "current_password",
                    event.target.value
                  )
                }
              ),
              passwordForm.errors.current_password && /* @__PURE__ */ jsx("div", { className: "form-error", children: passwordForm.errors.current_password })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "profile-field", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "password", children: "Password Baru" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "password",
                  type: "password",
                  value: passwordForm.data.password,
                  onChange: (event) => passwordForm.setData(
                    "password",
                    event.target.value
                  )
                }
              ),
              passwordForm.errors.password && /* @__PURE__ */ jsx("div", { className: "form-error", children: passwordForm.errors.password })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "profile-field", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "password_confirmation", children: "Konfirmasi Password" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "password_confirmation",
                  type: "password",
                  value: passwordForm.data.password_confirmation,
                  onChange: (event) => passwordForm.setData(
                    "password_confirmation",
                    event.target.value
                  )
                }
              ),
              passwordForm.errors.password_confirmation && /* @__PURE__ */ jsx("div", { className: "form-error", children: passwordForm.errors.password_confirmation })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "dashboard-primary-button",
                disabled: passwordForm.processing,
                children: passwordForm.processing ? "Memperbarui..." : "Ubah Password"
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "profile-card profile-card--danger", children: [
      /* @__PURE__ */ jsx("div", { className: "profile-card__heading", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Hapus Akun" }),
        /* @__PURE__ */ jsx("p", { children: "Penghapusan akun bersifat permanen dan tidak dapat dibatalkan." })
      ] }) }),
      /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: deleteAccount,
          className: "profile-form",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "profile-field", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "delete_password", children: "Password" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "delete_password",
                  type: "password",
                  value: deleteForm.data.password,
                  onChange: (event) => deleteForm.setData(
                    "password",
                    event.target.value
                  ),
                  placeholder: "Konfirmasi dengan password"
                }
              ),
              deleteForm.errors.password && /* @__PURE__ */ jsx("div", { className: "form-error", children: deleteForm.errors.password })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "profile-danger-button",
                disabled: deleteForm.processing,
                children: deleteForm.processing ? "Menghapus..." : "Hapus Akun"
              }
            )
          ]
        }
      )
    ] })
  ] }) });
}
export {
  Edit as default
};
