import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';

import Layout from './_layout';
import { FETCH_TODOS, FetchTodosQuery } from '../src/queries/fetchTodos';
import { CREATE_TODO, CreateTodoMutationVariables } from '../src/mutations/createTodoMutation';
import { DELETE_TODO, DeleteTodoMutationVariables } from '../src/mutations/deleteTodoMutation';
import useAuthGuard from '../src/hooks/data/useAuthGuard';
import useLoadingState from '../src/hooks/useLoadingState';
import TodoList from '../src/modules/todo/TodoList';
import Todo from '../src/models/Todo';
import CreateTodoForm from '../src/forms/CreateTodoForm';
import { UPDATE_TODO, UpdateTodoMutationVariables } from '../src/mutations/updateTodoMutation';
import Switch from '../src/components/Switch';

const TodoPage = () => {
  useAuthGuard(null, '/');
  const {
    isLoading: isDeleteTodoLoading,
    trackLoading: trackDeleteTodoLoading
  } = useLoadingState();
  const {
    isLoading: isUpdateTodoLoading,
    trackLoading: trackUpdateTodoLoading,
  } = useLoadingState();

  const {
    data: todosData,
    loading: todosLoading,
    error: todosError
  } = useQuery<FetchTodosQuery>(FETCH_TODOS);

  const [
    createTodo,
    {
      data: createTodoData,
      loading: createTodoLoading,
      error: createTodoError
    }
  ] = useMutation<
    { createTodo: Todo },
    CreateTodoMutationVariables
  >(CREATE_TODO, 
    {
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
    updateTodo,
    {
      data: updateTodoData,
      loading: updateTodoLoading,
      error: updateTodoError
    }
  ] = useMutation<
    { updateTodo: Todo},
    UpdateTodoMutationVariables
  >(
    UPDATE_TODO
  );

  const [
    deleteTodo,
    {
      data: deleteTodoData,
      loading: deleteTodoLoading,
      error: deleteTodoError
    }
  ] = useMutation<
    { deleteTodo: Todo },
    DeleteTodoMutationVariables
  >(
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
      <Container maxWidth="xl" style={{paddingTop: '25px', paddingBottom: '25px'}}>
        <Paper>
          <Box padding="15px" paddingLeft="30px" paddingTop="20px">
            <CreateTodoForm
              onSubmit={onCreateTodo}
              loading={createTodoLoading}
              error={createTodoError && createTodoError.message}
            />
          </Box>
          <Switch
            case={todosData && todosData.allTodos && !todosLoading}
            view={
              <Box>
                <TodoList
                  todos={todosData && todosData.allTodos ? todosData.allTodos.todos : []}
                  onDeleteTodo={(id) => {
                    trackDeleteTodoLoading(
                      deleteTodo({ variables: { id } }),
                      id
                    );
                  }}
                  onUpdateTodo={(id, title) => {
                    trackUpdateTodoLoading(
                      updateTodo({ variables: { id, title } }),
                      id
                    );
                  }}
                  isDeleteTodoLoading={isDeleteTodoLoading}
                  isUpdateTodoLoading={isUpdateTodoLoading}
                />
              </Box>
            }
            default={
              <Box padding="25px" justifyContent="center" display="flex">
                <CircularProgress size={48}/>
              </Box>
            }
            transition={Collapse}
            timeout={650}
          />
        </Paper>
      </Container>
    </Layout>
  );
}

export default TodoPage;