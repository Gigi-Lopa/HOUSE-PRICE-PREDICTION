document.querySelector(".createAccountForm")
.addEventListener("submit", (e)=>{
   document.querySelectorAll(".required").forEach(element =>{
        let userInput = element.querySelector("input").value
        if (userInput == ""){
            e.preventDefault()
            element.querySelector(".err__div").classList.remove("hidden")
        } 
        else{
            element.querySelector(".err__div").classList.add("hidden")
        }
   })
   
    let usernameInput = e.target.username.value.length   
    if (usernameInput < 3 || usernameInput >= 15){
        e.preventDefault()
        document.querySelector("#username__err").classList.remove("hidden")
    }
    else{
        document.querySelector("#username__err").classList.add("hidden")

    }

    if (e.target.password.value !== e.target.confirmPassword.value){
        e.preventDefault()
        document.querySelector("#password__err").classList.remove("hidden")
    }
    else{
        document.querySelector("#password__err").classList.add("hidden")
    }
})