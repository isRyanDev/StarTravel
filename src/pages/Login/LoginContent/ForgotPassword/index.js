import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { userUUID, resetPassword } from "../../../../services/userAccount";
import APIResponse from "../../../../components/ApiResponse/index.js";
import InputPass from "../../../../components/AccAssets/AccInputs/PasswordInput/index.js";
import TextInput from "../../../../components/AccAssets/AccInputs/TextInput/index.js";
import Button from "../../../../components/AccAssets/AccInputs/Button/index.js";

const ForgotPasswordContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`

const SendEmailContainer = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.3125rem;
    transform: translateX(+100vw);
    transition: opacity .3s ease-in-out, transform .7s ease-in-out;
    opacity: 0;
    width: 100%;
    height: 100%;

    &.active{
        opacity: 1;
        transform: translate(0);
    }

    &.reactive{
        opacity: 1;
        transform: translate(-100vw);
    }
`

const ResetFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    justify-content: center;
    gap: 2rem;
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
    text-align: center;
    font-family: "Nunito Sans";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    padding: 0 .5rem;
    line-height: normal;
    letter-spacing: -0.064px;
`

const ForgotButtons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1.2rem;
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

const ResetButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1rem;
`

const SendPasswordContainer = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.3125rem;
    transform: translateX(+100vw);
    transition: opacity .3s ease-in-out, transform .7s ease-in-out;
    opacity: 0;
    width: 100%;
    height: 100%;

    &.active{
        opacity: 1;
        transform: translate(0);
    }
`

function ForgotPassword({slide, isResetPass, setIsResetPass, apiResponse, setApiResponse}) {
    const [apiResponseColor, setApiResponseColor] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPass, setconfirmPass] = useState("");
    const [uuid, setUuid] = useState("");
    const sendEmailRef = useRef(null);
    const sendPassRef = useRef(null);
    const emailFormRef = useRef(null);
    const passwordFormRef = useRef(null);

    useEffect(() => {
        const sendEmail = sendEmailRef.current;

        isResetPass ? sendEmail.classList.add("active") : sendEmail.classList.remove("active");
    })

    const reactiveSlide = () => {
        const sendEmail = sendEmailRef.current;
        const sendPass = sendPassRef.current;
        const emailForm = emailFormRef.current;
        const passwordForm = passwordFormRef.current;
        setIsResetPass(!isResetPass);

        sendEmail.classList.toggle("reactive");
        sendPass.classList.toggle("active");

        setTimeout(() => {
            setApiResponse("");
            setEmail("");
            setNewPassword("");
            setconfirmPass("");
            emailForm.reset();
            passwordForm.reset();
        }, 300);
    };

    const getUUID = async (e) => {
        e.preventDefault(); 

        if (!email) {
            setApiResponse("Please fill in all fields.");
            setApiResponseColor("red");
            return;
        }
    
        try {
            const response = await userUUID({"email": email});
            console.log("API response:", response);
    
            if (response && response.userUUID) {
                setUuid(response.userUUID);
                reactiveSlide();
            }
            else{
                setApiResponse("Email not found.");
                setApiResponseColor("red");
            }
        } catch (error) {
            setApiResponse("An error occurred. Please try again later.");
        }
    };

    const resetPass = async (e) => {
        e.preventDefault();

        if (!newPassword) {
            setApiResponse("Please fill in all fields.");
            setApiResponseColor("red");
            return;
        }

        if(newPassword !== confirmPass){
            setApiResponse("Passwords do not match.");
            setApiResponseColor("red");
            return;
        }

        try {
            const response = await resetPassword(uuid, {"newpassword": newPassword});
            console.log("API response:", response);

            if (response && response.sucess) {
                setApiResponseColor("#6579FC");
                setApiResponse("Successfully! You will be redirected in 5 seconds.");

                setTimeout(() => {
                    window.location.reload();
                }, 5000);
            }
        } catch (error) {
            setApiResponse("An error occurred. Please try again later.");
        }
    }

    return(
            <ForgotPasswordContainer>
                <SendEmailContainer ref={sendEmailRef}>
                    <LoginTexts>
                        <LoginTitle>Recover Password</LoginTitle>
                        <LoginSubtitle>Please enter your email address to continue</LoginSubtitle>
                    </LoginTexts>

                    <ResetFormContainer ref={emailFormRef} onSubmit={getUUID} id="forgotForm">
                        <InputContainer>
                            <InputContent>
                                <InputLabel>
                                    <p>Email address:</p>
                                </InputLabel>

                                <TextInput type="email" value={email} setText={setEmail} placeholder={"Enter your email"}/>

                            </InputContent>
                        </InputContainer>

                        <ForgotButtons>
                            <>
                                <ResetButtonContainer>
                                    <Button type={"submit"} content={"Continue"}/>
                                    <Button type={"button"} content={"Back to Login"} action={slide}/>
                                </ResetButtonContainer>
                            </>

                            <APIResponse apiResponse={apiResponse} apiResponseColor={apiResponseColor} />
                        </ForgotButtons>

                    </ResetFormContainer>
                </SendEmailContainer>

                <SendPasswordContainer ref={sendPassRef}>
                    <LoginTexts>
                        <LoginTitle>Recover Password</LoginTitle>
                        <LoginSubtitle>Please enter a new password to recover your account</LoginSubtitle>
                    </LoginTexts>

                    <ResetFormContainer ref={passwordFormRef} onSubmit={resetPass} id="resetForm">
                        <InputContainer>
                            <InputContent>
                                <InputLabel>
                                    <p>New password:</p>
                                </InputLabel>

                                <InputPass setPassword={setNewPassword} placeholder={"Create a new password"}/>

                            </InputContent>
                        </InputContainer>

                        <InputContainer>
                            <InputContent>
                                <InputLabel>
                                    <p>Confirm password:</p>
                                </InputLabel>

                                <InputPass setPassword={setconfirmPass} placeholder={"Confirm your new password"}/>

                            </InputContent>
                        </InputContainer>

                        <ForgotButtons>
                            <>
                                <ResetButtonContainer>
                                    <Button type={"submit"} content={"Reset Password"}/>
                                    <Button type={"button"} content={"Back to email address"} action={reactiveSlide}/>
                                </ResetButtonContainer>
                            </>

                            <APIResponse apiResponse={apiResponse} apiResponseColor={apiResponseColor} />
                        </ForgotButtons>

                    </ResetFormContainer>
                </SendPasswordContainer>
            </ForgotPasswordContainer>
    )
}

export default ForgotPassword