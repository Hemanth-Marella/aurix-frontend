export const API_BASE_URL = "http://localhost:8000/Aurix/api/v1/"

class Appurls{
    constructor(){
        this.initurls();
    }

    initurls(){
        // PDF ROUTER
        this.PDF_ROUTER = API_BASE_URL + 'pdf/upload';

        // QUESTION ROUTER
        this.QUESTION_ROUTER = API_BASE_URL + 'user/question';

        // SUMMARY ROUTER
        this.SUMMARY_ROUTER = API_BASE_URL + 'summary/summaryApi';

    }
}

const appurls = new Appurls();

export default appurls;