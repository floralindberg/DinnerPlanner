import { PROXY_URL } from "./apiConfig";
import { PROXY_KEY } from "./apiConfig";


export function searchDishes(searchParams){
    return fetch(url + "complexSearch", { method: 'GET',
        headers: {
            'X-DH2642-key': PROXY_KEY,
            'X-DH2642-Group': "12"
        },}).then(gotResponseACB);
}

//{method: "GET", headers: { "X-DH2642-key": PROXY_KEY, "X-DH2642-Group":"X-DH2642-12" },}

function responseACB(response){
    return console.log(response); //alternativt response.json()
}

function gotResponseACB(url){
     return fetch(url).then(responseACB)
}

const url = PROXY_URL;
const options = {
	method: 'GET',
	headers: {
		'X-DH2642-key': PROXY_KEY,
		'X-DH2642-Group': "12"
	}
};

