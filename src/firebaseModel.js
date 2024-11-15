import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set} from "/src/teacherFirebase.js";
import { firebaseConfig } from "./firebaseConfig";
import { model } from "/src/DinnerModel.js";
import { getMenuDetails, searchDishes } from "./dishSource";

// Initialise firebase app, database, ref
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const PATH = "dinnerModel12"

/*set(ref(db, PATH+"/test"), modelToPersistence({
    numberOfGuests:5,
    currentDishId:13,
    dishes:[{id:13, title:"dummy1"},{id:42, title: "dummy2"}]
}));*/

function modelToPersistence(model){
    return {
        nOfGsts: model.numberOfGuests,
        arrayOfDishIDs: [...model.dishes].map(getIdsCB).sort(sortDishesCB),
        currDishID: model.currentDishId
    };
}

function sortDishesCB(id1,id2){
    return id1 - id2
}

function getIdsCB(param){
    return param.id;
}

function persistenceToModel(data, model){
    function setDishInModelACB(param){
        model.setCurrentDishID(param)
    }
    if(!(data.arrayOfDishIDs)){
        data.arrayOfDishIDs = [];
    }
    return getMenuDetails(data.arrayOfDishIDs).then(setDishInModelACB)
}

function saveToFirebase(model){
    // TODO
}
function readFromFirebase(model){
    // TODO
}
function connectToFirebase(model, watchFunction){
    // TODO
}
// Remember to uncomment the following line:
export { connectToFirebase, modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase }
