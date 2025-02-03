import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { userRegister } from "../../../services/login-service";
import styled from "styled-components";
import APIResponse from "../../../components/ApiResponse";
import Button from "../../../components/AccAssets/AccInputs/Button";
import InputPass from "../../../components/AccAssets/AccInputs/PasswordInput";
import EmailInput from "../../../components/AccAssets/AccInputs/EmailInput";

const RegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px;
    gap: 2.3rem;
    width: 100%;
    opacity: 1;
    transform: translateX(0);
    transition: opacity .3s ease-in-out, transform .7s ease-in-out;

    &.forgot-password{
        opacity: 0;
        transform: translateX(-50vw);
    }
`

const RegisterTexts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`

const RegisterTitle = styled.h1`
    color: var(--login-text-color);
    font-family: "Nunito Sans";
    font-size: 2rem;
    font-weight: 700;
`

const RegisterSubtitle = styled.p`
    color: var(--login-text-color);
    font-family: "Nunito Sans";
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.064px;
`

const RegisterFormContainer = styled.form`
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

const RegisterButtonContainer = styled.div`
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

function RegisterContent() {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [apiResponse, setApiResponse] = useState("");
    const [apiResponseColor, setApiResponseColor] = useState("");
    const registerContentRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "JStar Travel | Login";
      }, []);

    const handleForm = async (e) => {
        e.preventDefault();
        setApiResponse("");
        setApiResponseColor("");

        if (!username || !password || !email) {
            setApiResponseColor("red");
            setApiResponse("Please fill in all fields.");
            return;
        }

        const credentials = {
            email,
            username,
            password
        };

        try {
            const response = await userRegister(credentials);
    
            console.log("API response:", response);

            if (response && response.success) {

                setApiResponseColor("#6579FC");

                setApiResponse(response.sucess);

                localStorage.setItem("token", response.token);
                localStorage.setItem("username", credentials.username);

                setTimeout(() => {
                    navigate("/");
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
            setApiResponse("Register failed.");
        }
    }

    return (
        <>
            <RegisterContainer ref={registerContentRef}>
                <RegisterTexts>
                    <RegisterTitle>Create an Account</RegisterTitle>
                    <RegisterSubtitle>Create a account to continue</RegisterSubtitle>
                </RegisterTexts>

                <RegisterFormContainer onSubmit={handleForm}>
                    <FormContent>
                        <InputContainer>
                            <InputContent>
                                <InputLabel>
                                    <p>Email address</p>
                                </InputLabel>

                                <EmailInput type={"email"} value={email} setUsername={setEmail} placeholder={"Enter your email"}/>

                            </InputContent>
                        </InputContainer>

                        <InputContainer>
                            <InputContent>
                                <InputLabel>
                                    <p>Username</p>
                                </InputLabel>

                                <EmailInput type={"text"} value={username} setUsername={setUsername} placeholder={"Create a username"}/>

                            </InputContent>
                        </InputContainer>

                        <InputContainer>
                            <InputContent>
                                <InputLabel>
                                    <p>Password</p>
                                </InputLabel>
                                
                                <InputPass setPassword={setPassword} placeholder={"Create a password"}/>

                            </InputContent>

                        </InputContainer>
                    </FormContent>

                    <RegisterButtonContainer>
                        <Button type={"submit"} content={"Sign Up"}/>

                        <RegisterSubtitle>Already have an account? <LinkStyled to="/login">Login</LinkStyled></RegisterSubtitle>

                        <APIResponse apiResponse={apiResponse} apiResponseColor={apiResponseColor}/>
                    </RegisterButtonContainer>
                </RegisterFormContainer>
            </RegisterContainer>
        </>
    );
}

export default RegisterContent;