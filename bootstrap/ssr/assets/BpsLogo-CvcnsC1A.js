import { jsx } from "react/jsx-runtime";
function BpsLogo({
  className = ""
}) {
  return /* @__PURE__ */ jsx(
    "img",
    {
      src: "/images/logo-bps.webp",
      alt: "Badan Pusat Statistik",
      width: "64",
      height: "64",
      className
    }
  );
}
export {
  BpsLogo as B
};
