import { Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import { useContext } from 'react';
import Popup from "reactjs-popup";
import MyInfo from '../../../user/profile/MyInfo';
import { AiOutlineUser } from "react-icons/ai";
import { BiPackage } from "react-icons/bi";
import { LuLayoutDashboard } from "react-icons/lu"
const Sidebar = () => {
  const state = useContext(GlobalState);
  const userDetail = state.userAPI.detail[0];
  const img = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAsJCQcJCQcJCQkJCwkJCQkJCQsJCwsMCwsLDA0QDBEODQ4MEhkSJRodJR0ZHxwpKRYlNzU2GioyPi0pMBk7IRP/2wBDAQcICAsJCxULCxUsHRkdLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz/wAARCADMAQEDASIAAhEBAxEB/8QAGwABAAMBAQEBAAAAAAAAAAAAAAEGBwUEAwL/xABAEAACAgECAwUEBgcIAgMAAAAAAQIDBAURBhIhMUFRcYETYWKRBxQiMkKhIzNDUnKCkiREU2OisbLBNOGTwtH/xAAaAQEBAAMBAQAAAAAAAAAAAAAABQEDBAIG/8QAKREBAAICAgIABAYDAAAAAAAAAAECAwQRMRIhEyIyQRQzQlGBkSNhcf/aAAwDAQACEQMRAD8A1sD1HqAA9R6gAPUeoAD1HqAA9R6gAPUAARukm29kk22+iSXi2crK4j4bw2436lj867YUt3zT8GqVIzETb1EPM2iO3WBUbuPtBhuqaM+5p9qrrri//kmpfkeKX0iUfg0m1r48qEf+MGbo1ss/pap2MUfqXsFDX0iVfi0ixL4cuL/3rR6qvpA0aW3tsPPr8XBU2JfKaf5GZ1ssfpYjZxT91yBwsbizhjKcYx1CFU5fhyoWUbfzWJQ/1HartqthGyqyFlcusZ1yjOLXulFtGm1bV+qOG6L1t1L9gD1PL0Aeo9QAHqPUAB6j1AAeo9QAHqPUAB6gAAAAAAAAAAAABVtf4vw9LduJhqGVnxbjNb70Y8vC2UXu5fCn5td/ulLXnxq8XvWkc2lYcvNwcCmWRmZFVFMenPbLbd/uxXa37kilanx9s51aTjbrqvrOYnt5wpi9/LeXoUrNz9Q1G+WRm5Fl1r3Sc39mEX+GuK+yl5I8xUxaVa+7+5TMm5a3qnp7c7VtX1KTebm33Jvf2bly0ryqhtD8jw9nZ08iQdtaxWOIcUzNp5kAB6YAAGA++LmZuFP2mHk348/GiyUN/NLo/VHwBiYifUsxMx7hctN481Gjlr1OmGVX2O6lRqyEvFxX6N/KJeNM1nSdWr58LJjOUVvZVL7F9f8AHW+vr2e8xU/dVt1Fld1FllV1b3rsqk4Ti/dKPU4sunS3uvqXZj2719W9w3gFC0HjfmdeLrTjFvaMM6MUov3ZEF0X8S6eKXaXyMozUZRkpRklKLi004tbppol5Mdsc8WVMeWuSOapABrbAAAAAAAAAAAAAAAAAAAACi8Y8SSq9po+Ba1a1y591b61xa/UQku9/i8Oztb5dmPHOS3jVryZIx18pfLiji6XNbp2kW7KLcMrMrfVvsddEl+cvl4lDALmLFXFXiETLltknmQEEm5pAQSAB6MPB1DUbHVgYt+TOL2n7GO8IP47JbQXqywUcCcS2xUrZ6fj/DZdZZNeaqhy/wCo1Xy0p6tLZXFe/usKuC2WcA8QwTdeTp1rX4ee+tv+qDRws/Rdb0zd52DdVWv20draPWyttL12MVzY7dSzbDevcPAADc1gADAWXhzijI0eUMXKc7tMb25esrMXf8VPw+MfVdekq0DXfHXJHjZspktS3NW703UZFVV9FkLKbYRnXZBpxlF9U00fQyrhXiOWk3xw8ubemZE+sn1WJbL9ovhf4169z5tUTTSaaaa3TT3TT8CHmwzitxK3hyxlrzCQAaW4AAAAAAAAAAAAAACG0t22kkm220kku1tgcPibW1o2nudbX13J5qcOLW6UklzWteEd/m0u/pkUpTnKUpylKUpOUpSbcpSb3bbfXd951eIdWlrGp5GSpP6tX+gw49yog3tLbxk95Pz27jkFzWw/Dp77lE2cvxL+uoSADqcqCSCQIey6vsXa32It3DXCFmpxrz9UU6sCXLPHxlvC7Kj289kl1jB9yXV+5fe8nCehR1jOnfkx307AlCVsWvs5GQ/tQpfwr70/Rd5rGyRO2tma/JTtQ1deLfPbp8sfGxsSqujGprporXLCumChCK9yifbYAlKnBsRKKknGSTUls01umn3NMkBlSeIeC6Lo2ZmjwjVkLmnZiR2jTf4+y7oy93Y/d2mdSjKEpRnGUZxk4yjJOMoyT2akn1TXeb2UPjfQY8j1rFglOLjHUIx/HD7sb9vFdFL3bP8AD1o6uzPPhdO2daOPOigAAqpYAABonBGuu+p6PlTbux4OeFOT62Y8e2rd98O73fwmdH2xsnIw8nGy8eXLfjWxuqfdzR7pe59j9zNGfFGWni34cs478t2B5NOzsfUsLEzqP1eTVGxJ9sJdkoP3xe6fkesgzHE8SuxMTHMAAMMgAAAAAAAAAAFc4y1J4GjXV1y2vz5fVK9n1UJJu2Xy3X8yLGZhx3mu/VqsRP8AR4GPGLXd7a/ayT+XIdGtj88kRLn2cnhjmVTAILyGkABgIk+VN7N7JtJdrfckDoaLjxy9Y0THkt4WZ9DmvGFTdzX+k82nxiZeqx5TENX4f0yOk6TgYbS9qq/a5T2W8si37djfr0XuSOqAfOTM2nmX0NaxWOIAAYegAAD8XVVX1W02xU6rYTqsi+yUJpxkmfsAYdqOHZp2dnYM928a+dSk1tzQT3hL1Wz9Tylr48x41azVdFf+XhVTk/GdcpVP8lEqh9Dhv50iz5/LTwvNQAG1qAQSBfPo/wBRaefpNkui/t2Lv3btQtivXll6sv5imiZr07V9Ky99oQyYV3P/ACbn7Ge/o9/Q2si7lPHJz+6zp38sfH7AAON2AAAAAAAAAAAGI6tk/XNT1XK33V2ZkSh/ApuMF8kjaMq32GNl3f4NF1v9EHIwldi8dlv5lLQr7tKdvT6iEkEkFRLSAAIO7wik+JNG37pZbW/j9WtOEdPQL1ja5odze0Vm11yfuuTo/wDsa8sc0tH+pbMc8Xj/ALDaQAfOvoQAAAAAAAGd/SHt9Z0V9/sMvfy569ikFu4+vjZq2JRF7/V8GHMvCdtkpbfJRKiXdWOMVULZnnLYAB0udBJBIH5knKMlu1umt15G36TlfXdL0rLb3lkYePbL+NwXN+e5iRrHBdvtOHdNX+DLLo9IXz2/LYn70fLEqGjPzTCxgAkqoAAAAAAAAAAPDrDcdJ1qS7Vpuc15qmRiPcvQ3HU4e003Va9t3Zg5cEvHmqkjDk+i8kVNDqyXvdwkAFJOAAAG8ls4vlkmpRf7sovdP0ADLbNIz69T03Azobb5FMZWJfgtX2bI+jTR7zM+Ctbjg5M9LyZ8uNm2KWPKT2jVlNcvK34T6eq+I0w+fz4vhXmF7BkjJSJAAaW4AAAiUoxi5SaUYpyk5PZKK6ttskp3GuuRxcSWlY8/7VmQ2yeV9acV9qe3fPs8t/Fb+8dJyWisPGS8Y6zaVD1fPepanqObu+S++Tq36NUwSrrXySPCAfQ1iKxxD5+Zm08yAA9PIAABqHAUm9CafZDUM2K8nKMv+zLzU+BYcnD9Mttva5mdPz/SuG/5HFu/lfy7dP8AM/haEAgRlgAAAAAAAAAAESipRlGXVSTi14prYwi6qVFt9Mk1Km2ymSfanXJw/wCjeDH+KsR4mvapFJ8l9kcyD7N1fHmlt/NzFDRtxaa/un71eaxZxCCQVkoAAEEk1123Wwopqsuvs/V1UwlZZLyjFblq07gXW8tRszrasCp9XDpfk7e+MWq1/U/I13y0xxzaWymO154rCpmg8NcY1yjTgaxao2R5a6M2x7QsXYo5DfZL4ux9+z6y/OpcBUQw4y0q++zMq3lOOXZFrJX7sXFKMX+7027n4qh2VXU2WU3Vzrtqk4WV2xcZwl4Si+po/wAW1XiG+Pia1uW8JppNPdNJprqmvFMkxrTOIdc0lRhi5LdC/u+Qva0JeEYvqvRostH0h2qKWTpcJS75Y+Q4p+ULIP8A5HBfTyVn17d1NzHPfpoAKFZ9Icdn7HSZc3c7cqKS9IVv/c4Oo8X8Q6hGVavjiUy6OGEnCUl8Vrbn8mjFdTLbuOGbbeOOp5XbiHirC0mM8fGlDI1JpxVae9dD/evce/4d9/JdTLb778m67IyLJWX3Tdltk+spSfe/+v8A0fJtRW7ey3/Nlx4f4LuzoPL1dXY+POD+rY0X7PInzLpbbut4pfhj2+O3Y++tcerXmXDa+TZtxEKeC7ahwBl1qc9MzI3pdVTmJV2eStrXK/WK8yo5mDn6fb7DNxrse178qtjsp7d8JreL9GzdjzUyfTLTfDen1Q84ANzSgkgkBul17l2mw8LUPH4e0OEltKWJG+XjvfJ3df6jIK6LMq2jFrTdmVdVjQ27ea6ar39N9zdqqoU1U01raFNcKoLwjBKKJu9b1FVHRr7mz9gAlqgAAAAAAAAAABRPpAwHKvTtThH9VKWHe/gnvOt+SfMv5i9nj1PBq1PAzcGzpHIqlBS/cmvtQn6NJm3Df4d4s1ZqedJqxAH7upux7rqLouF1Nk6rYvtjOD5Wj8H0ETygT6Dv6BwtqOt8mRNyxdNfVXtJ25CT/u8JdNvifTwT7vXwnwzHVprUM+DemVTapqe6WZbB9XL/AC4vp72tuxfa1CMYxUYxSUYpKKSSSS6JJI4Nna8J8Kdu7X1fP5r9PBpmj6VpFPssHGhXvt7Sx7yutfjZZL7T+Z0ACVMzM8yqxERHEGxytW0HSNZgll0fporlryKnyX1rwU9uq9zTXuOqBEzWeYYtWLRxLMs/gPWaHKWBdRmVd0bH9XvS8Ou9b/qRwrdB4kobVmkah0766XdH50uSNqB2U3ckd+3JbTpPXpiUNG4hse0NI1Jt9OuNZBfOxJfmdfD4J4mynF314+DW9m5ZFits291VDa+c0asDNt3JPUcMV0qR3PKu6Nwjo2kyhkSjLLzodY5GSo/o3401L7MfPq/eWLYA47XteebS7K0rWOKwHwysTDzaZ4+XRVfTP71dsVKPmt+/wZ9weevbMxyzfXeCb8VWZWj+0vojvKeJJ819a73TLtkvc+vn2FM/9r5G9lK4t4Xhkxv1TTq9suEXZl0QXTJiursgl+0Xf4+fbS19uefHJ/adsasceVP6ZwSPB9z6kNpJtvZJNtvsSXUqJqy8FYDzdcqulHenTapZUt+z2096ql/yf8pq5WuDdKlpukV2Ww5crUZLMvT+9GEltVW/KO2/vbLKQdnJ8TJMx1C3rY/DHHP3AAc7pAAAAAAAAAAAAAGe8daM4WQ1rHi+SzkozlFdIz+7Xa/PpF+S8So6Zp9uq6jg6fW3H6zZtbOPbXRBc9k170ui97RteRRRlU3Y98I2U31yqthJdJQktmipcNcO36PrWtTtTnRDGpq0+9/tKrrJTl1/eXLFS/8AyRQxbPjims9x0n5dbyyxaOp7W2iijGpox6IKummuFVUILaMIRXKkj6gE9QAAAAAAAAAAAAAAAAAABlHGGkx0zU/bUx5cXUFO+uKW0a7k0rYR27uqkv4vcefhfRXrOpwVsN8DCcMjMbX2bJJ710fzNby9y+IvXGOmZOp6bj1YlXtMuGdjuldiUbG6pub7opPml/CdPRdJxtFwKMKl8zW9mRa1tK++X37H/sl3JJdxQ/E8YePv0n/huc3P27dIAE9QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z"
  const style = {
    cursor: "pointer",
    color: "#292929"
  }
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-container">
          <div className="sidebar-header">
            <div className="app-icons">
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M507.606 371.054a187.217 187.217 0 00-23.051-19.606c-17.316 19.999-37.648 36.808-60.572 50.041-35.508 20.505-75.893 31.452-116.875 31.711 21.762 8.776 45.224 13.38 69.396 13.38 49.524 0 96.084-19.286 131.103-54.305a15 15 0 004.394-10.606 15.028 15.028 0 00-4.395-10.615zM27.445 351.448a187.392 187.392 0 00-23.051 19.606C1.581 373.868 0 377.691 0 381.669s1.581 7.793 4.394 10.606c35.019 35.019 81.579 54.305 131.103 54.305 24.172 0 47.634-4.604 69.396-13.38-40.985-.259-81.367-11.206-116.879-31.713-22.922-13.231-43.254-30.04-60.569-50.039zM103.015 375.508c24.937 14.4 53.928 24.056 84.837 26.854-53.409-29.561-82.274-70.602-95.861-94.135-14.942-25.878-25.041-53.917-30.063-83.421-14.921.64-29.775 2.868-44.227 6.709-6.6 1.576-11.507 7.517-11.507 14.599 0 1.312.172 2.618.512 3.885 15.32 57.142 52.726 100.35 96.309 125.509zM324.148 402.362c30.908-2.799 59.9-12.454 84.837-26.854 43.583-25.159 80.989-68.367 96.31-125.508.34-1.267.512-2.573.512-3.885 0-7.082-4.907-13.023-11.507-14.599-14.452-3.841-29.306-6.07-44.227-6.709-5.022 29.504-15.121 57.543-30.063 83.421-13.588 23.533-42.419 64.554-95.862 94.134zM187.301 366.948c-15.157-24.483-38.696-71.48-38.696-135.903 0-32.646 6.043-64.401 17.945-94.529-16.394-9.351-33.972-16.623-52.273-21.525-8.004-2.142-16.225 2.604-18.37 10.605-16.372 61.078-4.825 121.063 22.064 167.631 16.325 28.275 39.769 54.111 69.33 73.721zM324.684 366.957c29.568-19.611 53.017-45.451 69.344-73.73 26.889-46.569 38.436-106.553 22.064-167.631-2.145-8.001-10.366-12.748-18.37-10.605-18.304 4.902-35.883 12.176-52.279 21.529 11.9 30.126 17.943 61.88 17.943 94.525.001 64.478-23.58 111.488-38.702 135.912zM266.606 69.813c-2.813-2.813-6.637-4.394-10.615-4.394a15 15 0 00-10.606 4.394c-39.289 39.289-66.78 96.005-66.78 161.231 0 65.256 27.522 121.974 66.78 161.231 2.813 2.813 6.637 4.394 10.615 4.394s7.793-1.581 10.606-4.394c39.248-39.247 66.78-95.96 66.78-161.231.001-65.256-27.511-121.964-66.78-161.231z" /></svg>
            </div>
          </div>
          <ul className="sidebar-list">
            <li className="sidebar-list-item">
              <Link to="/admin">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                <span>Home</span>
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/admin/allUser">
                <AiOutlineUser />
                <span>Users</span>
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/admin/createProduct">
                <BiPackage />
                <span>Products</span>
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/admin/createCategories">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                <span>Categories</span>
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/admin/orderList">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                <span>Orders</span>
              </Link>
            </li>
            {/* <li className="sidebar-list-item">
                <Link to="/admin/cancel-request">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                <span>Order Cancel Request</span>
                </Link>
            </li> */}
            <li className="sidebar-list-item">
              <Link to="/admin">
                <LuLayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </li>
          </ul>
          <div className="account-info">
            <div className="account-info-picture">
              <img src={userDetail.avatar ? userDetail.avatar : img} alt="Account" />
            </div>
            <div className="account-info-name">{userDetail.name}</div>
            <Popup
              trigger={<button className="account-info-more" style={style}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
            </button>}
              modal
              nested
            >
              {(close) => (
                <div className="modal review-modal">
                  <button className="close" onClick={close}>&times;</button>
                  <div className="header">My info</div>
                  <div className="content">
                    {" "}
                    <MyInfo/>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar