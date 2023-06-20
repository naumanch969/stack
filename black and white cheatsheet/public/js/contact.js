const contactForm = document.getElementsByClassName("contactForm")[0]



const emailValidation = ()=>{
const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const inputBoxEmail = document.getElementsByClassName("inputBoxEmail")[0]
const email = document.getElementsByClassName("email")[0].value
const emailText = document.getElementsByClassName("emailText")[0]
if(email.match(emailPattern)){
    inputBoxEmail.classList.add("validEmail")
    inputBoxEmail.classList.remove("invalidEmail")
    emailText.innerHTML = "Your Email is Valid"
    emailText.style.color = "green"
}
else{
    // inputBoxEmail.classList.add("invalidEmail")
    // inputBoxEmail.classList.remove("validEmail")
    // emailText.innerHTML = "Please Enter The Valid Email"
    // emailText.style.color = "red"
}

console.log(email)
if(email == ""){
    inputBoxEmail.classList.remove("validEmail")
    inputBoxEmail.classList.remove("invalidEmail")
    emailText.innerHTML = ""
    emailText.style.color = "#00ff00"
}
}


reg = /^(03)[01234]\d{8}/g







