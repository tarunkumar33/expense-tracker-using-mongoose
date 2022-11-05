const axiosObj=axios.create({
    baseURL:'http://localhost:3000'
});

const loginFormArea=document.querySelector('.loginForm');

loginFormArea.addEventListener('submit',loginHandler);

async function loginHandler(e){
    try{
        e.preventDefault();
        const res=await axiosObj.post('/user/login',{
            email:e.target.email.value,
            password:e.target.password.value
        });
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('premiumUser',res.data.premiumUser);
        console.log(res);
        alert(res.data.message);
        window.location.href='./expenses.html';
    }
    catch(err){
        console.log(err);
        document.body.innerHTML+=`<div style="color:red;">${err.response.data.message}</div>`;
    }
}
function forgotpassword() {
    window.location.href = "./ForgotPassword/index.html";
}