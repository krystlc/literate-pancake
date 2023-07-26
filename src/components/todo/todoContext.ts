import {
  Ref,
  computed,
  defineComponent,
  inject,
  onMounted,
  provide,
  ref,
} from "vue";
import {
  Todo,
  User,
  useGetTodos,
  useGetUsers,
} from "../../composables/useJsonPlaceholder";
import { SearchType, filterData } from "filter-data";

type TodoTab = "open" | "closed";
interface KeyValue<T = string> {
  key: string;
  value: T;
}
interface TabOption extends KeyValue<TodoTab> {}

interface TodoContext {
  selectedTab: Ref<TodoTab>;
  tabOptions: TabOption[];
  todos: Ref<Todo[]>;
  showModal: Ref<boolean>;
  closeModal: () => void;
  searchInput: Ref<string>;
  selectedTodoItem: Ref<Todo | null>;
  handleTodoEdit: (todo: Todo) => void;
  handleTodoItemSaved: () => void;
  refetchTodos: () => Promise<void>;
  users: Ref<User[]>;
}

const TodoProviderSymbol = Symbol("Todo");

export const TodoProvider = defineComponent({
  name: "TodoProvider",
  setup() {
    const searchInput = ref();
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

    const getTodosInput = computed(() => ({
      completed: selectedTab.value === "closed",
    }));
    const {
      loading: loadingTodos,
      errors: errorLoadingTodos,
      result: allTodos,
      refetch: refetchTodos,
    } = useGetTodos(getTodosInput);
    const todos = computed(() =>
      searchInput.value
        ? filterData(allTodos.value, [
            { key: "title", value: searchInput.value, type: SearchType.LK },
          ])
        : allTodos.value
    );

    const {
      loading: loadingUsers,
      errors: errorLoadingUsers,
      result: users,
      refetch: refetchUsers,
    } = useGetUsers();

    onMounted(() => refetchUsers());

    const selectedTodoItem = ref();
    const showModal = ref(false);

    function handleTodoEdit(todo: Todo) {
      selectedTodoItem.value = { ...todo };
      showModal.value = true;
    }
    function closeModal() {
      selectedTodoItem.value = null;
      showModal.value = false;
    }
    function handleTodoItemSaved() {
      closeModal();
      refetchTodos();
    }

    const context: TodoContext = {
      searchInput,
      selectedTab,
      tabOptions,
      todos,
      users,
      refetchTodos,
      showModal,
      closeModal,
      selectedTodoItem,
      handleTodoEdit,
      handleTodoItemSaved,
    };

    provide(TodoProviderSymbol, context);
  },
  render() {
    return this.$slots.default?.();
  },
});

export const useTodo = () => inject<TodoContext>(TodoProviderSymbol)!;
