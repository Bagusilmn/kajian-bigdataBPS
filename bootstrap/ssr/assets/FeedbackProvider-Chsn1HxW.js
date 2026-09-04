import "react/jsx-runtime";
import { useContext, createContext } from "react";
const FeedbackContext = createContext(null);
function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error(
      "useFeedback harus digunakan di dalam FeedbackProvider."
    );
  }
  return context;
}
export {
  useFeedback as u
};
