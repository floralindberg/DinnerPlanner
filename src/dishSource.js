import { PROXY_URL } from "./apiConfig";
import { PROXY_KEY } from "./apiConfig";


export function searchDishes(searchParams) {
    return fetch(PROXY_URL + "/recipes/complexSearch" + "?" + new URLSearchParams(searchParams), {
        headers: {
            "X-DH2642-Key": PROXY_KEY,
            'X-DH2642-Group': "12",
        }
    }).then(gotResponseACB).then(someACB);
}

function gotResponseACB(response) {
    console.log(response);
    return response.json();
}

function someACB(param) {
    console.log(param);
    return param.results;
}

export function getMenuDetails(ids_array) {
    return fetch(PROXY_URL + "/recipes/informationBulk" + "?" + new URLSearchParams({ ids: ids_array.join(",") }), {
        headers: {
            "X-DH2642-Key": PROXY_KEY,
            "X-DH2642-Group": "12",
        }
    }).then(menuResponseACB).then(menuACB);
}

function menuResponseACB(response) {
    if(!(response.status === 200)) {
        throw Error("wrong");
    }
    console.log(response);
    return response.json();
}

function menuACB(param) {
    console.log(param);
    return param;
}

export function getDishDetails(id){
    return getMenuDetails(id).then(arrToObjACB)
}

function arrToObjACB(arr){

}