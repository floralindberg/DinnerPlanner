import { PROXY_URL } from "./apiConfig";
import { PROXY_KEY } from "./apiConfig";


export function searchDishes(searchParams){
    return fetch(PROXY_URL + "/recipes/complexSearch" + "?" + new URLSearchParams(searchParams), {
        method: "GET",
        headers: {
            "X-DH2642-Key": PROXY_KEY,
            'X-DH2642-Group' : "12",
        }
    }).then(gotResponseACB).then(someACB);
}

function gotResponseACB(response){
    console.log(response);
    return response.json();
}

function someACB(param){
    console.log(param);
    return param.results;
}

export function getMenuDetails(ids_array){
    
}