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
        this.itemList = [];
        this.itemID = 0;

        //this.itemList = JSON.parse(window.localStorage.getItem('expenses')) || [];

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
            this.itemList.push(expense);
            this.addExpense(expense);
            //this.saveLocal();
            this.showBalance();
        }
    }

    addExpense(expense){
        const div = document.createElement('div');
        div.classList.add('expense');
        div.innerHTML = `
        <div class="expense-item">

         <h6 class="expense-title list-item">- ${expense.title}</h6>
         <h5 class="expense-amount list-item">${expense.amount}</h5>

          <img src="pencil.png" class="edit-icon" data-id="${expense.id}">
          <img src="trash-can.png" class="delete-icon" data-id="${expense.id}">
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

    editExpense(element){
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement;

        this.expenseList.removeChild(parent);
    }

/*  saveLocal(){
        window.localStorage.setItem('expenses', JSON.stringify(this.itemList));
    } */
}

function eventListener(){
    const budgetForm = document.getElementById("budget-form");
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");

    const ui = new UI();

    budgetForm.addEventListener('submit', function(event){
        event.preventDefault();
        ui.submitBudgetForm();
    })

    expenseForm.addEventListener('submit', function(event){
        event.preventDefault();
        ui.submitExpenseForm();
    })

    expenseList.addEventListener('click', function(event){
        if(event.target.parentElement.classList.contains('edit-icon')){
            ui.editExpense(event.target.parentElement)
        }
    })
}

document.addEventListener('DOMContentLoaded', function(){
    eventListener();
})

/* function changeColor(){
   let back1 = document.getElementById("submit-background");
   console.log(back1);
   document.getElementsByClassName("grid-submit").style.backgroundColor = "#" + back1;
} */
