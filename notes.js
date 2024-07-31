//!!!!!!!!Validate.js Notes
// Function to display an input error message
const showInputError = (formElement, inputElement, errorMessage, settings) => {
    // Construct the ID of the error element based on the input element's ID
    const errorElementId = `#${inputElement.id}-error`;
    // Select the error element in the form
    const errorElement = formElement.querySelector(errorElementId);
    // Add error class to the input element
    inputElement.classList.add(settings.inputErrorClass);
    // Set the error message text content
    errorElement.textContent = errorMessage;
    // Add error class to the error element
    errorElement.classList.add(settings.errorClass);
  };
  
  // Function to hide an input error message
  const hideInputError = (formElement, inputElement, settings) => {
    // Construct the ID of the error element based on the input element's ID
    const errorElementId = `#${inputElement.id}-error`;
    // Select the error element in the form
    const errorElement = formElement.querySelector(errorElementId);
    // Remove error class from the input element
    inputElement.classList.remove(settings.inputErrorClass);
    // Remove error class from the error element
    errorElement.classList.remove(settings.errorClass);
    // Clear the error message text content
    errorElement.textContent = "";
  };
  
  // Function to check the validity of an input element
  const checkInputValidity = (formElement, inputElement, settings) => {
    // If the input is not valid
    if (!inputElement.validity.valid) {
      // Show the input error
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage, // Get the validation message
        settings
      );
    } else {
      // Hide the input error
      hideInputError(formElement, inputElement, settings);
    }
  };
  
  // Function to check if any input in the list is invalid
  const hasInvalidInput = (inputList) => {
    // Check if any input element in the list is invalid
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  // Function to toggle the state of the submit button based on input validity
  const toggleButtonState = (inputList, buttonElement, settings) => {
    // If there are any invalid inputs
    if (hasInvalidInput(inputList)) {
      // Add inactive class and disable the button
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      // Remove inactive class and enable the button
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };
  
  // Function to set event listeners for the form elements
  const setEventListeners = (formElement, settings) => {
    // Get a list of all input elements in the form
    const inputList = Array.from(
      formElement.querySelectorAll(settings.inputSelector)
    );
    // Get the submit button element
    const buttonElement = formElement.querySelector(
      settings.submitButtonSelector
    );
  
    // Initial call to toggle the button state
    toggleButtonState(inputList, buttonElement, settings);
  
    // Add event listeners to each input element
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        // Check the validity of the input and toggle the button state on input
        checkInputValidity(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
      });
    });
  };
  
  // Function to enable validation for a given form
  const enableValidation = (settings) => {
    // Select the form element based on the provided selector
    const formElement = document.querySelector(settings.formSelector);
    // Prevent the default form submission behavior
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    // Set event listeners for the form
    setEventListeners(formElement, settings);
  };
  
  // Initialize validation with the provided configuration
  enableValidation(validationConfig);
  
  





  //!!!!!!!!Index.js Notes

  // Array of initial to-dos with unique IDs, names, completion status, and dates
const initialTodos = [
    {
      id: "7cec7373-681b-49d9-b065-021d61a69d03",
      name: "Read the sprint's theory",
      completed: true,
      date: new Date(),
    },
    {
      id: "a7bfd5ef-37cc-4fa6-89f2-cac098a8aeba",
      name: "Read project instructions",
      completed: false,
      date: new Date(),
    },
    {
      id: "aa486839-63ab-437f-b8a2-29ab217dff4f",
      name: "Complete project",
      completed: false,
      date: new Date(),
    },
  ];
  
  // Configuration object for form validation (not used in this snippet)
  const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    errorClass: "popup__error_visible",
    inputErrorClass: "popup__input_type_error",
    inactiveButtonClass: "button_disabled",
  };
  
  // DOM elements related to adding and displaying todos
  const addTodoButton = document.querySelector(".button_action_add"); // Button to open the add todo popup
  const addTodoPopup = document.querySelector("#add-todo-popup"); // Popup for adding a new todo
  const addTodoForm = addTodoPopup.querySelector(".popup__form"); // Form inside the add todo popup
  const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close"); // Close button for the popup
  const todoTemplate = document.querySelector("#todo-template"); // Template for creating new todo elements
  const todosList = document.querySelector(".todos__list"); // Container where todos will be displayed
  
  // Function to open a modal by adding a visible class
  const openModal = (modal) => {
    modal.classList.add("popup_visible");
  };
  
  // Function to close a modal by removing the visible class
  const closeModal = (modal) => {
    modal.classList.remove("popup_visible");
  };
  
  // Function to generate a todo element from provided data
  const generateTodo = (data) => {
    // Clone the todo template and select elements to update
    const todoElement = todoTemplate.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = todoElement.querySelector(".todo__name");
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");
    const todoLabel = todoElement.querySelector(".todo__label");
    const todoDate = todoElement.querySelector(".todo__date");
    const todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");
  
    // Update the todo element with data
    todoNameEl.textContent = data.name; // Set todo name
    todoCheckboxEl.checked = data.completed; // Set completed status
  
    // Set id and for attributes for the checkbox and label
    todoCheckboxEl.id = `todo-${data.id}`;
    todoLabel.setAttribute("for", `todo-${data.id}`);
  
    // Format and display the due date if available
    const dueDate = new Date(data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  
    // Add event listener to remove the todo when delete button is clicked
    todoDeleteBtn.addEventListener("click", () => {
      todoElement.remove();
    });
  
    return todoElement; // Return the fully populated todo element
  };
  
  // Event listener to open the add todo popup when the add button is clicked
  addTodoButton.addEventListener("click", () => {
    openModal(addTodoPopup);
  });
  
  // Event listener to close the add todo popup when the close button is clicked
  addTodoCloseBtn.addEventListener("click", () => {
    closeModal(addTodoPopup);
  });
  
  // Event listener to handle form submission, create a new todo, and add it to the list
  addTodoForm.addEventListener("submit", (evt) => {
    evt.preventDefault(); // Prevent form default submission behavior
    const name = evt.target.name.value; // Get the name input value
    const dateInput = evt.target.date.value; // Get the date input value
  
    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  
    // Create a new todo object and generate its element
    const values = { name, date };
    const todo = generateTodo(values);
    todosList.append(todo); // Add the new todo to the list
    closeModal(addTodoPopup); // Close the popup
  });
  
  // Initial rendering of todos from the initialTodos array
  initialTodos.forEach((item) => {
    const todo = generateTodo(item); // Generate todo element
    todosList.append(todo); // Add todo element to the list
  });
  
  