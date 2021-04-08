const base_url = "http://139.59.110.100/api/";

/**
API Caller helper to refactor common API code that requires bearer tokens (all http requests have POST method)
@param {string} api API URL
@param {object} body body needed for the API call (pass as empty object if not needed)
@param {number} successCode success status code e.g. 200
@param {function} dataReturner data returning function, processes data to return it in a specific format
@param {function} rejectWithValue  rejectWithValue function for that specific async thunk that calls it
*/

export default async function api(api, body, successCode, dataReturner,) {
    try {
        let req_init = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`, 
            },
        }
        // if body is an empty object, do not include it
        if (!(Object.keys(body).length === 0 && body.constructor === Object)) {
            req_init['body'] = JSON.stringify(body);
        }

        api = base_url + api;
        const res = await fetch(api, req_init);

        if (res.ok) {
            const data = await res.json()
            return data
        }
        throw new Error(`${res.status}, ${res.statusText}`)
    }
    catch (err) {
        return err
        console.log(err)
        return err.toString()
    }
}



// /**
// API Caller helper to refactor common API code that requires bearer tokens (all http requests have POST method)
// @param {string} api API URL
// @param {object} body body needed for the API call (pass as empty object if not needed)
// @param {number} successCode success status code e.g. 200
// @param {function} dataReturner data returning function, processes data to return it in a specific format
// @param {function} rejectWithValue  rejectWithValue function for that specific async thunk that calls it
// */

// export async function api(api, body, successCode, dataReturner,) {
//     try {
//         let req_init = {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.token}`,
//             },
//         }
//         // if body is an empty object, do not include it
//         if (!(Object.keys(body).length === 0 && body.constructor === Object)) {
//             req_init['body'] = JSON.stringify(body);
//         }

//         api = base_url + api;
//         const res = await fetch(api, req_init);

//         if (res.ok) {
//             console.log("lolll")
//             const data = await res.json()
//             if (data.statusCode != successCode) {
//                 return data
//             }
//             return data
//         }
//         throw new Error(`${res.status}, ${res.statusText}`)
//     }
//     catch (err) {
//         return err
//         return err.toString()
//     }
// }