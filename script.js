const billInput = document.getElementById('bill')
const tipAmount = document.getElementById('tipAmount')
const totalAmount = document.getElementById('totalAmount')
const dollarSpan = document.querySelector('.dollar-sign')
const peopleNumber = document.getElementById('peopleNumber')
const peopleDiv = document.querySelector('.people')
const errorMsg = document.getElementById('errorMsg')
const resetBtn = document.getElementById('resetBtn')

let currentPercentage = 0.05
let people = 0
let bill = 0


//Functions

//Tip Amount dynamic change
function tipAmountChange(value,percentage){
    let tip = (Math.round(((value*percentage)/people)*100)/100).toFixed(2)
    tipAmount.textContent = `$${tip}`
    totalAmountChange(value,tip)
}

//Total amount dynamic change
function totalAmountChange(value,tip){
    let total = ((Number(value)+Number(tip))/people).toFixed(2)
    console.log(total)
    totalAmount.textContent = `$${total}`
}

//Shows error message when zero people
function errorMessage(state){
    if(state){
        peopleDiv.classList.add('error')
        errorMsg.classList.add('error')
    }else{
        peopleDiv.classList.remove('error')
        errorMsg.classList.remove('error')
    }
}

//Event listeners

//Changes tip amount field and total amount field on input
billInput.addEventListener('input',()=>{
    dollarSpan.style.color = `hsl(183, 100%, 15%)` 
    bill = Number(billInput.value)
    if(people == 0){
        errorMessage(true)
    }else{
        tipAmountChange(bill,currentPercentage)
    }
    
})

//Change people number
peopleNumber.addEventListener('change',(e)=>{
    people = Number(e.target.value)
    errorMessage(false)
    if(bill > 0){
        tipAmountChange(bill,currentPercentage)
    }
})

//Changes value in bill input on blur
billInput.addEventListener('blur',(e)=>{
    console.log(e.target.value)
    let bill = Number(e.target.value)
    if(bill > 0){
        billInput.value = `${bill.toFixed(2)}`
    }else{
        dollarSpan.style.color = `hsl(186, 14%, 43%)` 
    }
    
})

//Number of people dynamic change
peopleNumber.addEventListener('blur',(e)=>{
    console.log(e.target.value)
    people = Number(e.target.value)
})

//Reset button
resetBtn.addEventListener('click',()=>{
    currentPercentage = 0.05
    people = 0
    bill = 0
    tipAmount.textContent = `$0.00`
    totalAmount.textContent = `$0.00`
    billInput.value = ''
    peopleNumber.value = ''
    dollarSpan.style.color = `hsl(186, 14%, 43%)` 
})