import React, { useState, useEffect } from "react";
import "./recordsForm.scss"
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ModalRecordsX from "../modalRecordsX/modalRecordsX";

function RecordsForm() {
    const currentUser = localStorage.getItem("currentUser");
    let navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [startDate, setStartDate] = React.useState(new Date());
    const [startWeight, setStartWeight] = React.useState(0);
    const [selectedValue, setSelectedValue] = useState("Martwy Ciąg");

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
    }, []);


    const [exercises, setExercises] = useState(
        [
            {
                exerciseName: "Martwy Ciąg",
                recordDate: new Date(),
                result: 0
            }

        ]
    );

    useEffect(() => {
        let token = localStorage.getItem("accessToken");
        let config2 = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios
            .get(
                'https://fitnoteit.azurewebsites.net/api/records?PageSize=10&PageNumber=1',
                config2
            )
            .then(response => {
                if (response.status == 200) {

                    response.data.items.forEach((element) => {
                        if (element.recordDate !== null && element.recordDate !== "") {
                            element.recordDate = new Date(element.recordDate)
                        }
                        if (element.recordDate === "Martwy ciąg") {
                            element.exerciseName = "Martwy Ciąg"
                        }
                    }

                    )
                    console.log(response)
                    setExercises(response.data.items)
                    setStartDate(response.data.items[0].recordDate);
                    let input = document.getElementById("weight")
                    input.value = response.data.items[0].result;
                    setStartWeight(response.data.items[0].result);

                }
                else {
                    alert("nie pobrano twoich danych")
                }
            });
    }, []);

    useEffect(() => {
        const selectedExerciseData = exercises.find(exercise => exercise.exerciseName === selectedValue);
        setStartDate(selectedExerciseData.recordDate);
        let inp = document.getElementById("weight")
        inp.value = selectedExerciseData.result
        setStartWeight(selectedExerciseData.result);
    }, [selectedValue]);




    const onSubmit = async data => {
        let token = localStorage.getItem("accessToken");
        let config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        console.log(data)
        data["recordDate"] = startDate;
        data["exerciseName"] = selectedValue;
        data["result"] = startWeight;
        await axios
            .put(
                'https://fitnoteit.azurewebsites.net/api/records',
                data,
                config
            )
            .then(response => {
                if (response.status == 200) {
                    alert("Zapisano")
                }
                else {
                    alert("Błąd")
                }
            });
    };
    return (
        <div className="records__form">
            <div className="records__form-all">
                <div className="records__form-title"><h1>Twoje rekordy</h1></div>
                <form onSubmit={handleSubmit(onSubmit)} id="my-form">
                    <div className="records__form-exercise">
                        <label htmlFor="exercise">Cwiczenie:</label><br />
                        <select value={selectedValue} onChange={(v) => setSelectedValue(v.target.value)} >
                            {exercises.map((exercise) => (
                                <option key={exercise.exerciseName} value={exercise.exerciseName}>
                                    {exercise.exerciseName}
                                </option>
                            ))}
                        </select>
                        <p>{errors.exercise?.message}</p>
                    </div>
                    <div className="records__form-date">
                        <label htmlFor="date">Data:</label><br />
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => {
                                console.log(date)
                                setStartDate(date)
                            }}
                            dateFormat="dd/MM/yyyy"
                            exerciseName="date"
                        /><br />
                        <p>{errors.date?.message}</p>
                    </div>
                    <div className="records__form-weight">
                        <label htmlFor="weight">Ciężar/Powtórzenia:</label><br />
                        <input
                            id="weight"
                            type="text"
                            onChange={(v) => setStartWeight(v.target.value)}
                        /><br />
                        <p>{errors.weight?.message}</p>
                    </div>

                    <div className="records__form-button">
                        <button type="submit">Zapisz</button>
                        <ModalRecordsX data={selectedValue}></ModalRecordsX>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RecordsForm;