const homeCost = document.getElementById("homeCost");
const initialPayment = document.getElementById("initialPayment");
const loanTotal = document.getElementById("loanTotal");
const interestRate = document.getElementById("interestRate");
const loanLength = document.getElementById("loanLength");

const form = document.getElementById("mortgage");

initialPayment.addEventListener("keyup", () => {
  loanTotal.value = homeCost.value - initialPayment.value;

  var loanTotalValue = loanTotal.value;
  return loanTotalValue;
});

function calculateMortgage(loanTotal, interestRate, numberMonthlyPayments) {
  interestRate = percentageToDecimal(interestRate);
  function percentageToDecimal(percent) {
    return percent / 12 / 100;
  }

  numberMonthlyPayments = yearsToMonths(numberMonthlyPayments);
  function yearsToMonths(year) {
    return year * 12;
  }

  let mortgage =
    (interestRate * loanTotal) /
    (1 - Math.pow(1 + interestRate, -numberMonthlyPayments));

  console.log(mortgage);
  return parseFloat(mortgage.toFixed(2));
}


form.onsubmit = (e) => {
  e.preventDefault();
  validate();
  let loanTotal = homeCost.value - initialPayment.value;

  let monthlyPayment = calculateMortgage(
    loanTotal,
    interestRate.value,
    loanLength.value
  );

  document.getElementById("monthlyPayment").innerHTML = `$ ${monthlyPayment}`;
};



function validate() {
    if (
      homeCost.value === "" ||
      initialPayment.value === "" ||
      interestRate.value === "" ||
      loanLength.value === ""
    ) {
  
      let alert = document.createElement("div");
      alert.className = "btn red btn-large";
      alert.innerHTML = `<span>Complete all fields</span>`;
      alert.style.margin = ".5rem 35%";
      form.parentNode.insertBefore(alert, form);
  
      alert.onclick = () => alert.remove();
  
      setTimeout(() => alert.remove(), "2000");
    }
  }