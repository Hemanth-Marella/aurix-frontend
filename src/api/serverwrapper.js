import { doPostRequest,doPostStreamRequest } from "./fetchcalls";
import AppUrls from "./apiurls";

// UPLOAD PDF
export const uploadPdf = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const url = AppUrls.PDF_ROUTER;
  return await doPostRequest(url, formData);
};

// Upload Question
export const userQuestion = async(query) =>{
    const url = AppUrls.QUESTION_ROUTER;
    return await doPostStreamRequest(
      url,
      JSON.stringify({ query })
    );
};