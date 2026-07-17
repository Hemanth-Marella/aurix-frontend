import { doPostRequest,doPostStreamRequest, doPostSummaryRequest } from "./fetchcalls";
import AppUrls from "./apiurls";

// UPLOAD PDF
export const uploadPdf = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const url = AppUrls.PDF_ROUTER;
  return await doPostRequest(url, formData);
};

// Upload Question
export const userQuestion = async(query,file_hash) =>{
    const url = AppUrls.QUESTION_ROUTER;
    return await doPostStreamRequest(
      url,
      JSON.stringify({ query,file_hash })
    );
};

export const summary =async(chapter_name) => {
  const url = AppUrls.SUMMARY_ROUTER;
  return await doPostSummaryRequest(
    url,
    JSON.stringify({ chapter_name })
  );
};
