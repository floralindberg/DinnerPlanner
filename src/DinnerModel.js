import { resolvePromise } from "./resolvePromise";
import { searchDishes } from "./dishSource";
import { getDishDetails } from "./dishSource";
/*
    The Model keeps the state of the application (Application State).
    It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
const model = {
    numberOfGuests: 2,
    dishes: [],
    currentDishId: null,  // null means "intentionally empty"
    searchParams: {},
    searchResultsPromiseState: {},
    currentDishPromiseState: {},

    setCurrentDishId(dishId){
        if(!dishId || dishId === this.currentDishId){
            return;
        }
        this.currentDishId = dishId;
        resolvePromise(getDishDetails(dishId),this.currentDishPromiseState);
        console.log("nuvarande currentDishId:", dishId);
    },
    
    setNumberOfGuests(number){
        if (!Number.isInteger(number) || number <= 0) {
            throw new Error("number of guests not a positive integer");
        }
        this.numberOfGuests = number;
    },
    
    addToMenu(dishToAdd){
        // array spread syntax example. Make sure you understand the code below.
        // It sets this.dishes to a new array [   ] where we spread (...) the elements of the existing this.dishes
        this.dishes= [...this.dishes, dishToAdd];
        console.log("added:", dishToAdd.title, dishToAdd.id);
    },

    // filter callback exercise
    removeFromMenu(dishToRemove){
        function shouldWeKeepDishCB(dish){
            return dish.id != dishToRemove.id;
        }
        this.dishes= this.dishes.filter(shouldWeKeepDishCB);
    },

    

    // more methods will be added here, don't forget to separate them with comma!
    setSearchQuery(query){
        this.searchParams.query = query;
    },

    setSearchType(type){
        this.searchParams.type = type;
    },

    doSearch(params){
        resolvePromise(searchDishes(params),this.searchResultsPromiseState);
    },

};



export {model};
