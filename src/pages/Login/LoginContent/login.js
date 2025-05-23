import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../../services/users";
import styled from "styled-components";
import ForgotPassword from "./ForgotPassword/index.js";
import APIResponse from "../../../components/ApiResponse/index.js";
import InputPass from "../../../components/Inputs/PasswordInput/index.js";
import TextInput from "../../../components/Inputs/TextInput/index.js";
import Button from "../../../components/Inputs/Button/index.js";
import CircleLoad from "../../../components/CircleLoad/index.js";

const LoginContainer = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    width: 100%;
    height: 100%;
    opacity: 1;
    transform: translateX(0);
    transition: opacity .3s ease-in-out, transform .7s ease-in-out;

    &.forgot-password{
        opacity: 0;
        transform: translateX(-50vw);
    }

    @media screen and (min-height: 700px) {
        gap: 2.3rem;
    }
`

const LoginTexts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`

const LoginTitle = styled.h1`
    color: var(--login-text-color);
    font-family: "Nunito Sans";
    font-size: 2rem;
    font-weight: 700;
`

const LoginSubtitle = styled.p`
    color: var(--login-text-color);
    font-family: "Nunito Sans";
    text-align: center;
    font-size: 18px;
    padding: 0 .5rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.064px;
`

const LoginFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    justify-content: center;
    gap: 2rem;

    @media screen and (min-height: 700px) {
        gap: 3.5rem;
    }
`

const FormContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;

    @media screen and (min-height: 700px) {
        gap: 2.5rem;
    }
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1.5rem;
`

const InputContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1rem;
`

const InputLabel = styled.label`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: var(--login-text-color);
    font-family: "Nunito Sans";
    font-size: 1.125rem;
`

const RememberPassword = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: 0.75rem;
    color: var(--login-text-color);
    font-family: "Nunito Sans";
    font-size: 1.125rem;
`

const CheckboxContainer = styled.div`
    position: relative;
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;

    &:hover .check {
        stroke-dashoffset: 0;
    }

    & .background {
        fill: #ccc;
        transition: ease all 0.6s;
        -webkit-transition: ease all 0.6s;
    }

    & .stroke {
        fill: none;
        stroke: #fff;
        stroke-miterlimit: 10;
        stroke-width: 2px;
        stroke-dashoffset: 100;
        stroke-dasharray: 100;
        transition: ease all 0.6s;
        -webkit-transition: ease all 0.6s;
    }

    & .check {
        fill: none;
        stroke: #fff;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 2px;
        stroke-dashoffset: 22;
        stroke-dasharray: 22;
        transition: ease all 0.6s;
        -webkit-transition: ease all 0.6s;
    }

    & input[type=checkbox] {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        margin: 0;
        opacity: 0;
        -appearance: none;
    }

    & input[type=checkbox]:hover {
        cursor: pointer;
    }

    & input[type=checkbox]:checked + svg .background {
        fill: var(--background);
    }

    & input[type=checkbox]:checked + svg .stroke {
        stroke-dashoffset: 0;
    }

    & input[type=checkbox]:checked + svg .check {
        stroke-dashoffset: 0;
    }
`

const LoginButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1.125rem;
`

const LinkStyled = styled(Link)`
    color: #5A8CFF;
    font-family: "Nunito Sans";
    text-decoration: none;
    font-size: 1.125rem;
    font-weight: 700;
    text-underline-position: from-font;
    transition: all .7s;

    &:hover{
        text-decoration: underline;
    }
`

function LoginContent() {
    const [isChecked, setIsChecked] = useState(false);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [apiResponse, setApiResponse] = useState("");
    const [apiResponseColor, setApiResponseColor] = useState("");
    const [isReset, setIsReset] = useState(false);
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const loginContentRef = useRef(null);
    const navigate = useNavigate();

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const slide = () => {
        const form = loginContentRef.current;
    
        form.classList.toggle("forgot-password");
        setIsReset(!isReset);

        setTimeout(() => {
            setUsername("");
            setPassword("");
            setApiResponse("");
            setApiResponseColor("");
            setIsChecked(false);
        }, 300);
    };

    const handleForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setButtonDisabled(true);
        setApiResponse("");
        setApiResponseColor("");

        if (!username || !password) {
            setApiResponseColor("red");
            setApiResponse("Please fill in all fields.");
            setLoading(false);
            setButtonDisabled(false);
            return;
        }

        const credentials = {
            username,
            password,
            rememberMe: isChecked
        };
    
        try {
            const response = await userLogin(credentials);

            if (response.success) { 
                setApiResponseColor("#6579FC");
                setApiResponse(response.message);

                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                }, 1000);
            } else {
                setApiResponseColor("red");
                setApiResponse(response.message || "Login failed. Please try again.");
                setButtonDisabled(false);
            }
        } catch (error) {
            setApiResponseColor("red");
            setApiResponse(error.message || "An error occurred. Please try again.");
        }
        setLoading(false);
    };
    
    return (
        <>
            <LoginContainer ref={loginContentRef}>
                <LoginTexts>
                    <LoginTitle>Login to Account</LoginTitle>
                    <LoginSubtitle>Please enter your username and password to continue</LoginSubtitle>
                </LoginTexts>

                <LoginFormContainer onSubmit={handleForm}>
                    <FormContent>
                        <InputContainer>
                            <InputContent>
                                <InputLabel>
                                    <p>Username</p>
                                </InputLabel>

                                <TextInput type={"text"} value={username} setText={setUsername} placeholder={"Enter your username"}/>

                            </InputContent>
                        </InputContainer>

                        <InputContainer>
                            <InputContent>
                                <InputLabel>
                                    <p>Password</p>
                                    <LinkStyled onClick={slide}>Forgot Password?</LinkStyled>
                                </InputLabel>
                                
                                <InputPass value={password} setPassword={setPassword} placeholder={"Enter your password"}/>

                            </InputContent>

                            <RememberPassword>
                                <CheckboxContainer>
                                    <input 
                                        type="checkbox" 
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                    />
                                    <svg viewBox="0 0 35.6 35.6">
                                        <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                        <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                        <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                    </svg>
                                </CheckboxContainer>
                                <p>Remember me</p>
                            </RememberPassword>
                        </InputContainer>
                    </FormContent>

                    <LoginButtonContainer>
                        <Button isDisabled={buttonDisabled} type={"submit"} content={"Sign In"}/>

                        <LoginSubtitle>Don't have an account? <LinkStyled to="/register">Create Account</LinkStyled></LoginSubtitle>

                        {loading ? <CircleLoad/> :
                            <APIResponse apiResponse={apiResponse} apiResponseColor={apiResponseColor}/>
                        }
                    </LoginButtonContainer>
                </LoginFormContainer>
            </LoginContainer>

            <ForgotPassword apiResponse={apiResponse} setApiResponse={setApiResponse} isResetPass={isReset} setIsResetPass={setIsReset} slide={slide}/>
        </>
    );
}

export default LoginContent;