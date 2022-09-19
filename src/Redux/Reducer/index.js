import { combineReducers } from "redux";
import { alertReducer } from "./Alert.Reducer";
import { authReducer } from "./Auth.Reducer";
import { addcategories} from "./addcategory.reducer";
import { productreducer } from "./addProduct.reducer";
import { cartReducer } from "./cart.reducer";

export const rootReducer = combineReducers({
    product:productreducer,
    auth:authReducer,
    alert:alertReducer,
    categories:addcategories,
    cart:cartReducer
})