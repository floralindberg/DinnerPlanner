import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set} from "/src/teacherFirebase.js";
import { firebaseConfig } from "./firebaseConfig";
import { getMenuDetails, searchDishes } from "./dishSource";

// Initialise firebase app, database, ref
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const PATH = "dinnerModel12"
const rf= ref(db, PATH+"/test")

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

function persistenceToModel(data, model) {
    function setDishInModelACB(param) {
        model.dishes = param;
        console.log(param);
    }

    if(!data){
        data = {};
    }

    if(!(data.arrayOfDishIDs)){
        data.arrayOfDishIDs = [];
    }

    if(!data.nOfGsts){
        model.setNumberOfGuests(2)
    }
    else {
    model.setNumberOfGuests(data.nOfGsts);
    }
    
    if(!data.currDishID){
        model.setCurrentDishId(null)
    }
    else{
    model.setCurrentDishId(data.currDishID);
    }

    return getMenuDetails(data.arrayOfDishIDs).then(setDishInModelACB);
}

function saveToFirebase(model){
    if(model.ready){
    set(ref(db, PATH+"/test"),modelToPersistence(model))
    }
}

function readFromFirebase(model){
    function convertingBackACB(cloudDt){
        model.ready = true
        return persistenceToModel(cloudDt.val(),model) 
    }
    model.ready= false
    return get(ref(db, PATH+"/test")).then(convertingBackACB)
}

function connectToFirebase(model, watchFunction){
    function checkModelPropertiesCombACB(){
        console.log();
        return [model.numberOfGuests,model.dishes,model.currentDishId];
    }

    function saveModelToFirebaseACB(){
        if (model.ready) {
            saveToFirebase(model);
        }
        
    }
    readFromFirebase(model),
    watchFunction(checkModelPropertiesCombACB,saveModelToFirebaseACB);
}
// Remember to uncomment the following line:
export { connectToFirebase, modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase }
