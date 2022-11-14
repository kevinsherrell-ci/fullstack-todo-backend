const {isEmpty} = require('../validation/isEmpty');

/*
* title: string (max characters 40)
* description: string (max characters 40)
* isComplete: boolean
* priority: string (must be "High" "Medium" or "Low"
* */


const addError = (errorArray, type, message) => {
    errorArray.push({
        type: type,
        message: message
    })
}
const validateTodo = (obj) => {
    const errors = [];
    if (isEmpty(obj)) {
        addError(errors, 'todo', 'todo object cannot be empty');
    }
    // title validation
    if (isEmpty(obj.title)) {
        addError(errors, 'title', 'title cannot be empty');
    }
    if (typeof obj.title !== 'string') {
        addError(errors, 'title', 'title must be a string');
    } else if (obj.title.trim().length > 40) {
        addError(errors, 'title', 'title must be less than 40 characters');
    }
    // description validation
    if (isEmpty(obj.description)) {
        addError(errors, 'description', 'description cannot be empty');
    }
    if (typeof obj.description !== 'string') {
        addError(errors, 'description', 'description must be a string');
    } else if (obj.description.trim().length > 120) {
        addError(errors, 'description', 'description must be less than 120 characters');
    }
    // isComplete validation
    if (isEmpty(obj.isComplete)) {
        addError(errors, 'isComplete', 'isComplete must not be empty');
    }
    if (typeof obj.isComplete !== 'boolean') {
        addError(errors, 'isComplete', "isComplete must be a boolean");
    }
    // priority validation
    const priorityValues = ['high', 'medium', 'low'];
    if (isEmpty(obj.priority)) {
        addError(errors, 'priority', 'priority must not be empty');
    }
    if (typeof obj.priority !== 'string') {
        addError(errors, 'priority', 'priority must be a string');
    } else if (!priorityValues.includes(obj.priority.toLowerCase())) {
        addError(errors, 'priority', 'priority invalid; must be "high" "low" or "medium');
    }

    return errors.length > 0 ? {isValid: false, errors: errors} : {isValid: true};
}

module.exports = {
    validateTodo
}