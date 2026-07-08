export const doPostRequest = async (url,body) =>{
    try{
        console.log('POST : ',url,body);

        const response = await fetch(url,{
            method:'POST',
            body
        });
        const data = await response.json();
        return data;
    }catch (error){
        console.log('POST ERROR:',error);
        throw error;
    }
    
}

export const doPostStreamRequest = async (url, body) => {
    try {
        console.log("POST Stream:", url, body);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });

        if (!response.ok) {
            throw new Error("Request failed");
        }

        return response.body;
    } catch (error) {
        console.log("POST Stream Error:", error);
        throw error;
    }
};


// export const dotPostChapterNameRequest = async(url,body) =>{
//     try{
//         console.log("CHAPTER NAME POST : ",url,body);

//         const response = await fetch(url,{
//             method:"POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body,
//         });

//         if (!response){
//             throw new Error("Request Failed");
//         }

//         return response.body
//     }catch(error){
//         console.log("POST CHAPTER NAME ERROR:",error);
//         throw error;
//     }
// }