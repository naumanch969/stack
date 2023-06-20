import { useState, useEffect } from 'react'
import { Grid, Typography, Container, Button, Paper, Avatar, Autocomplete, TextField } from "@mui/material"
import { LockOutlined } from '@mui/icons-material'
import Input from './Input'
import { GoogleLogin } from "@react-oauth/google"
import jwt_decode from "jwt-decode"
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { signUp, login } from "../../actions/user"
import { useStateContext } from '../../contexts/ContextProvider'

const Auth = () => {

    const { userState, setUserState } = useStateContext()
    const [showPassword, setShowPassword] = useState(false)
    const { isSignUpPage, setIsSignUpPage } = useStateContext()

 
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setUserState({
            ...userState,
            userData: { ...userState.userData, [e.target.name]: e.target.value }
        })
    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
        // setShowPassword(() => showPassword ? false : true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignUpPage) {
            dispatch(signUp(userState.userData))
            setIsSignUpPage(false)
        } else {
            const { email, password, date } = userState.userData
            dispatch(login({ email, password, date }, navigate))
        }
    }

    const googleSuccess = async (res) => {
        try {
            const token = await res?.credential;    // it will not return an error (cannot read profileObj property of undefined) if response is null
            const result = await jwt_decode(token);
            dispatch({ type: "AUTH", payload: { result, token } })
            navigate("/")
        } catch (error) {
            console.log("error in google success - Auth.js", error)
        }
    }

    const googleError = (error) => {
        console.log("error in google authentication ", error)
    }

    const switchMode = () => {
        setIsSignUpPage((prevIsSignUpPage) => !prevIsSignUpPage)
    }

    return (
        <Container component="main" maxWidth="xs" >
            <Paper className="p-4 mt-4 flex flex-col items-center " elevation={3} >
                <Avatar className="bg-gray-400  " > <LockOutlined /> </Avatar>
                <Typography variant="h5" > {isSignUpPage ? "Sign Up" : "Sign In"} </Typography>


                <form onSubmit={handleSubmit} className='flex flex-col gap-[10px] ' >
                    <Grid container className="gap-[6px] " >

                        {isSignUpPage && (
                            <>
                                <Input name='firstName' label="First Name" handleChange={handleChange} half />
                                <Input name='lastName' label="Last Name" handleChange={handleChange} half /> 
                            </>
                        )}
                        <Input name="email" label="Email" type="email" handleChange={handleChange} />
                        <Input name="password" label="Password" type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} handleChange={handleChange} />
                        {isSignUpPage && (
                            <Input name="confirmPassword" label="Confirm Password" type="password" handleChange={handleChange} />
                        )}
                    </Grid>
                    {/* submit button */}
                    <Button type="submit" fullWidth variant="contained" color='primary' > {isSignUpPage ? "Sign Up" : "Login"} </Button>
                    {/* google button */}
                    <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
                    {/* switch between login and signup */}
                    <Grid container  >
                        <Grid item >
                            <Button variant="outlined" fullWidth onClick={switchMode} color="primary" > {isSignUpPage ? "Already have an account? Sign In" : "Don't have an account? Sign Up"} </Button>
                        </Grid>
                    </Grid>

                </form>




            </Paper>
        </Container>
    )
}

export default Auth


// client id
// 852629080543-59fla6jkhjahqh6fdn3ijdu925d4li0k.apps.googleusercontent.com
// client secret
// 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
