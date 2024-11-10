import React, {useContext, useState} from 'react';
import {TodoContext} from "./TodoContext";
import {Table, TableBody, TableCell, TableHead, TableRow, IconButton, TextField} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";


function TodoTable() {
    const context = useContext(TodoContext)
    const [addTodo ,setAddTodo]=useState('');
    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            if (addTodo.trim()) {  // Ensure it's not an empty task
                context.createTodo(event, { name: addTodo });
                setAddTodo('');  // Clear the input field after adding
                }
        }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Task</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell><TextField value={addTodo} onChange={(event)=>{setAddTodo(event.target.value)}} label="new task" fullWidth={true}/>
                                </TableCell>
                                <TableCell align="right">
                                <IconButton type="submit">
                                    <AddIcon/>
                                </IconButton>
                                </TableCell>
                            </TableRow>
                            {context.todos.slice().reverse().map((todo,index) =>(
                                <TableRow key={'todo' + index}>
                                    <TableCell>{todo.name}</TableCell>
                                    <TableCell align="right">
                                        <IconButton><EditIcon/></IconButton>
                                        <IconButton><DeleteIcon/></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
    </form>

    );
}

export default TodoTable;



/////////
//.slice().reverse // itdhahar el element added men fou9(reverse) el slice (taamel copie(eviter perte d'ancien saisie similaire) w tinversiha .revrese)