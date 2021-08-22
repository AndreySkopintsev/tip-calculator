const billInput = document.getElementById('bill')
const tipAmount = document.getElementById('tipAmount')
const totalAmount = document.getElementById('totalAmount')
const dollarSpan = document.querySelector('.dollar-sign')
const peopleNumber = document.getElementById('peopleNumber')
const peopleDiv = document.querySelector('.people')
const errorMsg = document.getElementById('errorMsg')
const resetBtn = document.getElementById('resetBtn')
const percentageBtns = document.querySelectorAll('#percentageBtn')

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
    let bill = Number(e.target.value)
    if(bill > 0){
        billInput.value = `${bill.toFixed(2)}`
    }else{
        dollarSpan.style.color = `hsl(186, 14%, 43%)` 
    }
    
})

//Number of people dynamic change
peopleNumber.addEventListener('blur',(e)=>{
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
    errorMessage(false)
    percentageBtns.forEach(btn => {
        if(btn.textContent == '5%'){
            btn.classList.add('active-btn')
        }else{
            btn.classList.remove('active-btn')
        }
    })

})

//Percentage buttons
percentageBtns.forEach(btn => {
    btn.addEventListener('click',(e)=>{
        let value = e.target.textContent.slice(0,e.target.textContent.length - 1)
        currentPercentage = Number(value/100)
        e.target.classList.add('active-btn')
        percentageBtns.forEach(btn => {
            if(btn !== e.target){
                btn.classList.remove('active-btn')
            }
        })
        if(people !== 0 && bill !== 0){
            tipAmountChange(bill,currentPercentage)
        }
    })
})