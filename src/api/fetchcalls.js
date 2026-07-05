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