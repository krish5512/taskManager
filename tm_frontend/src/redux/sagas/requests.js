export const getApi = async req => {
    // const request = action.payload;
    console.log({
        req
    })
    const url= '/users/login';
    console.log({url})
    const body =  await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(req),
    });  
    return body.json()
}