import React, { useState} from 'react';
import useDevice from "../hooks/useDevice"
import validateForm from './validateForm';

export  default function Form() {
    const { isMobile } = useDevice()
    const [sliderMoved, setSliderMoved] = useState(false);
    const [formSectionMoved, setFormSectionMoved] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [phone, setPhone] = useState()

    const handleSubmit = (e) => {
        fetch("/", {
            method: "POST",
            headers: {"Content-Type": ""},
        })
            .then(function (response) {
                return response.text().then(function (text) {
                    console.log(text);
                });
            })
            .catch((error) => alert(error));

        e.preventDefault();
        const resultError = validateForm({email, password});

        if (resultError !== null) {
            setError(resultError);
            return;
        }
        setEmail('');
        setPassword('');
        setError(null);
        setSuccess('Application was submitted!');
    };

    function handleEmailClick() {
        setSliderMoved(true);
        setFormSectionMoved(true);
    }

    function handlePhoneClick() {
        setSliderMoved(false);
        setFormSectionMoved(false);
    }
    const formData = [
        // {label: 'Name', value: name, onChange: (e) => setName(e.target.value), type: 'text'},
        {label: 'Email', value: email, onChange: (e) => setEmail(e.target.value), type: 'email'},
        {
            label: 'Password',
            value: password,
            onChange: (e) => setPassword(e.target.value),
            type: 'password',
        },
        // {
        //     label: 'Confirm Password',
        //     value: confirmPass,
        //     onChange: (e) => setConfirmPass(e.target.value),
        //     type: 'password',
        // },
    ];


    return (
        <div className="container">
            <div className={`slider ${sliderMoved ? `moveslider` : ``}`}></div>
            <div className="btn">
                <button className="login" onClick={handlePhoneClick}>По Телефону</button>
                <button className="signup" onClick={handleEmailClick}>По E-Mail</button>
            </div>
            <div className={`form-section ${formSectionMoved ? `form-section-move` : ``}`}>
                <div className="phone-box">
                    <input type="text"
                           className="name ele"
                           placeholder="Enter your name"></input>

                    <button className="clkbtn">Зарегистрироваться</button>
                </div>
                <div className="signup-box">
                    <input type="email"
                           className="email ele"
                           placeholder="youremail@email.com"/>
                    <input type="password"
                           className="password ele"
                           placeholder="password"/>

                    <button className="clkbtn">Зарегистрироваться</button>
                </div>
            </div>
        </div>
    );
}
