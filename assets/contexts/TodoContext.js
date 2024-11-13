import React, {Component, createContext} from 'react';
import axios from "axios";

export const TodoContext = createContext();
class TodoContextProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [],
        };
        this.readTodo();
    }

    //create
    createTodo(event, todo){
        event.preventDefault();
        axios.post('/api/todo/create',todo).then(response => {
            console.log(response.data);
                let data;
                data = [...this.state.todos];
            data.push(response.data.todo)
            this.setState({
                todos : data,
            });
            }).catch(error => {
            console.error(error);
        })
        //front end    "create methode"
        // event.preventDefault();
        // let data = [...this.state.todos];
        // data.push
        //
        // this.setState({
        //     todos : data,
        //     }
        // )

    }
    //read
    readTodo(){
        axios.get('/api/todo/read')
            .then(response =>{
            //    console.log(response.data);//axios response to the data retrived from symfony
                this.setState({
                    todos: response.data,
                })
            }).catch(error =>{
                console.error(error);
        })
    }

    //update
    updateTodo(data){
        axios.put(`/api/todo/update/`+ data.id, data)
            .then(response => {
                let todos =[...this.state.todos];
                let todo =todos.find (todo =>{
                   return  todo.id === data.id;
                });

                todo.name = data.name;

                this.setState({
                    todos: todos,
                });
            }).catch(error => {
            console.error(error);
        });
    }



        // todo.name =data.name;
        // this.setState({
        //     todos:todos,
        // });

    //delete
    deleteTodo(data){
        axios.delete('/api/todo/delete/'+ data.id ,data)
            .then( reponse =>{
                let todos = [...this.state.todos];
                let todo =todos.find( todo =>{
                return todo.id === data.id;
                });
                todos.splice(todos.indexOf(todo),1);

                 this.setState(
                    {
                        todos: todos ,
                    });
            }).catch(error => {
             console.error(error);

            });

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