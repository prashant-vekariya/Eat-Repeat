import * as ActionType from '../ActionType'

const intialState = {
    isLoding : false,
    order:[],
    error:''

}

export const checkoutreducer = (state = intialState , action) =>{
    switch (action.type) {
        case ActionType.CHEACKOUT_POST:
            
            break;
    
        default:
            break;
    }
}