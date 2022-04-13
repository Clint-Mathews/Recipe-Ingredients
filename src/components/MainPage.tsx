import React, { useReducer } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../hooks';
import Header from '../ui-components/Header';
import Label from '../ui-components/Label';
import { login } from '../utils/authSlice';
import { UPDATE_FORM, onInputChange, onFocusOut, validateInput, RESET } from "../utils/formUtils"
import toastService, { ToastType } from '../utils/taostService';
function MainPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const initialState = {
        username: { value: "", touched: false, hasError: true, error: "" },
        password: { value: "", touched: false, hasError: true, error: "" },
        isFormValid: false,
    }
    const formsReducer = (state: any, action: any) => {
        switch (action.type) {
            case UPDATE_FORM:
                const { name, value, hasError, error, touched, isFormValid } = action.data
                return {
                    ...state,
                    // update the state of the particular field,
                    // by retaining the state of other fields
                    [name]: { ...state[name], value, hasError, error, touched },
                    isFormValid,
                }
            case RESET:
                return initialState;
            default:
                return state
        }
    }
    const ClearCred = async (e: any) => {
        e.preventDefault();
        formdispatch({
            type: RESET
        });
    }
    const [formState, formdispatch] = useReducer(formsReducer, initialState);
    const SubmitLogin = async (e: any) => {
        e.preventDefault();
        let isFormValid = true

        for (const name in formState) {
            const item = formState[name]
            const { value } = item
            const { hasError, error } = validateInput(name, value)
            if (hasError) {
                isFormValid = false
            }
            if (name) {
                formdispatch({
                    type: UPDATE_FORM,
                    data: {
                        name,
                        value,
                        hasError,
                        error,
                        touched: true,
                        isFormValid,
                    },
                })
            }
        }
        if (!isFormValid) {
            toastService({ text: "Invalid credentials", toastType: ToastType.Error });
        } else {
            toastService({ text: "Login successful", toastType: ToastType.Success });
            dispatch(login());
            navigate('/recipe');
        }
    }
    return (
        <Container>
            <Header heading="Login" hideSideBar showAdd />
            <SubContainer>
                <LoginComponentContainer>
                    <FormInputSet>
                        <Label label="Username" />
                        <Input className={formState.username.touched && formState.username.hasError && `error`} type="text" value={formState.username.value} onChange={e => {
                            onInputChange("username", e.target.value, formdispatch, formState)
                        }} onBlur={e => {
                            onFocusOut("username", e.target.value, formdispatch, formState)
                        }} />
                        {formState.username.touched && formState.username.hasError && (
                            <ErrorMsg className="error">{formState.username.error}</ErrorMsg>
                        )}
                    </FormInputSet>
                    <FormInputSet>
                        <Label label="Password" />
                        <Input className={formState.password.touched && formState.password.hasError && `error`} type="text" value={formState.password.value} onChange={e => {
                            onInputChange("password", e.target.value, formdispatch, formState)
                        }} onBlur={e => {
                            onFocusOut("password", e.target.value, formdispatch, formState)
                        }} />
                        {formState.password.touched && formState.password.hasError && (
                            <ErrorMsg className="error">{formState.password.error}</ErrorMsg>
                        )}
                    </FormInputSet>
                    <ButtonContainer>
                        <Button type="button" onClick={SubmitLogin}> <span >Login </span></Button>
                        <Button type="button" onClick={ClearCred} className="cancel"> Clear</Button>
                    </ButtonContainer>
                </LoginComponentContainer>
            </SubContainer>
        </Container>
    )
}

export default MainPage

const Container = styled.div`
`;
const SubContainer = styled.div``;
const LoginComponentContainer = styled.div`
background-color: white;
margin: 20px;
border-radius: 10px;
padding: 20px 20px 20px 25px;
box-shadow: 0 0 25px rgb(0 0 0 / 10%);
:hover{
    box-shadow: 0 0 25px rgb(0 0 0 / 15%);
}
`;
const FormInputSet = styled.div`
height: 54px;
    display: flex;
    flex-direction: column;
    margin: 10px;
        position: relative;
        padding-bottom: 18px;
`;
const ErrorMsg = styled.div`
color: red;
    position: absolute;
    bottom: -2px;
    font-size: 12px;
`;
const Input = styled.input`
margin: 0;
border-radius:5px;
padding: 0;
padding: 10px;
border: 1px solid rgb(0 0 0 / 30%) ;
transition: border 0.4s ease-in-out;   
height: 100%;
:focus,:hover{
    color: black;
    outline: 0;
    border: 1px solid #0a66c2 ;
}
        &.error{
            transition: none;  
            border: 1px solid red ;
        }
`;

const ButtonContainer = styled.div`
display: flex;
    align-self: end;
    margin:0 10px 0 0;
`;
const Button = styled.button`
position: relative;
margin-left: 10px;
width: 100px;
color: white;
background: #0a66c2;
border: 0;
height: 34px;
border: 0;
border-radius: 5px;
transition: all 0.2s ease-in-out;
&.cancel{
color: rgba(41, 41, 41, 1);
background: rgb(0 0 0 / 18%)
}

&.button-loading .button-text{
    visibility: hidden;
    opacity:0;
}

&.button-loading::after{
    content:"";
    position: absolute;
    width: 16px;
    height: 16px;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin: auto;
    border: 4px solid transparent;
    border-top-color:white;
    border-radius: 50%;
    animation : button-loading-spinner 1s linear infinite;
}
@keyframes button-loading-spinner {
    from{
        transform: rotate(0turn);
    }
    to{
        transform: rotate(1turn);
    }
}

:hover,:focus,:active{
cursor: pointer;
background:#004c99;
&.cancel{
background: rgb(0 0 0 / 28%)
}
}
`;