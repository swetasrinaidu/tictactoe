const numberButtons = document.querySelectorAll('[data-number]');
const operationsButtons = document.querySelectorAll('[data-operation');
const equalsButtons = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButtton=document.querySelector('[data-all-clear]');

const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]')

class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement=previousOperandTextElement;
        this.currentOperandTextElement=currentOperandTextElement;
        this.clear()
    }
    clear(){
       this.currentOperand = '';
       this.previousOperand='';
       this.operation=undefined; 
    }
    delete(){
      this.currentOperand=this.currentOperand.toString().slice(0,-1);
    }
    appendNumber(number){
       if(number==='.' && this.currentOperand.includes('.')) return
       this.currentOperand=this.currentOperand.toString()+number.toString();
       console.log("this.currentOperand",this.currentOperand)
    }
    chooseOperator(operation){
      if(this.currentOperand === '')return;
      if(this.previousOperand!==''){
          this.compute();
      }
      this.operation=operation;
      console.log("this.operation",this.operation)

      this.previousOperand = this.currentOperand;
      this.currentOperand = '';

    }
    compute(){
        let computation;
        const prevValue = parseFloat(this.previousOperand)
        const currentValue = parseFloat(this.currentOperand)
        if(isNaN(prevValue)||isNaN(currentValue)) return
        switch(this.operation){
            case '+':
                computation = prevValue+currentValue;
                break;
            case '-':
                computation = prevValue-currentValue;
                break;
            case '*':
                computation = prevValue*currentValue;
                break;
            case '/':
                computation = prevValue/currentValue;
                break;
            default:
                return;

        }
        console.log("computation",computation)
        this.currentOperand=computation;
        this.operation=undefined;
        this.previousOperand='';

    }
    updateDisplay(){
        this.currentOperandTextElement.innerText=this.currentOperand;
    }
}


const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationsButtons.forEach(button=>{
     button.addEventListener('click',()=>{
         calculator.chooseOperator(button.innerText);
         calculator.updateDisplay();
     })
})

equalsButtons.addEventListener('click',button=>{
    calculator.compute();
    calculator.updateDisplay();
})

allClearButtton.addEventListener('click',button=>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click',button=>{
    calculator.delete();
    calculator.updateDisplay();
})