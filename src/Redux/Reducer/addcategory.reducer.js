import * as ActionType from '../ActionType'

const initialstate={
    isLoding : false,
    category : [],
    error:''
 }

export const addcategories = (state = initialstate, action) => {
    // console.log(action.payload)
    switch (action.type) {
        case ActionType.CATEGORY_ADD_DATA:
            return{
                ...state,
                isLoding:false,
                category:state.category.concat(action.payload),
                error:''
            }
        case ActionType.CATEGORY_GET_DATA:
            return{
                ...state,
                isLoding:false,
                category:action.payload,
                error:''
            }
        case ActionType.CATEGORY_DELETE_DATA:
            return{
                ...state,
                isLoading:false,
                category:state.category.filter((p)=>p.id !== action.payload)  
            }
        case ActionType.CATEGORY_UPDATE_DATA:
            return {
                ...state,
                isLoading: false,
                category: state.category.map((p) =>{
                    if(p.id === action.payload.id){
                        return action.payload
                    }
                    else{
                        return p;   
                    }
                }),
                error: ''
            }
        default:
            return state
    }
} 