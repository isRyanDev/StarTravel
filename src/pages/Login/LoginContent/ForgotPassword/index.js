import { useEffect, useState } from "react";
import styled from "styled-components";
import { resetPassword, sendCode, verifyCode } from "../../../../services/users";
import APIResponse from "../../../../components/ApiResponse/index.js";
import InputPass from "../../../../components/AccAssets/AccInputs/PasswordInput/index.js";
import TextInput from "../../../../components/AccAssets/AccInputs/TextInput/index.js";
import Button from "../../../../components/AccAssets/AccInputs/Button/index.js";
import CircleLoad from "../../../../components/CircleLoad/index.js";

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

const ConfirmCodeContainer = styled.div`
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
`;

const ResetFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    justify-content: center;
    gap: 2rem;
`

const HeaderTexts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`

const HeaderTitle = styled.h1`
    color: var(--login-text-color);
    font-family: "Nunito Sans";
    font-size: 2rem;
    font-weight: 700;
`

const HeaderSubtitle = styled.p`
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

function ForgotPassword({slide, isResetPass, apiResponse, setApiResponse}) {
    const [apiResponseColor, setApiResponseColor] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPass, setconfirmPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [code, setCode] = useState("");
    const [step, setStep] = useState("");

    useEffect(() => {
        isResetPass ? setStep("email") : setStep("");
    }, [isResetPass])

    const handleSendCode = async (e) => {
        e.preventDefault(); 
        setLoading(true);
        setIsButtonDisabled(true);

        if (!email) {
            setApiResponse("Please fill in all fields.");
            setApiResponseColor("red");
            setLoading(false);
            setIsButtonDisabled(false);
            return;
        }
    
        try {
            const response = await sendCode({"email": email});
    
            if (response.success) {
                setApiResponseColor("");
                setApiResponse("");
                setStep("code")
            }
            else{
                setApiResponseColor("red");
                setApiResponse(response.message);
            }
        } catch (error) {
            setApiResponseColor("red");
            setApiResponse(error.message);
        } finally{
            setLoading(false);
            setIsButtonDisabled(false);
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        setIsButtonDisabled(true);

        try {
            const response = await verifyCode({"email": email, "code": code});

            if (response.success) {
                setApiResponseColor("");
                setApiResponse("");
                setStep("password");
            }
            else{
                setApiResponseColor("red");
                setApiResponse(response.message);
            }
        } catch (error) {
            setApiResponseColor("red");
            setApiResponse(error.message);
        } finally {
            setLoading(false);
            setIsButtonDisabled(false);
        }
    }

    const resetPass = async (e) => {
        e.preventDefault();
        setLoading(true);
        setIsButtonDisabled(true);

        if (!newPassword) {
            setApiResponse("Please fill in all fields.");
            setApiResponseColor("red");
            setLoading(false);
            setIsButtonDisabled(false);
            return;
        }

        if(newPassword !== confirmPass){
            setApiResponse("Passwords do not match.");
            setApiResponseColor("red");
            setLoading(false);
            setIsButtonDisabled(false);
            return;
        }

        try {
            const response = await resetPassword({
                "email": email,
                "code": code,
                "newpassword": newPassword
            });

            if (response.success) {
                setApiResponseColor("#6579FC");
                setApiResponse(response.message);

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
            else{
                setApiResponseColor("red");
                setApiResponse(response.message);
            }
        } catch (error) {
            setApiResponseColor("red");
            setApiResponse(error.message);
        } finally{
            setLoading(false);
            setIsButtonDisabled(false);
        }
    }

    function handleCancel(){
        setEmail("");
        setNewPassword("");
        setCode("");
        setconfirmPass("");
        setApiResponse("");
        setApiResponseColor("");
        setStep("email");
    }

    return(
            <ForgotPasswordContainer>
                <SendEmailContainer className={step === "email" ? "active" : step === "code" || step === "password" ? "reactive" : ""}>
                    <HeaderTexts>
                        <HeaderTitle>Recover Password</HeaderTitle>
                        <HeaderSubtitle>Please enter your email address to continue</HeaderSubtitle>
                    </HeaderTexts>

                    <ResetFormContainer onSubmit={handleSendCode}>
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
                                    <Button isDisabled={isButtonDisabled} type={"submit"} content={"Continue"}/>
                                    <Button isDisabled={isButtonDisabled} type={"button"} content={"Back to Login"} action={slide}/>
                                </ResetButtonContainer>
                            </>

                            {loading ? <CircleLoad/> : 
                                <APIResponse apiResponse={apiResponse} apiResponseColor={apiResponseColor} />
                            }
                        </ForgotButtons>

                    </ResetFormContainer>
                </SendEmailContainer>

                <ConfirmCodeContainer className={step === "code" ? "active" : step === "password" ? "reactive" : ""}>
                    <HeaderTexts>
                        <HeaderTitle>Send verification code</HeaderTitle>
                        <HeaderSubtitle>Please enter the code sent to your email</HeaderSubtitle>
                    </HeaderTexts>

                    <ResetFormContainer onSubmit={handleVerifyCode}>
                        <InputContainer>
                            <InputContent>
                                <InputLabel>
                                    <p>Code:</p>
                                </InputLabel>

                                <TextInput type="number" value={code} setText={setCode} placeholder={"Enter your verification code"}/>

                            </InputContent>
                        </InputContainer>

                        <ForgotButtons>
                            <>
                                <ResetButtonContainer>
                                    <Button isDisabled={isButtonDisabled} type={"submit"} content={"Continue"}/>
                                    <Button isDisabled={isButtonDisabled} type={"button"} content={"Back to email adress"} action={handleCancel}/>
                                </ResetButtonContainer>
                            </>

                            {loading ? <CircleLoad/> : 
                                <APIResponse apiResponse={apiResponse} apiResponseColor={apiResponseColor} />
                            }
                        </ForgotButtons>

                    </ResetFormContainer>
                </ConfirmCodeContainer>

                <SendPasswordContainer className={step === "password" ? "active" : ""}>
                    <HeaderTexts>
                        <HeaderTitle>Recover Password</HeaderTitle>
                        <HeaderSubtitle>Please enter a new password to recover your account</HeaderSubtitle>
                    </HeaderTexts>

                    <ResetFormContainer onSubmit={resetPass}>
                        <InputContainer>
                            <InputContent>
                                <InputLabel>
                                    <p>New password:</p>
                                </InputLabel>

                                <InputPass value={newPassword} setPassword={setNewPassword} placeholder={"Create a new password"}/>

                            </InputContent>
                        </InputContainer>

                        <InputContainer>
                            <InputContent>
                                <InputLabel>
                                    <p>Confirm password:</p>
                                </InputLabel>

                                <InputPass value={confirmPass} setPassword={setconfirmPass} placeholder={"Confirm your new password"}/>

                            </InputContent>
                        </InputContainer>

                        <ForgotButtons>
                            <>
                                <ResetButtonContainer>
                                    <Button isDisabled={isButtonDisabled} type={"submit"} content={"Reset Password"}/>
                                    <Button isDisabled={isButtonDisabled} type={"button"} content={"Back to email address"} action={handleCancel}/>
                                </ResetButtonContainer>
                            </>

                            {loading ? <CircleLoad/> : 
                                <APIResponse apiResponse={apiResponse} apiResponseColor={apiResponseColor} />
                            }
                        </ForgotButtons>
                    </ResetFormContainer>
                </SendPasswordContainer>
            </ForgotPasswordContainer>
    )
}

export default ForgotPassword