import {GET_ARTICLES} from "./actions";
const initialState = {
   rutaPrincipal: "",  
   articlesList: [],
};

const rootReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_ARTICLES:
            return {...state, articlesList: payload};
        default:
            return {...state};    
    };

};

export default rootReducer;