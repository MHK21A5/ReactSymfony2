import React, {Fragment, useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext";
import {Table, TableBody, TableCell, TableHead, TableRow, IconButton, TextField} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import DeleteDialog from "./DeleteDialog";


function TodoTable() {
    const context = useContext(TodoContext)
    const [addTodo ,setAddTodo]=useState('');
    const [editIsShown ,setEditIsShown]=useState(null);
    const [editTodo ,setEditTodo]=useState('');
    const [deleteConfirmationIsShown ,setDeleteConfirmationIsShown]=useState(false);
    const [todoToBeDeleted,setTodoToBeDeleted]=useState(null)


    return (
        <Fragment>
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
                                <TableCell>
                                    <TextField value={addTodo} onChange={(event)=>{setAddTodo(event.target.value)}} label="new task" fullWidth={true}/>
                                </TableCell>
                                <TableCell align="right">
                                <IconButton type="submit">
                                    <AddIcon/>
                                </IconButton>
                                </TableCell>
                            </TableRow>
                            {context.todos.slice().reverse().map((todo,index) =>(
                                <TableRow key={'todo' + index}>
                                    <TableCell>
                                        {editIsShown === todo.id ?
                                            <TextField
                                                fullWidth={true}
                                                value={editTodo}
                                                onChange={(event)=>{
                                                    setEditTodo(event.target.value);
                                                }}
                                                InputProps=
                                                    {{
                                                    endAdornment :
                                                        <Fragment>
                                                            <IconButton onClick={()=>{
                                                                setEditIsShown(null);
                                                            }}><CloseIcon/></IconButton>
                                                            <IconButton onClick={()=>{
                                                                context.updateTodo({id: todo.id, name : editTodo});
                                                                setEditIsShown(null);
                                                                hide();
                                                            }}
                                                            ><DoneIcon/></IconButton>
                                                        </Fragment>,
                                                    }}

                                            />

                                            :
                                        todo.name

                                        }
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={()=> {setEditIsShown(todo.id);setEditTodo(todo.name)}}>
                                            <EditIcon/>
                                        </IconButton>
                                            <IconButton onClick={()=>{setDeleteConfirmationIsShown(true); setTodoToBeDeleted(todo)}}>
                                                <DeleteIcon/>
                                            </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
    </form>
            {deleteConfirmationIsShown &&(

            <DeleteDialog todo={todoToBeDeleted}
                          open={deleteConfirmationIsShown}
                          setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
            />)}
        </Fragment>
    );
}

export default TodoTable;



/////////
//.slice().reverse // itdhahar el element added men fou9(reverse) el slice (taamel copie(eviter perte d'ancien saisie similaire) w tinversiha .revrese)