import React from 'react'
import './App.scss';
import {Route,Switch} from 'react-router-dom'
import Login from './components/Login/Login'
import Home from './components/Home'
import EventDetail from './components/EventDetail/EventDetail';
import Reports from './components/Reports/Reports'
import ReportDetail from './components/Reports/ReportDetail'
import AddVendors from './components/AddVendors/AddVendors';
import AddServices from './components/AddVendors/AddServices';
import CreateCategory from './components/AddVendors/CreateCategory';
import UpdateCategory from './components/AddVendors/UpdateCategory'
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/home" component={Home} />
    <Route path="/eventdetail" component={EventDetail} />
    <Route path="/reports" component={Reports} />
    <Route path="/reportdetail" component={ReportDetail} />
    <Route path="/addvendors"  component={AddVendors} />
    <Route path="/addservices"  component={AddServices} />
    <Route path="/addcategories"  component={CreateCategory} />
    <Route path="/updatecategory" component={UpdateCategory} />
    </Switch>
  );
}

export default App;
