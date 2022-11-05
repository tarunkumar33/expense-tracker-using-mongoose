const token = localStorage.getItem('token');
const premiumUser=localStorage.getItem('premiumUser');

const axiosObj = axios.create({
    baseURL: 'http://localhost:3000',
    headers:{
        common:{
            Authorization:token
        }
    }
});

window.addEventListener("DOMContentLoaded", getUsers);
const userlistArea=document.querySelector('.userlist');
const userExpensesArea=document.querySelector('.userExpenses');
window.addEventListener("DOMContentLoaded", ()=>{
    console.log('premiumUser:', premiumUser);
    if(premiumUser!=null && premiumUser==="true"){
        document.body.style="background-color: #343a40";
        console.log(document.body);
    }
});

async function getUsers(){
    try{
        const res=await axiosObj.get('/leaderboard/getUsers');
        console.log(res);
        userExpensesArea.innerHTML='';
        userlistArea.innerHTML='';
        res.data.forEach(user=>{
            addUserToUI(user);
        })
    }
    catch(err){
        console.log(err);
        document.body.innerHTML += `<div style="color:red;">${err.response.data.message}</div>`;
    }
}
function addUserToUI({id,name,expenses}){
    userlistArea.innerHTML+=`<li id="${id}">User: ${name} <button class="expenseDetails">Check Expenses</button></li>`;
    // expenses.forEach(expense=>addExpensesToUI(expense));
}
function addExpensesToUI({description,expenseAmount}){
    userExpensesArea.innerHTML+=`<h3>Expense Description:${description}</h3>
    <p>Expense Amount: ${expenseAmount}</p>`;
}

userlistArea.onclick=async function(e){
    try{
        e.preventDefault();
        console.log(e.target.parentElement)
        if(e.target.classList.contains('expenseDetails')){
            const res=await axiosObj.get(`/leaderboard/getUserExpenses/${e.target.parentElement.id}`)
            console.log(res.data);
            userExpensesArea.innerHTML='';
            res.data.forEach(expense=>addExpensesToUI(expense));
        }
    }
    catch(err){
        console.log(err);
        document.body.innerHTML += `<div style="color:red;">${err.response.data.message}</div>`;
    }
}
