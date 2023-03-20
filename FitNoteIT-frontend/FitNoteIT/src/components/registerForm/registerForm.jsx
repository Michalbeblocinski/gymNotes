import React, { useState, useEffect } from "react";
import "./registerForm.scss"
import {useForm} from 'react-hook-form';
import axios from "axios";
import { useNavigate  } from 'react-router-dom';

function RegisterForm() {
    const currentUser = localStorage.getItem("currentUser");
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
                setStatus("Nie udało się zarejestrować")
                break;
              case 404:
                console.log('Nie znaleziono zasobu');
                setStatus("Nie udało się zarejestrować")
                break;
              default:
                console.log(`Wystąpił błąd: ${error.response.status}`);
            }
          } else {
            console.log('Nie udało się nawiązać połączenia z serwerem');
            setStatus("Nie udało się zarejestrować")
          }
          return Promise.reject(error);
        }
      );
    

    const onSubmit =async data => {
        await axios
         .post(
             'https://fitnoteit.azurewebsites.net/api/users/register',
             data
          )
         .then(response => {
            if(response.status==200){
                setStatus("Udało się zarejestrować")
                document.getElementById('form-id').value="";
                document.getElementById('form-login').value="";
                document.getElementById('form-password').value="";
                document.getElementById('form-password2').value="";
            }
            else {
                setStatus("Nie udało się zarejestrować")
            } 
        });
     };
    return (
        <div className="register__form">
          <div className="register__form-status">
            <h1>{status}</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} id="my-form">
                <div className="register__form-email">
                    <label htmlFor="email"> email:</label><br/>
                    <input id="form-id" {...register('email',{required: "This is required", minLength: 6})} /><br/>
                    <p>{errors.email?.message}</p>
                </div>
                <div className="register__form-login">
                    <label htmlFor="fname">Login:</label><br/>
                    <input id="form-login" {...register('userName',{required: "This is required", minLength: 6})}  /><br/>
                    <p>{errors.userName?.message}</p>
                </div>
                <div className="register__form-password">
                    <label htmlFor="lname">Hasło:</label><br/>
                    <input id="form-password" type="password" {...register('password',{required: "This is required", minLength: 6})} /><br/>
                    <p>{errors.password?.message}</p>
                </div>
                <div className="register__form-password-again">
                    <label htmlFor="lname2"> Powtórz Hasło:</label><br/>
                    <input id="form-password2" type="password" {...register('confirmPassword',{required: "This is required", minLength: 6})} /><br/>
                    <p>{errors.confirmPassword?.message}</p>
                </div>              
                <div className="register__form-button">
                         <button type="submit">Zarejestruj</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;