import { ref } from "vue";

const baseUri = "https://jsonplaceholder.typicode.com";

interface GetTodoInput {
  completed: boolean;
}
export const useGetTodos = () => {
  const loading = ref(false);
  const errors = ref();
  const result = ref();

  async function refetch(input?: GetTodoInput) {
    try {
      loading.value = true;
      result.value = [];
      const apiEndpoint = new URL(`${baseUri}/todos`);
      if (input)
        apiEndpoint.searchParams.append("completed", String(input.completed));
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
