import React, {useState} from 'react';
import useDevice from "../hooks/useDevice"

export default function Form() {
    const {isMobile} = useDevice()
    const [sliderMoved, setSliderMoved] = useState(false);
    const [formSectionMoved, setFormSectionMoved] = useState(false);
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [phone, setPhone] = useState(0)
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);


    const validateForm = () => {
        let isValid = true;
        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Email is invalid');
            isValid = false;
        } else {
            setEmailError('');
        }
        return isValid;
    };

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
        if (validateForm()) {
            console.log(`Submitting email: ${email}`);
            // Send email data to server or perform other actions
        }

        setPhone(0)
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

    const handlePhoneNumberChange = (event) => {
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
                    <input type="text"
                           value={phoneNumber}
                           onChange={handlePhoneNumberChange}
                           className="name ele"
                           placeholder="Enter your phone"
                           required
                    />
                    <button className="clkbtn" disabled={!isValidPhoneNumber}>Зарегистрироваться</button>
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
                    <button className="clkbtn"  disabled={!isValid}>Зарегистрироваться</button>
                 {/*//   {!isValid && <p>Please enter a valid email address.</p>}*/}

                </div>
            </div>
        </div>
    );
}
