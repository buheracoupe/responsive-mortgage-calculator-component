const radioBtnsContainer = document.querySelectorAll(".radio-btns")
const radioBtns = document.querySelectorAll("[type=radio]")
const clearAll = document.getElementById("clear-btn")
const numberInputs = document.querySelectorAll("[type=number]")
const calculateBtn = document.querySelector("#calculate")
const mortgageAmount = document.querySelector("#mortgage-amount")
const termInput = document.querySelector("#term")
const interestRate = document.querySelector("#interest-rate")
const leftDiv = document.querySelector(".right")
const formAlerts = document.querySelectorAll(".form-alert")

radioBtnsContainer.forEach((buttonDiv) => {
    buttonDiv.addEventListener("click", (event) => {
        const radioButton = buttonDiv.querySelector('input[type="radio"]');
        radioButton.checked = true;
    })
})

clearAll.addEventListener("click", () => {
    radioBtns.forEach((radioButton) => {
        radioButton.checked = false;
    })
    numberInputs.forEach((numberInput) => {
        numberInput.value = "";
    })
    document.querySelector("#type-alert").style.display = "none";
    document.querySelector("#amount-alert").style.display = "none";
    document.querySelector("#term-alert").style.display = "none";
    document.querySelector("#interest-rate-alert").style.display = "none";

    document.querySelector("#amount-text").style.backgroundColor = "var(--Slate-100)";
    document.querySelector("#amount-text").style.color = "var(--Slate-700)";
    document.querySelector("#years-text").style.backgroundColor = "var(--Slate-100)";
    document.querySelector("#years-text").style.color = "var(--Slate-700)";
    document.querySelector("#rate-text").style.backgroundColor = "var(--Slate-100)";
    document.querySelector("#rate-text").style.color = "var(--Slate-700)";
})//add clearAll functionality to remove error messages 

function calculate(event) {

    event.preventDefault();
const amount =parseFloat(mortgageAmount.value)
const term = parseFloat(termInput.value);
const rate = parseFloat(interestRate.value);
const mortgageType = document.querySelector("input[name=type-btn]:checked");

if (!mortgageType) {
  document.querySelector("#type-alert").style.display = "block";
  document.querySelector("#type-alert").style.color = "red";
}else{
    document.querySelector("#type-alert").style.display = "none";
}

console.log(mortgageType ? mortgageType.value : "No mortgage type selected"); 

if(isNaN(amount) || amount <= 0) {
    document.querySelector("#amount-alert.form-alert").style.display = "block";
    document.querySelector("#amount-text").style.backgroundColor = "red";
    document.querySelector("#amount-text").style.color = "white";
}else{
    document.querySelector("#amount-alert.form-alert").style.display = "none";
    document.querySelector("#amount-text").style.backgroundColor = "var(--Slate-100)";
    document.querySelector("#amount-text").style.color = "var(--Slate-700)";
}

if(isNaN(term) || term <= 0) {
    document.querySelector("#term-alert.form-alert").style.display = "block";
    document.querySelector("#years-text").style.backgroundColor = "red";
    document.querySelector("#years-text").style.color = "white";
}else{
    document.querySelector("#term-alert.form-alert").style.display = "none";
    document.querySelector("#years-text").style.backgroundColor = "var(--Slate-100)";
    document.querySelector("#years-text").style.color = "var(--Slate-700)";
}

if(isNaN(rate) || rate <= 0 || rate >= 100) {
    document.querySelector("#interest-rate-alert.form-alert").style.display = "block";
    document.querySelector("#rate-text").style.backgroundColor = "red";
    document.querySelector("#rate-text").style.color = "white";
}else{
    document.querySelector("#interest-rate-alert.form-alert").style.display = "none";
    document.querySelector("#rate-text").style.backgroundColor = "var(--Slate-100)";
    document.querySelector("#rate-text").style.color = "var(--Slate-700)";
}
const monthlyRate = rate / 12 / 100;
  const totalMonths = term * 12;

  const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1)).toFixed(2);;
  const totalPayments = (monthlyPayment * totalMonths).toFixed(2);
  const principalPayment = amount / totalMonths;
const interestOnlyPayment = (monthlyPayment - principalPayment).toFixed(2);
const totalInterestPayment = (totalPayments - amount).toFixed(2);

  if(amount && rate && term && mortgageType.value === "repayment"){
    displayResults(monthlyPayment, totalPayments)
  };
// console.log(monthlyPayment)

if(amount && rate && term && mortgageType.value === "interest"){
    displayInterest(interestOnlyPayment, totalInterestPayment);
}
}

function displayResults(monthlyPayment, totalPayments){
    leftDiv.innerHTML =`
    <div class="yourresults">
    <h2 style="flex:1" id="your-result">Your Results</h2>
    <p style="flex:1" id="results-explanation">Your results shown below are based off of the information you provided.
        To adjust the results, edit the form and click 'Calculate Repayments' again.
    </p>
    </div>
    <div style="flex:1" class="calc-results-container">
        <p>Your Monthly Repayments</p>
        <span id="monthly-amount">$${monthlyPayment}</span>
        <p>Total you'll repay over the term</p>
        <span id="total-repayment">$${totalPayments}</span>

    </div>
    `
}

function displayInterest(interestOnly, totalPayments){
    leftDiv.innerHTML =`
<div class="yourresults">
    <h2 style="flex:1" id="your-result">Your Results</h2>
    <p style="flex:1" id="results-explanation">Your results shown below are based off of the information you provided.
        To adjust the results, edit the form and click 'Calculate Repayments' again.
    </p>
    </div>
    <div style="flex:1" class="calc-results-container">
        <p>Your Monthly Interest Payments</p>
        <span id="monthly-amount">$${interestOnly}</span>
        <p>Total <strong>interest</strong> you'll repay over the term</p>
        <span id="total-repayment">$${totalPayments}</span>

    </div>
    `
}


//eventlisteners
calculateBtn.addEventListener("click", calculate)
