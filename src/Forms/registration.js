import React, {useState} from 'react';
import useDevice from "../hooks/useDevice"
import axios from "axios";

export default function Form() {

    const [sliderMoved, setSliderMoved] = useState(false);
    const [formSectionMoved, setFormSectionMoved] = useState(false);
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);



    // const validateForm = () => {
    //     let isValid = true;
    //     if (!email) {
    //         setEmailError('Email is required');
    //         isValid = false;
    //     } else if (!/\S+@\S+\.\S+/.test(email)) {
    //         setEmailError('Email is invalid');
    //         isValid = false;
    //     } else {
    //         setEmailError('');
    //     }
    //     return isValid;
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('https://umbrella-back.webtoolteam.com/api/external/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone: phoneNumber
                })
            });
            if (response.status === 200) {
                setSuccess(true);
                setPhoneNumber('');
            } else {
                throw new Error(`Unexpected response: ${response.status}`);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                    setError('Unauthorized request. Please try again with valid credentials.');
                } else {
                    setError(`Request failed with status code ${error.response.status}`);
                }
            } else if (error.message) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setSubmitting(false);
        }
    };

    console.log("🚀 ~ file: Form.js ~ line 63 ~ handleSubmit: ", handleSubmit);

    function handleEmailClick() {
        setSliderMoved(true);
        setFormSectionMoved(true);
    }

    function handlePhoneClick() {
        setSliderMoved(false);
        setFormSectionMoved(false);
    }

    const handlePhoneChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    // if (success) {
    //     window.location.href = 'https://www.google.com/'; // Redirect to Boom Casino
    //     return null;
    // }
    function handlePhoneNumberChange  (event)  {
        const value = event.target.value;
        // remove non-digit characters from input
        const cleanedValue = value.replace(/\D/g, '');
        setPhoneNumber(cleanedValue);
        // check if phone number is valid
        setIsValidPhoneNumber(/^\d{10}$/.test(cleanedValue));
    };

    function handleInputChange(event) {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
        const inputEmail = event.target.value;

        setEmail(inputEmail);

        if (!emailRegex.test(inputEmail)) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }

    return (
        <div className="container">
            <div className={`slider ${sliderMoved ? `moveslider` : ``}`}></div>
            <div className="btn">
                <button className="login" onClick={handlePhoneClick}>По Телефону</button>
                <button className="signup" onClick={handleEmailClick}>По E-Mail</button>
            </div>
            <div className={`form-section ${formSectionMoved ? `form-section-move` : ``}`}>
                <div className="phone-box">
                    <form onSubmit={handleSubmit}>
                        <input type="text"
                               value={phoneNumber}
                               onChange={handlePhoneChange}
                               className="name ele"
                               placeholder="Enter your phone"
                               required
                        />
                        <button className="clkbtn"  disabled={!handlePhoneNumberChange} onClick={handleSubmit}>Зарегистрироваться</button>

                    </form>

                </div>
                <div className="signup-box">
                    <input type="email"
                           value={email}
                           className="email ele"
                           placeholder="youremail@email.com"
                           onChange={handleInputChange}/>
                    <input type="password"
                           className="password ele"
                           placeholder="password"
                    />
                    <button className="clkbtn" disabled={!isValid} onSubmit={handleSubmit}>Зарегистрироваться</button>
                    {/*//   {!isValid && <p>Please enter a valid email address.</p>}*/}

                </div>
            </div>
        </div>
    );
}
