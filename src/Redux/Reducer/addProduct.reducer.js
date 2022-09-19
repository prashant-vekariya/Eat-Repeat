import * as ActionType from '../ActionType'

const initialstate={
    isLoding : false,
    product : [],
    error:''
 }

export const productreducer = (state = initialstate, action) => {
    // console.log(action.payload)
    switch (action.type) {
        case ActionType.PIZZA_ADD_DATA:
            return{
                ...state,
                isLoding:false,
                product:state.product.concat(action.payload),
                error:''
            }
        case ActionType.PIZZA_GET_DATA:
            return{
                ...state,
                isLoding:false,
                product:action.payload,
                error:''
            }
        case ActionType.PIZZA_DELETE_DATA:
            return{
                ...state,
                isLoading:false,
                product:state.product.filter((p)=>p.id !== action.payload),
                error:'' 
            }
        case ActionType.PIZZA_UPDATE_DATA:
            return {
                ...state,
                isLoading: false,
                product: state.product.map((p) =>{
                    if(p.id === action.payload.id){
                        return action.payload
                    }
                    else{
                        return p;   
                    }
                }),
                error: ''
            }
            case ActionType.ALL_DATA_FILTER:
                return{
                    ...state,
                    isLoading:false,
                    product:state.product.filter((p)=>p.category === action.payload),
                    error:''  
                }
        default:
            return state
    }
} 