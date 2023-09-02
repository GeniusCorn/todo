import { createSignal, For, Switch, Match, createEffect } from 'solid-js'
import { v4 as uuidv4 } from 'uuid'

type Todo = {
  id: string
  text: string
  completed: boolean
}

type Filter = 'all' | 'active' | 'completed'

function createLocalSignal<T extends object>(value: T) {
  const stored = localStorage.getItem('stored')

  const [signal, setSignal] = createSignal<T>(
    stored ? JSON.parse(stored) : value,
  )

  createEffect(() => {
    localStorage.setItem('stored', JSON.stringify(signal()))
  })

  return [signal, setSignal] as const
}

export default function TodoApp() {
  const [filter, setFilter] = createSignal<Filter>('all')
  const [todos, setTodo] = createLocalSignal<Todo[]>([])

  const addTodo = (event: KeyboardEvent) => {
    const inputValue = (event.target as HTMLInputElement).value

    if (event.key !== 'Enter' || !inputValue) {
      return
    }

    const newTodo = {
      id: uuidv4(),
      text: inputValue.trim(),
      completed: false,
    }

    setTodo((prevTodos) => [...prevTodos, newTodo])
    ;(event.target as HTMLInputElement).value = ''

    console.log(todos())
  }

  const toggleCompleteTodo = (id: string) => {
    setTodo((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )

    console.log(todos())
  }

  const removeTodo = (id: string) => {
    setTodo((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  const filterList = () => {
    switch (filter()) {
      case 'active':
        return todos().filter((todo) => !todo.completed)
      case 'completed':
        return todos().filter((todo) => todo.completed)
      default:
        return todos()
    }
  }

  return (
    <>
      <h1 class="text-center">Todos</h1>

      <input
        class="border border-gray-100 rounded-lg px-4 py-2 text-xl outline-none"
        placeholder="Add a todo..."
        onKeyDown={addTodo}
      />

      <For each={filterList()}>
        {(todo) => (
          <div class="w-full flex flex-row items-center justify-stretch gap-2 text-2xl divide-x-0 divide-y-2 divide-slate-400/55 divide-dashed">
            <Switch>
              <Match when={todo.completed === true}>
                <div
                  i-material-symbols:check-circle
                  class="cursor-pointer hover:text-slate"
                  onClick={[toggleCompleteTodo, todo.id]}
                />
              </Match>

              <Match when={todo.completed === false}>
                <div
                  i-material-symbols:check-circle-outline-rounded
                  class="cursor-pointer hover:text-slate"
                  onClick={[toggleCompleteTodo, todo.id]}
                />
              </Match>
            </Switch>
            <div class="w-full">{todo.text}</div>

            <div
              i-material-symbols:delete-forever-outline
              class="cursor-pointer justify-self-end hover:text-slate"
              onClick={[removeTodo, todo.id]}
            />
          </div>
        )}
      </For>

      <div class="w-full flex justify-center gap-4">
        <div
          classList={{ 'text-slate': filter() === 'all' }}
          class="cursor-pointer hover:text-slate"
          onClick={[setFilter, 'all']}
        >
          All
        </div>
        <div
          classList={{ 'text-slate': filter() === 'active' }}
          class="cursor-pointer hover:text-slate"
          onClick={[setFilter, 'active']}
        >
          Active
        </div>
        <div
          classList={{ 'text-slate': filter() === 'completed' }}
          class="cursor-pointer hover:text-slate"
          onClick={[setFilter, 'completed']}
        >
          Completed
        </div>
      </div>
    </>
  )
}
