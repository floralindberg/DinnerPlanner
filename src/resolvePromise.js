export function resolvePromise(prms, promiseState){
    if(prms) {
        promiseState.promise = prms;
        promiseState.data = null;
        promiseState.error = null;
        prms.then(resolvedACB).catch(rejectedACB)
    }

    function resolvedACB(dt){
        if(promiseState.promise === prms){
            promiseState.data = dt;
        }
    }

    function rejectedACB(err){
        promiseState.error = err;
    }

}