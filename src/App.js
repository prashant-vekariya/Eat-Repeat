import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Component/Header/Header';
import Cart from './Container/Cart/Cart';
import Home from './Container/Home/Home';
import Login from './Container/Login/Login';
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack';
import store, { persistor } from './Redux/Store';
import { PersistGate } from 'redux-persist/integration/react'
import Category from './Admin/Container/Categoryadd/Category';
import AllCategories from './Container/Allcategories/AllCategories';
import Productadd from './Admin/Container/ProductAdd/Productadd';
import ProductaReadMore from './Container/ProductaReadMore/ProductaReadMore';
import AllProduct from './Container/AllProduct/AllProduct';


function App() {
  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Header/>
            <Switch>
              <Route exact path={"/"} component={Home} />
              <Route exact path={"/cart"} component={Cart} />
              <Route exact path={"/login"} component={Login} />
              <Route exact path={"/allcategories"} component={AllCategories} />
              <Route exact path={"/category"} component={Category}/>
              <Route exact path={"/addproduct"} component={Productadd}/>
              <Route exact path={"/productReadmore"} component={ProductaReadMore}/>
              <Route exact path={"/allproductpageination"} component={AllProduct}/>
            </Switch>
          </PersistGate>
        </Provider>
      </SnackbarProvider>
    </>
  );
}
<s></s>

export default App;
