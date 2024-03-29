import axios from "axios";
import AppConfig from "../../constants/AppConfig";

type SignUpMutationType = {
    path: string;
	email: string;
	firstName: string;
    lastName: string;
	password: string;
    type: string;
    age: string;
    gender: string;
    location: string;
    expectedMateAge: string[];
    expectedVisitingPlaces: string[];
    travelLocationsPreference: string[];
    genderPreference: string[];
    religion: string;
	personQty: string;
	ridePreference: string[];
}

type SignInMutationType = {
    path: string;
	email: string;
	password: string;
}

type ForgotPasswordMutationType = {
    path: string;
	email: string;
}

type ResetPasswordMutationType = {
    path: string;
	email: string;
    password: string;
    confirmationCode: string;
}

const signUp = async (signUpFields: SignUpMutationType) => {    
    return await axios.post(AppConfig.APP_URL + signUpFields.path,{
        email: signUpFields.email,
        firstName: signUpFields.firstName,
        lastName: signUpFields.lastName,
        password: signUpFields.password,
        type: signUpFields.type,
        age: signUpFields.age,
        gender: signUpFields.gender,
        location: signUpFields.location,
        expectedMateAge: JSON.stringify(signUpFields.expectedMateAge),
        expectedVisitingPlaces: JSON.stringify(signUpFields.expectedVisitingPlaces),
        travelLocationsPreference: JSON.stringify(signUpFields.travelLocationsPreference),
        genderPreference: JSON.stringify(signUpFields.genderPreference),
        religion: signUpFields.religion,
        personQty: signUpFields.personQty,
        ridePreference: JSON.stringify(signUpFields.ridePreference),
    })
}

const signIn = async (signInFields: SignInMutationType) => {
    return await axios.post(AppConfig.APP_URL + signInFields.path,{
        email: signInFields.email,
        password: signInFields.password,
    })
}

const forgotPassword = async (forgotPasswordFields: ForgotPasswordMutationType) => {
    return await axios.post(AppConfig.APP_URL + forgotPasswordFields.path,{
        email: forgotPasswordFields.email,
    })
}

const resetPassword = async (resetPasswordFields: ResetPasswordMutationType) => {
    return await axios.post(AppConfig.APP_URL + resetPasswordFields.path,{
        email: resetPasswordFields.email,
        password: resetPasswordFields.password,
        confirmationCode: resetPasswordFields.confirmationCode
    })
}



const authApi = {
    signUp,
    signIn,
    forgotPassword,
    resetPassword
}

export default authApi;