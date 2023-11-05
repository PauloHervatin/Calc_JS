const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class calculator{
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    //add digit to calculator screen
    //adicionar dígito à tela da calculadora
    addDigit(digit){

        // check if current operation already has a hot
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }


        this.currentOperation = digit;
        this.updateScreen();
    }

    // process all calculator operations
    //processar todas as operações da calculadora
    processOperation(operation){
        //chek if current is empty
        //verificar se a corrente está vazia
        if(this.currentOperationText.innerText === "" && operation !=="C"){
            // change operation
            //operação de mudança
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operation)
            }
             return;
        }
        
        // Get current and previous value
        //Obtenha o valor atual e anterior
        let operatinValue
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operatinValue = previous + current;
                this.updateScreen(operatinValue, operation, current, previous);
                break;
                case "-":
                operatinValue = previous - current;
                this.updateScreen(operatinValue, operation, current, previous);
                break;
                case "/":
                operatinValue = previous / current;
                this.updateScreen(operatinValue, operation, current, previous);
                break;
                case "*":
                operatinValue = previous * current;
                this.updateScreen(operatinValue, operation, current, previous);
                break;
                case "DEL":
                operatinValue = previous * current;
                this.processDelOperator();
                break;
                case "CE":
                operatinValue = previous * current;
                this.processClearCurrentOperation();
                break;
                case "C":
                operatinValue = previous * current;
                this.processClearAllOperation();
                break;
                case "=":
                operatinValue = previous * current;
                this.processIgualOperator();
                break;
                default:
                return;
        }

    }


    //change value of the calculator screen
    //alterar o valor da tela da calculadora
    updateScreen(
        operatinValue = null,
        operation = null,
        current = null,
        previous = null
        ) {
        if(operatinValue === null){
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //chek if value is zero, if it is add curretn value
            //verifique se o valor é zero, se for adicione o valor atual
            if(previous === 0){
                operatinValue = current;
            }

            // add current value to previous
            //adicione o valor atual ao anterior
            this.previousOperationText.innerText = `${operatinValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }


    // change math operation
    // alterar operação matemática
    changeOperation(operation) {

        const mathOperation =["*","+","-","/"]

        if(!mathOperation.includes(operation)){
            return;
        }
        
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation

    }

    //delete the last digit
    //exclua o último dígito
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    // clear current operation
    //limpar operação atual
    processClearCurrentOperation(){
        this.currentOperationText.innerText = "";
    }

    //clear all operations
    //limpar todas as operações
    processClearAllOperation(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // Process an operation
    //Processar uma operação
    processIgualOperator(){
        const operation = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
    }
}

const calc = new calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e)=> {

        const value = e.target.innerText;

        if(+value >= 0 || value === "."){
            calc.addDigit(value)
        } else {
            calc.processOperation(value);
        }

    });
});