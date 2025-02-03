import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../services/login-service";
import styled from "styled-components";
import Background from "../components/LoginBackground/background";
import ForgotPassword from "../components/ForgotPassword/forgotPass";
import APIResponse from "../components/ApiResponse/apiResponse";
import loginValidation from "../utils/loginValidation";
import InputPass from "../components/InputPassword/inputPass";

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
`

const LoginContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1.5rem;
    border: 1px solid #B9B9B9;
    background-color: var(--secondary-color);
    height: 80%;
    width: 80%;
    overflow: hidden;
    opacity: 0;
    transform: scale(0.9);
    transition: all 1s ease-in-out;

    &.active{
        opacity: 1;
        transform: scale(1);
    }

    @media screen and (min-width: 1000px){
        width: 40%;
    }

    @media screen and (min-width: 750px) and (min-height: 850px){
        width: 40rem;
        height: 45rem;
    }
`

const LoginContent = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.3125rem;
    width: 100%;
    height: 100%;
    opacity: 1;
    transform: translateX(0);
    transition: opacity .3s ease-in-out, transform .7s ease-in-out;

    &.forgot-password{
        opacity: 0;
        transform: translateX(-50vw);
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
    gap: 3.5rem;
`

const FormContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
    width: 100%;
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

const Input = styled.input`
    width: 100%;
    box-sizing: border-box;
    border-radius: .5rem;
    border: 1px solid #D8D8D8;
    color: var(--login-text-color);
    font-family: "Nunito Sans";
    font-size: 1.125rem;
    padding: 1rem;
    background: #F1F4F9;

    &:focus-visible{
        outline: none;
    }

    &::placeholder{
        color: #A6A6A6;
        font-family: "Nunito Sans";
        font-size: 1.125rem;
    }
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

const LoginButton = styled.button`
    width: 82%;
    height: 3.5rem;
    border-radius: 0.5rem;
    opacity: 0.8;
    border: none;
    background: var(--background);
    color: var(--secondary-color);
    font-family: "Nunito Sans";
    font-size: 1.25rem;
    font-weight: 700;
    transition: all .7s;
    cursor: pointer;

    &:hover{
        opacity: 1;
    }
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

function Login() {
    const [isChecked, setIsChecked] = useState(false);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [apiResponse, setApiResponse] = useState("");
    const [apiResponseColor, setApiResponseColor] = useState("");
    const [isReset, setIsReset] = useState(false);
    const loginContentRef = useRef(null);
    const loginRef = useRef(null);
    const loginFormRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "JStar Travel | Login";

        loginValidation();
      }, []);

    useEffect(() => {
      const element = loginRef.current;
    
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              element.classList.add("active");
            } else {
              element.classList.remove("active");
            }
          },
          {
            root: null,
            threshold: 0.1,
          }
        );
    
        observer.observe(element);
    
        return () => observer.disconnect();
      }
    }, []);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const slide = () => {
        const forgotForm = document.getElementById("forgotForm")
        const loginForm = loginFormRef.current;
        const login = loginRef.current;
        const form = loginContentRef.current;
    
        login.classList.toggle("forgot-password");
        form.classList.toggle("forgot-password");
        setIsReset(!isReset);

        setTimeout(() => {
            loginForm.reset();
            setUsername("");
            setPassword("");
            forgotForm.reset();
            setApiResponse("");
            setApiResponseColor("");
            setIsChecked(false);
        }, 300);
    };

    const handleForm = async (e) => {
        e.preventDefault();
        setApiResponse("");
        setApiResponseColor("");

        if (!username || !password) {
            setApiResponseColor("red");
            setApiResponse("Please fill in all fields.");
            return;
        }

        const credentials = {
            username,
            password
        };
    
        try {
            const response = await userLogin(credentials);
    
            console.log("API response:", response);

            if (response && response.sucess) { 
                setApiResponseColor("#6579FC");

                if(isChecked){
                    setApiResponse(response.sucess);
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("username", credentials.username);
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                    return;
                }

                setTimeout(() => {
                    localStorage.setItem("isLogged", true);
                    localStorage.setItem("token", response.token);
                    setApiResponse(response.sucess);
                }, 100);

                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
            } else {
                setApiResponseColor("red");

                if (response && response.error) {
                    setTimeout(() => {
                        setApiResponse(response.error);
                    }, 100);
                }
                else {
                    setApiResponse(response);
                }
            }
        } catch (error) {
            setApiResponse("Login failed.");
        }
    };
    
    return (
        <LoginContainer>
            <Background/>

            <LoginContentContainer ref={loginRef}>
                <LoginContent ref={loginContentRef}>
                    <LoginTexts>
                        <LoginTitle>Login to Account</LoginTitle>
                        <LoginSubtitle>Please enter your username and password to continue</LoginSubtitle>
                    </LoginTexts>

                    <LoginFormContainer ref={loginFormRef} onSubmit={handleForm}>
                        <FormContent>
                            <InputContainer>
                                <InputContent>
                                    <InputLabel>
                                        <p>Username</p>
                                    </InputLabel>
                                    <Input 
                                        type="text" 
                                        placeholder="Enter your username"
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </InputContent>
                            </InputContainer>

                            <InputContainer>
                                <InputContent>
                                    <InputLabel>
                                        <p>Password</p>
                                        <LinkStyled onClick={() => slide()}>Forgot Password?</LinkStyled>
                                    </InputLabel>
                                    
                                    <InputPass setPassword={setPassword} placeholder={"Enter your password"}/>

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
                            <LoginButton type="submit">Sign In</LoginButton>

                            <APIResponse apiResponse={apiResponse} apiResponseColor={apiResponseColor}/>
                        </LoginButtonContainer>
                    </LoginFormContainer>
                </LoginContent>

                <ForgotPassword apiResponse={apiResponse} setApiResponse={setApiResponse} isResetPass={isReset} setIsResetPass={setIsReset} slide={slide}/>

            </LoginContentContainer>
        </LoginContainer>
    );
}

export default Login;