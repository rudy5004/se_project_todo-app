class Todo {
    constructor(data, selector) {
        this._data = data;
        this._templateElement = document.querySelector(selector)
    }
    getView() {
    this._todoElement = this._templateElement.content
    .querySelector(".todo")
    .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoLabel = this._todoElement.querySelector(".todo__label");
    const todoDate = this._todoElement.querySelector(".todo__date");
    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    
    todoNameEl.textContent = this._data.name;
    todoCheckboxEl.checked = this._data.completed;

    todoCheckboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`); 

    todoDeleteBtn.addEventListener("click", () => {
    this._todoElement.remove();
    });

    /* what event listener do we need to setup?
    todoCheckboxEl.addEventListener("click", () => {
    this._todoElement.append();
    console.log('todoCheckboxEl working');
    }) */

    /*
    todoCheckboxEl.addEventListener("click", () => {
    this._todoElement.remove();
    console.log('todoCheckboxEl working');
    });
    */
    
    
    return this._todoElement;
    }
}

export default Todo;