import { useState,useContext,useEffect  } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from "./routes/home/home"
import axios from "axios";
import { Navbar } from "./components";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import Records from "./routes/records/records";
import { UsersContext } from "./contexts/user.context";
function App() {
  const { currentUser2,setCurrentUser2 } = useContext(UsersContext);
  const currentUser = localStorage.getItem("currentUser");
  const [ intervalToken,setIntervalToken] = useState(null);
  const logout= ()=>{
    localStorage.setItem("currentUser", "");
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    setCurrentUser2("");
  }

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        // Obsługa błędu na podstawie kodu statusu odpowiedzi
        switch (error.response.status) {
          case 400:
            logout();
            console.log('Nieprawidłowe żądanie'); 
            break;
          case 401:
            logout();
            console.log('Brak autoryzacji');
            break;
          case 404:
            logout();
            console.log('Nie znaleziono zasobu');
            break;
          default:
            logout();
            console.log(`Wystąpił błąd: ${error.response.status}`);
        }
      } else {
        logout();
        console.log('Nie udało się nawiązać połączenia z serwerem');

      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    let tokenDate = localStorage.getItem("tokenDate");
    let today = Date.now();
    const TWENTY_THREE_HOURS = 23 * 60 * 60 * 1000; // 23 hours in milliseconds
   
    if(today - tokenDate > TWENTY_THREE_HOURS){logout()}
    const intervalId = setInterval(refreshTokens, 300000);
    setIntervalToken(intervalId);
    return () => clearInterval(intervalId);
  }, []);

  useEffect( () => {
   setCurrentUser2(currentUser)
  }, []);
 
  const refreshTokens = async  () => {
    let rToken = localStorage.getItem("refreshToken");
    let aToken = localStorage.getItem("accessToken");
    let data =  {
      "accessToken": aToken,
      "refreshToken": rToken
    };
    
    let currentUser = localStorage.getItem("currentUser");
    if(currentUser !== undefined && currentUser !== null && currentUser !=="") {
       await axios
      .post(
          'https://fitnoteit.azurewebsites.net/api/token/refresh',
          data
       )
      .then(response => {
         if(response.status==200){            
             localStorage.setItem("accessToken", response.data.accessToken); 
             localStorage.setItem("refreshToken", response.data.refreshToken); 
              let myDate=Date.now(); 
             localStorage.setItem("tokenDate", myDate);
             console.log(response)
         }
         else {
          console.log("złe dane do odswieźenia tokenów")
         } 
     });
    }
  }
  
  return (
   
    <Routes>
        <Route  element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
          <Route path="records" element={<Records/>} />
        </Route>
      </Routes>
  )
}


export default App
