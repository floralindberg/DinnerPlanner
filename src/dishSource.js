import { PROXY_URL } from "./apiConfig";
import { PROXY_KEY } from "./apiConfig";


export function searchDishes(searchParams){
    return fetch(PROXY_URL + "/recipes/complexSearch", {
        headers: {
            "X-DH2642-Key": PROXY_KEY,
            'X-DH2642-Group' : "12",
        }
    }).then(gotResponseACB).then(someACB);
}

function gotResponseACB(response){
    console.log(response);
}

function someACB(param){
    console.log(param);
}