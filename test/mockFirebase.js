const mockDB={};

function getDatabase(){
    return mockDB;
}

const state={
    refHistory:[],
    getHistory:[],
    setHistory:[],
    onHistory:[],
    data:null,
    onACB:null,
};


function initDB(persistencePropNames){    // returns false if initialization fails
    if(!persistencePropNames) return false;
    // we make a best effort to initialize some data
    const {numberOfGuests, dishes, currentDishId}= persistencePropNames;
    if(!(numberOfGuests && dishes && currentDishId))
        return false;
    state.data={
        [numberOfGuests]:13,
        [dishes]:[ 45, 42, 22],
        [currentDishId]: 42
    };
    state.initialized= true;
    return true;
}

    
function ref(db, path){
    state.refHistory.push({db, path});
    return {db, path};
}

function get(rf, acb){
    if(!state.initialized)
        console.warn("mock firebase get() used without initialization");
    state.getHistory.push({ref:rf, acb});
    const ret= {
        val(){ return state.data; }
    };
    if(acb) acb(ret);
    return Promise.resolve(ret);
}

function set(rf, val){
    state.setHistory.push({ref:rf, val});
    state.data= val;
}

function onValue(rf, acb){
    state.onACB= acb;
    state.onHistory.push({ref:rf, acb});
    //acb(state.data);
}

export {getDatabase, ref, get, set, onValue, initDB, state};

