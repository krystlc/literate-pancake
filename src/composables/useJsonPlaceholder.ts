import { Ref, ref, watch } from "vue";

/**
 * TODO: use codegen to auto-generate
 * interfaces for objects coming from backend
 */
export interface Todo {
  userId?: number;
  id: number;
  title?: string;
  completed?: boolean;
}
export interface User {
  id: number;
  name: string;
}

const baseUri = "https://jsonplaceholder.typicode.com";

interface GetTodoInput {
  completed?: boolean;
}
export const useGetTodos = (input: Ref<GetTodoInput>) => {
  const loading = ref(false);
  const errors = ref();
  const result = ref();

  async function refetch() {
    try {
      loading.value = true;
      result.value = [];
      const apiEndpoint = new URL(`${baseUri}/todos`);
      if (input.value)
        apiEndpoint.searchParams.append(
          "completed",
          String(input.value.completed)
        );
      const response = await fetch(apiEndpoint);
      const json = await response.json();
      result.value = json;
    } catch (err) {
      errors.value = err;
    } finally {
      loading.value = false;
    }
  }
  watch(input, refetch, { immediate: true, deep: true });

  return {
    loading,
    errors,
    result,
    refetch,
  };
};

/**
 *
 * TODO: there's a lot of shared untested code,
 * look into 3rd party packages or abstract going forward
 */
export const useGetUsers = () => {
  const loading = ref(false);
  const errors = ref();
  const result = ref();

  async function refetch() {
    try {
      loading.value = true;
      result.value = [];
      const apiEndpoint = new URL(`${baseUri}/users`);
      const response = await fetch(apiEndpoint);
      const json = await response.json();
      result.value = json;
    } catch (err) {
      errors.value = err;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    errors,
    result,
    refetch,
  };
};

interface CreateTodoInput {
  completed?: boolean;
  title?: string;
  userId?: number;
}
export const useCreateTodo = () => {
  const loading = ref(false);
  const errors = ref();
  const result = ref();

  async function mutate(input: CreateTodoInput) {
    try {
      loading.value = true;
      result.value = null;
      const apiEndpoint = new URL(`${baseUri}/todos`);
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await response.json();
      result.value = json;
    } catch (err) {
      errors.value = err;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    errors,
    result,
    mutate,
  };
};

interface UpdateTodoInput {
  id: number;
  completed?: boolean;
  title?: string;
  userId?: number;
}
export const useUpdateTodo = () => {
  const loading = ref(false);
  const errors = ref();
  const result = ref();

  async function mutate(input: UpdateTodoInput) {
    try {
      loading.value = true;
      result.value = null;
      const apiEndpoint = new URL(`${baseUri}/todos/${input.id}`);
      const response = await fetch(apiEndpoint, {
        method: "PUT",
        body: JSON.stringify(input),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await response.json();
      result.value = json;
    } catch (err) {
      errors.value = err;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    errors,
    result,
    mutate,
  };
};
