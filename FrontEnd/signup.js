const axiosObj=axios.create({
    baseURL:'http://localhost:3000'
});

const signupFormArea=document.querySelector('.signupForm');

//EventListeners
signupFormArea.addEventListener('submit',signupHandler);

async function signupHandler(e){
    try{
        e.preventDefault();
        // console.log("hi.......",e);
        
        const res=await axiosObj.post('/user/signup',{
            name:e.target.name.value,
            email:e.target.email.value,
            password:e.target.password.value
        });
        console.log(res);
        if(res.status===201){
            window.location.href='./login.html';
            // let a=1;
        }
        else{
            throw new Error("User already exists");
        }
    }
    catch(err){
        document.body.innerHTML+=`<div style="color:red;">${err}</div>`
    }
}