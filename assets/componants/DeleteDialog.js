import React, {useContext} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import PropTypes from "prop-types";
import {TodoContext} from "../contexts/TodoContext"; //search on it

function DeleteDialog(props) {
    const hide = ()=> {
        props.setDeleteConfirmationIsShown(false);
    };

   const context = useContext(TodoContext);
    return (
        <Dialog onClose={hide}
                fullWidth={true}
                maxWidth={"sm"}
                open={props.open}>
          <DialogTitle>Sure you want to delete it</DialogTitle>
          <DialogContent>
              {props.todo.name}
          </DialogContent>
          <DialogActions>
              <Button onClick={hide}>Cancel</Button>
              <Button onClick={()=>{
                  context.deleteTodo({id: props.todo.id, name: props.todo.name});
                  hide();
              }}>
                  Delete
              </Button>
          </DialogActions>
        </Dialog>
    );
}
DeleteDialog.propTypes ={
    open: PropTypes.bool.isRequired,
    setDeleteConfirmationIsShown : PropTypes.func.isRequired,
    todo : PropTypes.shape=({
        id : PropTypes.number.isRequired,
        name : PropTypes.string.isRequired
    }).isRequired
};
export default DeleteDialog;