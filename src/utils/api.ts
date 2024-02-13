export const makePostRequest = (url:string, {}) => {
    return fetch(url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        })
        .then((response) => response.json());
};