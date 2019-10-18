import React, { useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';

import Layout from './_layout';
import useAuthGuard from '../src/hooks/data/useAuthGuard';
import TodoList from '../src/modules/todo/TodoList';
import CreateTodoForm, { CreateTodoFormData, CreateTodoFormRef } from '../src/forms/CreateTodoForm';
import Switch from '../src/components/Switch';
import ErrorSnackbar from '../src/components/ErrorSnackbar';
import useAsyncState from '../src/hooks/useAsyncState';
import { persistor } from '../src/client';
import useFetchTodos from '../src/hooks/data/useFetchTodos';
import useCreateTodo from '../src/hooks/data/useCreateTodo';
import useUpdateTodo from '../src/hooks/data/useUpdateTodo';
import useDeleteTodo from '../src/hooks/data/useDeleteTodo';

const TodoPage = () => {
  const createTodoFormRef = useRef<CreateTodoFormRef>(null);
  const {
    userData,
    userLoading,
    userError
  } = useAuthGuard(null, null);

  const {
    trackAsyncState: trackUpdateTodoState,
    asyncState: updateTodoState
  } = useAsyncState();

  const {
    trackAsyncState: trackDeleteTodoState,
    asyncState: deleteTodoState
  } = useAsyncState();

  const isAuthenticated = !userLoading && !!userData;

  const [
    fetchTodos,
    {
      data: todosData,
      loading: todosLoading,
      error: todosError
    }
  ] = useFetchTodos(isAuthenticated);

  async function fetchTodosFromCache() {
    await persistor.restore();
    fetchTodos();
  }

  useEffect(() => {
    // authenticated
    if (!userLoading && userData) {
      persistor.pause();
      fetchTodos();
    }
    // unauthenticated
    else if (!userLoading) {
      persistor.resume();
      fetchTodosFromCache();
    }
  }, [userData, userLoading]);

  const [
    createTodo,
    {
      data: createTodoData,
      loading: createTodoLoading,
      error: createTodoError
    }
  ] = useCreateTodo(!!userData);

  const [
    updateTodo,
    {
      data: updateTodoData,
      loading: updateTodoLoading,
      error: updateTodoError
    }
  ] = useUpdateTodo(!!userData);

  const [
    deleteTodo,
    {
      data: deleteTodoData,
      loading: deleteTodoLoading,
      error: deleteTodoError
    }
  ] = useDeleteTodo(!!userData);

  if (userLoading) {
    return null;
  }

  const handleCreateTodo = async function(data: CreateTodoFormData) {
    try {
      const createResult = await createTodo({ 
        variables: {title: data.title}
      });
      createTodoFormRef.current.reset();
    } catch (e) {
      throw e;
    }
  }

  const handleDeleteTodo = function(id: string) {
    trackDeleteTodoState(
      deleteTodo({
        variables: { id }
      }),
      id
    );
  }

  return (
    <Layout>
      <Container maxWidth="xl" style={{paddingTop: '25px', paddingBottom: '25px'}}>
        <Paper>
          <Box padding="15px" paddingLeft="30px" paddingTop="20px">
            <CreateTodoForm
              ref={createTodoFormRef}
              onSubmit={handleCreateTodo}
              loading={createTodoLoading && !!userData}
              error={createTodoError && createTodoError.message}
            />
          </Box>
          <Switch
            case={todosData && todosData.allTodos && !todosLoading}
            view={
              <Box>
                <TodoList
                  todos={todosData && todosData.allTodos ? todosData.allTodos.todos : []}
                  onDeleteTodo={handleDeleteTodo}
                  onUpdateTodo={(id, title) => {
                    trackUpdateTodoState(
                      updateTodo({ variables: { id, title } }),
                      id
                    );
                  }}
                  updateTodoState={updateTodoState}
                  deleteTodoState={deleteTodoState}
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
      <ErrorSnackbar open={!!(deleteTodoError || updateTodoError)}/>
    </Layout>
  );
}

export default TodoPage;