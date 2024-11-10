import React, {Component, createContext} from 'react';
export const TodoContext = createContext();
class TodoContextProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {id : 1 , name :'do smth'},
                {id : 2,name :'do smth1'},
                {id : 3 ,name :'do smth2'},
                {id : 4 ,name :'do smth3'},
                {id : 5 ,name :'do smth4'},
                {id : 6 ,name :'do smth5'}


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
    updateTodo(data){
        let todos =[...this.state.todos];
        let todo =todos.find (todo => {
            return todo.id === data.id;
        });
        todo.name =data.name;
        this.setState({
            todos:todos,
        });
    }
    //delete
    deleteTodo(data){
        let todos = [...this.state.todos];
        let todo =todos.find( todo =>{
            return todo.id === data.id;
        })
        todos.splice(todos.indexOf(todo),1);
        this.setState(
            {
                todos: todos ,
            }
        )
    }
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