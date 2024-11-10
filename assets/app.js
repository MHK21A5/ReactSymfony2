import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TodoContextProvider from "./contexts/TodoContext";
import TodoTable from "./componants/TodoTable";
import {CssBaseline} from "@material-ui/core";
class App extends Component {
    render() {
        return (
           <TodoContextProvider>
               <CssBaseline>
                   <TodoTable/>
               </CssBaseline>
           </TodoContextProvider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));