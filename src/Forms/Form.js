import React, {useState} from 'react';


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
        // const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
        // const inputphoneNumber = e.target.value;
        // if (!phoneRegex.test(inputphoneNumber)) {
        //     setError('Please enter a valid phone number.');
        //     return;
        // }


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
            if (!response.ok) {
                throw new Error('An error occurred while submitting the form.');
            }

            setSuccess(true);
            setPhoneNumber('');
        } catch (error) {
            setError(error.message);
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
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

        // setPhoneNumber(event.target.value);
        const inputphoneNumber = event.target.value;

        setPhoneNumber(inputphoneNumber)
        if (!phoneRegex.test(inputphoneNumber)) {
            setError('Please enter a valid phone number.');
            setIsValid(false);
        }else {
            setIsValid(true);
        }
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

    // if (success) {
    //     window.location.href = 'https://www.google.com/'; // Redirect to Boom Casino
    //     return null;
    // }

    return (
        <div className="container">
            <div className={`slider ${sliderMoved ? `moveslider` : ``}`}></div>
            <div className="btn">
                <button className="login" onClick={handlePhoneClick}>По Телефону</button>
                <button className="signup" onClick={handleEmailClick}>По E-Mail</button>
            </div>
            <div className={`form-section ${formSectionMoved ? `form-section-move` : ``}`}>
                <div className="phone-box"> {success ? (<div >Thank you for registering your phone number!</div>
                    ) : <form onSubmit={handleSubmit}>
                        <input type="text"
                               value={phoneNumber}
                               onChange={handlePhoneChange}
                               className="name ele"
                               placeholder="Enter your phone"
                               required
                        />
                        <button className="phone-clkbtn" disabled={!isValid}
                                onClick={handleSubmit}> {submitting ? 'Submitting...' : 'Submit'}
                        </button>
                        {error && <div>{error}</div>}
                    </form>
                }
                </div>
                <div className="signup-box">
                    <input type="email"
                           value={email}
                           className="email ele"
                           placeholder="youremail@email.com"
                           onChange={handleInputChange}/>
                    {/*<input type="password"*/}
                    {/*       className="password ele"*/}
                    {/*       placeholder="password"*/}
                    {/*/>*/}
                    <button className="clkbtn" disabled={!isValid} onSubmit={handleSubmit}>Зарегистрироваться</button>
                    {/*//   {!isValid && <p>Please enter a valid email address.</p>}*/}

                </div>
            </div>
        </div>
    );
}
