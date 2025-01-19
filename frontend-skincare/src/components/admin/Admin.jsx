import Dashboard from "./dashboard/Dashboard"
import Sidebar from "./dashboard/sidebar/Sidebar";

import './scss/dashboard.scss'

const Admin = () => {
  return (
    <>
      <div className="dashboard-admin">
          <div className="app-container">
            <Sidebar/>
            <Dashboard/>
          </div>
        </div>
    </>
  )
}

export default Admin