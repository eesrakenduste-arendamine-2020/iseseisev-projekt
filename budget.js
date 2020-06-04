/* class Expense{
    constructor(id, title, amount){
        this.id = id;
        this.title = title;
        this.amount = amount;
    }
} */

class UI{
    constructor(){
        this.budgetForm = document.getElementById("budget-form");
        this.budgetInput = document.getElementById("budget-input");
        this.budgetAmount = document.getElementById("budget-amount");
        this.expenseAmount = document.getElementById("expense-amount");
        this.balance = document.getElementById("balance");
        this.balanceAmount = document.getElementById("balance-amount");
        this.expenseForm = document.getElementById("expense-form");
        this.expenseInput = document.getElementById("expense-input");
        this.amountInput = document.getElementById("amount-input");
        this.expenseList = document.getElementById("expense-list");
        //this.itemList = [];
        this.itemID = 0;

        this.itemList = JSON.parse(window.localStorage.getItem('expenses')) || [];

    }

    submitBudgetForm(){
        const budgetValue = this.budgetInput.value;
        if(budgetValue === "" || budgetValue < 0){
            $('#budget-error').show(300);
        } else {
            this.budgetAmount.textContent = budgetValue;
            $('#budget-error').hide(200);
            this.budgetInput.value = "";
            this.showBalance();
            this.saveLocal();
        };
    }

    showBalance(){
        const expense = this.totalExpense();
        const total = parseInt(this.budgetAmount.textContent) - expense;
        this.balanceAmount.textContent = total;
    }

    submitExpenseForm(){
        const expenseValue = this.expenseInput.value;
        const amountValue = this.amountInput.value;
        if(expenseValue === "" || amountValue === "" || amountValue < 0){
            $('#expense-error').show(300);
        } else {
            $('#expense-error').hide(200);
            let amount = parseInt(amountValue);
            this.expenseInput.value = "";
            this.amountInput.value = "";

            let expense = {
                id:this.itemID,
                title:expenseValue,
                amount,
        };
            this.itemID++;
            //this.itemList.push(new Expense(this.itemID, expenseValue, amount));
            this.itemList.push(expense);
            this.addExpense(expense);
            this.saveLocal();
            this.showBalance();
        }
    }

    addExpense(expense){
        const div = document.createElement('div');
        div.classList.add('expense');
        div.innerHTML = `
        <div id="expense-item" class="expense-item">

         <p class="expense-title list-item">- ${expense.title}</p>
         <p class="expense-amount list-item">${expense.amount}</p>

          <img src="pencil.png" id="edit-icon" class="edit-icon" data-id="${expense.id}">
          <img src="trash-can.png" id="delete-icon" class="delete-icon" data-id="${expense.id}">
         </div>
        </div>
        `;
        
        this.expenseList.appendChild(div);
    }

    totalExpense(){
        let total = 0;
        if(this.itemList.length > 0){
            total = this.itemList.reduce(function(acc, curr){
                acc += curr.amount;
                return acc;
            }, 0);
        }
        this.expenseAmount.textContent = total;
        return total;
    }

    removeExpense(element){
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement;

        this.expenseList.removeChild(parent);

        let tempList = this.itemList.filter(function(item){
            return item.id !== id;
        })

        this.itemList = tempList;

        this.itemList.forEach((entryValue, entryIndex)=>{
            this.itemList.slice(entryIndex, 1);
        })

        this.saveLocal();
        this.showBalance();
    }

    editExpense(element){
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement;

        this.expenseList.removeChild(parent);

        let expense = this.itemList.filter(function(item){
            return item.id === id;
        })

        this.expenseInput.value = expense[0].title;
        this.amountInput.value = expense[0].amount;

        let tempList = this.itemList.filter(function(item){
            return item.id !== id;
        })

        this.itemList = tempList;
        this.showBalance();


    }

    saveLocal(){
        window.localStorage.setItem('expenses', JSON.stringify(this.itemList));
        //window.localStorage.setItem('budget', this.budgetInput.value);
    }

    loadLocal(){

/*         let budgetLoad = window.localStorage.getItem('budget');
        this.budgetAmount = parseInt(budgetLoad).budgetValue;
 */
        window.localStorage.getItem('expenses', JSON.stringify(this.itemList));
        //console.log(this.itemList);
        this.itemList.forEach((entryValue, entryIndex)=>{
            const div = document.createElement('div');
            div.classList.add('expense');
            div.innerHTML = `
            <div id="expense-item" class="expense-item">
    
             <p class="expense-title list-item">- ${entryValue.title}</p>
             <p class="expense-amount list-item">${entryValue.amount}</p>
    
              <img src="pencil.png" id="edit-icon" class="edit-icon" data-id="${entryValue.id}">
              <img src="trash-can.png" id="delete-icon" class="delete-icon" data-id="${entryValue.id}">
             </div>
            </div>
            `;
        this.expenseList.appendChild(div);

        })
        //this.addExpense();
    }

}

function eventListener(){
    const budgetForm = document.getElementById("budget-form");
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");

    const ui = new UI();

    ui.loadLocal();

    budgetForm.addEventListener('submit', function(event){
        event.preventDefault();
        ui.submitBudgetForm();
    })

    expenseForm.addEventListener('submit', function(event){
        event.preventDefault();
        ui.submitExpenseForm();
    })

    expenseList.addEventListener('click', function(event){
        if(event.target.classList.contains('delete-icon')){
            ui.removeExpense(event.target);
        }
    })

    expenseList.addEventListener('click', function(event){
        if(event.target.classList.contains('edit-icon')){
            ui.editExpense(event.target);
        }
    })

}

document.addEventListener('DOMContentLoaded', function(){
    eventListener();
})