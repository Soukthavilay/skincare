import Dashboard from "./dashboard/Dashboard"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from "./dashboard/sidebar/Sidebar";

import './scss/dashboard.scss'



const Admin = () => {
  return (
    <>
      <Router>
      <div className="dashboard-admin">
          <div className="app-container">
            <Sidebar/>
            <Dashboard/>
          </div>
        </div>
      </Router>
    </>
  )
}

export default Admin