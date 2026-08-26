import { jsx } from "react/jsx-runtime";
function BpsLogo({
  className = ""
}) {
  return /* @__PURE__ */ jsx(
    "img",
    {
      src: "/images/logo-bps.webp",
      alt: "Badan Pusat Statistik",
      className
    }
  );
}
export {
  BpsLogo as B
};
