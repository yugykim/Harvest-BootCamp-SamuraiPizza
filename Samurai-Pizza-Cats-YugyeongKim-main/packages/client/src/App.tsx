import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Nav from './components/Nav';
import Toppings from './components/toppings/Toppings';
import Pizzas from './components/pizzas/Pizzas';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/pizzas" component={Pizzas} exact />ß
        <Route path="/toppings" component={Toppings} exact />
        <Route path="/" component={Home} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
