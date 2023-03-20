import React, {  useState,useContext,useEffect  } from "react";
import "./loginForm.scss"
import {useForm} from 'react-hook-form';
import axios from "axios";
import { UsersContext } from "../../contexts/user.context";
import { useNavigate  } from 'react-router-dom';


function LoginForm() {
    const currentUser = localStorage.getItem("currentUser");
    const { currentUser2,setCurrentUser2 } = useContext(UsersContext);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [status, setStatus] = useState();
    let navigate = useNavigate();


    useEffect(() => {
        if (currentUser) {
          navigate('/');
          } 
      }, []);
    
    axios.interceptors.response.use(
        response => response,
        error => {
          if (error.response) {
            // Obsługa błędu na podstawie kodu statusu odpowiedzi
            switch (error.response.status) {
              case 400:
                console.log('Nieprawidłowe żądanie');
                setStatus("Nie udało się zalogować")
                break;
              case 401:
                console.log('Brak autoryzacji');
                setStatus("Nie udało się zalogować")
                break;
              case 404:
                console.log('Nie znaleziono zasobu');
                setStatus("Nie udało się zalogować")
                break;
              default:
                console.log(`Wystąpił błąd: ${error.response.status}`);
            }
          } else {
            console.log('Nie udało się nawiązać połączenia z serwerem');
            setStatus("Nie udało się zalogować")
          }
          return Promise.reject(error);
        }
      );

    const onSubmit =async data => {
        await axios
         .post(
             'https://fitnoteit.azurewebsites.net/api/users/login',
             data
          )
         .then(response => {
            if(response.status==200){
                
                localStorage.setItem("currentUser", data.userName);
                localStorage.setItem("accessToken", response.data.accessToken); 
                localStorage.setItem("refreshToken", response.data.refreshToken); 
                let myDate=Date.now();  
                localStorage.setItem("tokenDate", myDate);
                setCurrentUser2( data.userName)
                setStatus(`Witaj ${data.userName}!`)
                console.log(response)
                

            }
            else {
                setStatus("Nie udało się zalogować")
            } 
        }).then(()=>{

          navigate('/');
        });
     };

    return (
        <div className="login__form">
          <div className="login__form-status">
            <h1>{status}</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="login__form-login">
                    <label htmlFor="fname">Login:</label><br/>
                    <input id="form-login" {...register('userName',{required: "This is required", minLength: 6})}  /><br/>
                </div>
                <div className="login__form-password">
                    <label htmlFor="lname">Hasło:</label><br/>
                    <input id="form-password" type="password" {...register('password',{required: "This is required", minLength: 6})} /><br/>
                    
                </div>
                <div className="login__form-button">
                         <button type="submit">Zaloguj</button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;