import React, {Component, createContext} from 'react';
export const TodoContext = createContext();
class TodoContextProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {name :'do smth'},
                {name :'do smth1'},
                {name :'do smth2'},
                {name :'do smth3'},
                {name :'do smth4'},
                {name :'do smth5'}


            ],
        }
    }

    //create
    createTodo(event, todo){
        event.preventDefault();
        let data = [...this.state.todos];
        data.push(todo)
        this.setState({
            todos : data,
            }
        )

    }
    //read
    readTodo(){}

    //update
    updateTodo(){}
    //delete
    deleteTodo(){}
    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo:this.createTodo.bind(this),
                updateTodo:this.updateTodo.bind(this),
                deleteTodo:this.deleteTodo.bind(this),
                readTodo:this.readTodo.bind(this),
            }}>
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}

export default TodoContextProvider;