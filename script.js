const billInput = document.getElementById('bill')
const tipAmount = document.getElementById('tipAmount')
const totalAmount = document.getElementById('totalAmount')
const dollarSpan = document.querySelector('.dollar-sign')

let currentPercentage = 0.05


//Functions

//Tip Amount dynamic change
function tipAmountChange(value,percentage){
    let tip = (Math.round(value*percentage*100)/100).toFixed(2)
    tipAmount.textContent = `$${tip}`
    totalAmountChange(value,tip)
}

//Total amount dynamic change
function totalAmountChange(value,tip){
    let total = (Number(value)+Number(tip)).toFixed(2)
    totalAmount.textContent = `$${total}`
}

//Event listeners
billInput.addEventListener('input',()=>{
    dollarSpan.style.color = `hsl(183, 100%, 15%)` 
    tipAmountChange(billInput.value,currentPercentage)
})

billInput.addEventListener('blur',(e)=>{
    console.log(e.target.value)
    let bill = Number(e.target.value)
    if(bill > 0){
        billInput.value = `${bill.toFixed(2)}`
    }else{
        dollarSpan.style.color = `hsl(186, 14%, 43%)` 
    }
    
})