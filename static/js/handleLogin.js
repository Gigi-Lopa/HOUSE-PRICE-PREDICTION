document.querySelector("#loginForm")
.addEventListener("submit", (e)=>{
    e.preventDefault()
    let csrfToken = getCookies("csrftoken")
    $.ajax({
        url:"/user/logins/",
        type:"POST",
        data:{
            "username":e.target.username.value,
            "password":e.target.password.value,
            csrfmiddlewaretoken: csrfToken

        },
        success:(res)=>{
            if (res["status"]){
                $(location).attr("href", "/home/")
            }
            else{
                toggleError(true, "#login__err")
            }
        },
    })

})