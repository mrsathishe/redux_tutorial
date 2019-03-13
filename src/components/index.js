//Library Code
function createStore(reducer){
    // The strore should have four parts
    // 1. The state
    // 2. Get the state.
    // 3. Listen to changes on the state
    // 4. Update the state

    let state
    let listeners = [];

    const getState = () => state

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l)=> l !== listener)
        }
    }

    const dispatch = (action) => {
        // call todos
        state = reducer(state, action)

        // loop over listeners and invoke them
        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

//actions
/* {
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false
    }
}

{
    type: 'REMOVE_TODO',
    id: 0
}

{
    type: 'TOGGLE_TODO',
    id: 0
}

{
    type: 'ADD_GOAL',
    goal: {
        id: 0,
        name: 'Run a Marathon'
    }
}

{
    type: 'REMOVE_GOAL'
    id: 0
} */

/* 
Characteristics of a Pure Function 
1) They always terutn the same result if the same arguments are passed in
2) They depend only on the arguments passed into them.
3) Never produce any side effects.
*/

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

// Action Creators
function addTodoAction(todo) {
    return {
        type: ADD_TODO,
        todo
    }
}

function removeTodoAction(id){
    return {
        type: REMOVE_TODO,
        id
    }
}

function toogleTodoAction(id) {
    return {
        type: TOGGLE_TODO,
        id
    }
}


//Reducer Function
function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return state.concat([action.todo]);
        case REMOVE_TODO:
            return state.filter((todo) => (todo.id !== action.id))
        case TOGGLE_TODO:
            return state.map((todo) => todo.id !== action.id ? todo : 
                Object.assign({}, todo, {complete: !todo.complete})
            )
        default:
            return state;
    }

    /* if( action.type === 'ADD_TODO' ) {
        return state.concat([action.todo]);
    } else if(action.type === 'REMOVE_TODO') {
        return state.filter((todo) => (todo.id !== action.id))
    } else if(action.type === 'TOGGLE_TODO') {
        return state.map((todo) => todo.id !== action.id ? todo : 
            Object.assign({}, todo, {complete: !todo.complete})
        )
        /* 
        This is changed to object.assign
        {
            name: todo.name,
            id: todo.id,
            complete: !todo.complete
        } 
        * /
    } else {
        return state;
    } */
}

function goals (state=[], action) {
    switch(action.type){
        case ADD_GOAL: 
            return state.concat([action.goal]);
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id );
        default:
            return state;
    }
}

// Combine Reducers in redux
// Redux.combineReducers({
//  todos, goals
// })
function app (state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}




const store = createStore(app)
/* 
const store = createStore()

store.subscribe(()=>{

})

store.subscribe(()=>{

}) */

/* const store = createStore();
store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false,
    }
}) */

store.dispatch(addTodoAction({
    id: 0,
    name: 'Walk the dog',
    complete: false
}))

store.dispatch(addTodoAction({
    id: 1,
    name: 'Wash the car',
    complete: false
}))

store.dispatch(removeTodoAction(0))

store.dispatch(toggleTodoAction(0))


store.subscribe(()=>{
    const { goals, todos } = store.getState()

})
