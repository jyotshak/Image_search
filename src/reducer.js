
const initialState = {
    search_history : [],
    serial : 0,
    search_hint: []
}

export function Searcher( state = initialState, action ){
    switch(action.type){
        case "AddSearch" :
            return {
                ...state,
                search_history : [...state.search_history, action.payload],
                serial : state.serial+1
            };
        case "AddHint" :
            return {
                ...state,
                
            }
    }
}