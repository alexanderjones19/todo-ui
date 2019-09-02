import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import useForm from 'react-hook-form';

import Layout from './_layout';
import { FETCH_TODOS } from '../src/queries/fetchTodos';
import { CREATE_TODO, CreateTodoMutation, CreateTodoMutationVariables } from '../src/mutations/createTodoMutation';
import { DELETE_TODO, DeleteTodoMutation, DeleteTodoMutationVariables } from '../src/mutations/deleteTodoMutation';
import useAuthGuard from '../src/hooks/data/useAuthGuard';

const TodoPage = () => {
  useAuthGuard(null, '/');
  const { register, handleSubmit, setError, errors, reset } = useForm();

  const {
    data: todosData,
    loading: todosLoading,
    error: todosError,
    refetch: refetchTodos
  } = useQuery(FETCH_TODOS);

  const [
    createTodo,
    {
      data: createTodoData,
      loading: createTodoLoading,
      error: createTodoError
    }
  ] = useMutation<CreateTodoMutation, CreateTodoMutationVariables>(
    CREATE_TODO, 
    {
      onCompleted: () => {
        reset();
      },
      update(cache, { data: { createTodo } }) {
        const { allTodos } = cache.readQuery({ query: FETCH_TODOS });
        allTodos.todos = allTodos.todos.concat([createTodo])
        cache.writeQuery({
          query: FETCH_TODOS,
          data: { allTodos }
        });
      }
    }
  );

  const [
    deleteTodo,
    {
      data: deleteTodoData,
      loading: deleteTodoLoading,
      error: deleteTodoError
    }
  ] = useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(
    DELETE_TODO,
    {
      update(cache, { data: { deleteTodo } }) {
        const { allTodos } = cache.readQuery({ query: FETCH_TODOS });
        allTodos.todos.splice(allTodos.todos.findIndex(t => t.id === deleteTodo.id), 1);
        cache.writeQuery({
          query: FETCH_TODOS,
          data: { allTodos }
        });
      }
    }
  )

  const onCreateTodo = function(data) {
    createTodo({ variables: {title: data.title} });
  }

  return (
    <Layout>
      <Container maxWidth="xl">
        <form onSubmit={handleSubmit(onCreateTodo)}>
          <TextField
            name='title'
            inputRef={register}
          ></TextField>
          <Button type="submit">Save</Button>
        </form>
        <List>
          {todosData && !todosLoading ? 
            todosData.allTodos.todos.map((todo, i) =>
              <React.Fragment key={todo.id}>
                <Divider />
                <ListItem>
                  <ListItemText primary={todo.title} />
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteTodo({ variables: { id: todo.id } })}
                    >
                      { deleteTodoLoading ? <CircularProgress size={24} /> : <DeleteIcon /> }
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </React.Fragment> 
            ) : 
            <CircularProgress size={48}/>}
        </List>
      </Container>
    </Layout>
  );
}

export default TodoPage;