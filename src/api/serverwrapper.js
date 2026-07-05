import { doPostRequest } from "./fetchcalls";
import AppUrls from "./apiurls";

// UPLOAD PDF
export const uploadPdf = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const url = AppUrls.PDF_ROUTER;
  return await doPostRequest(url, formData);
};