import { Ref, defineComponent, inject, provide, ref, watch } from "vue";
import { useGetTodos } from "../../composables/useJsonPlaceholder";

type TodoTab = "open" | "closed";
interface KeyValue<T = string> {
  key: string;
  value: T;
}
interface TabOption extends KeyValue<TodoTab> {}

/**
 * TODO: use codegen to auto-generate
 * interfaces for objects coming from backend
 */
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodoContext {
  selectedTab: Ref<TodoTab>;
  tabOptions: TabOption[];
  todos: Ref<Todo[]>;
}

const TodoProviderSymbol = Symbol("Todo");

export const TodoProvider = defineComponent({
  name: "TodoProvider",
  setup() {
    const selectedTab = ref<TodoTab>("open");
    const tabOptions: TabOption[] = [
      {
        key: "Open",
        value: "open",
      },
      {
        key: "Closed",
        value: "closed",
      },
    ];

    const {
      loading: loadingTodos,
      errors: errorLoadingTodos,
      result: todos,
      refetch,
    } = useGetTodos();
    refetch({ completed: selectedTab.value === "closed" });
    watch(selectedTab, (tab) => {
      /**
       * TODO: refactor how we build input parameters,
       * i don't think this logic will scale well with more parameters.
       */
      refetch({ completed: tab === "closed" });
    });

    const context: TodoContext = {
      selectedTab,
      tabOptions,
      todos,
    };

    provide(TodoProviderSymbol, context);
  },
  render() {
    return this.$slots.default?.();
  },
});

export const useTodo = () => inject<TodoContext>(TodoProviderSymbol)!;
