import React,{useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Classes from './Classes';
import Header from './Header';
import Login from "./Templates/Login";
import { roleContextProvider } from './context/roleContext';
import { LoginContextProvider } from './context/loginContext';
import AddClass from './Templates/AddClass';
import EditClass from './Templates/EditClass';
import Students from "./Students";
import AddStudent from './Templates/AddStudent';
import EditStudent from './Templates/EditStudent';
import Parent from './Parents';
import Transactions from './Transactions';
const history = createBrowserHistory();

function App() {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setisLoggedIn] = useState(token ? true : false);
  const [role,updateRole] = useState("");
  const toggleLogIn = () => setisLoggedIn(isLoggedIn ? false : true);

  return (
    <Router history={history}>
      <div>
        <LoginContextProvider value = {{isLoggedIn,toggleLogIn}}>
          <roleContextProvider value = {{role,updateRole}}>
            <Header />
            <Switch>
              <Route exact path="/login" render={() => <Login history={history} />} />
              <Route exact path = "/students/:id" component = {Students}/>
              <Route exact path="/classes" render={() => <Classes />} />
              <Route exact path = "/addclass" render ={()=><AddClass/>}/>
              <Route exact path = "/:id/addstudent" component = {AddStudent}/>
              <Route exact path = "/editstudent/:id" component = {EditStudent}/>
              <Route exact path='/editclass/:id' component={EditClass} />
              <Route exact path = "/parent/:id" component = {Parent}/>
              <Route exact path = "/transactions" render = {() => <Transactions/>}/>
              
            </Switch>
          </roleContextProvider>
        </LoginContextProvider>
      </div>
    </Router>

  );
}

export default App;
