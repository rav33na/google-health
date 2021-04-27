import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Success from "./Success";
import Scan from "./Scan"


function App() {

 
  return (
    <div className="App">
    <BrowserRouter>
            <Switch>
          <Route path="/" exact component={Scan} />
          <Route path="/success" component={Success} />
          </Switch>
         </BrowserRouter>
</div>
  );
}


export default App;
