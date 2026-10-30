import { useState } from 'react'

interface Task {
  id: number
  title: string
  completed: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Odrób pracę domową', completed: false },
    { id: 2, title: 'Zrób jedzenie', completed: false },
    { id: 3, title: 'Spakuj plecak', completed: true },
  ])
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('original')

  const visibleTasks = tasks
    .filter((task) => {
      if (filter === 'done') return task.completed
      if (filter === 'todo') return !task.completed
      return true
    })
    .sort((a, b) => {
      if (sort === 'alphabetical') return a.title.localeCompare(b.title, 'pl')
      if (sort === 'status') return Number(a.completed) - Number(b.completed)
      return a.id - b.id
    })

  function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const title = newTask.trim()
    if (title === '') return

    setTasks([...tasks, { id: Date.now(), title, completed: false }])
    setNewTask('')
  }

  return (
    <main>
      <section>
        <p className="eyebrow">Moje zadania</p>
        <h1>Lista zadań</h1>
        <p className="intro">Dodawaj zadania i zaznaczaj te, które są już zrobione.</p>

        <form onSubmit={addTask}>
          <input
            aria-label="Nowe zadanie"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="Wpisz nowe zadanie"
          />
          <button type="submit">Dodaj</button>
        </form>

        <div>
          <label>
            Pokaż:
            <select value={filter} onChange={(event) => setFilter(event.target.value)}>
              <option value="all">Wszystkie</option>
              <option value="done">Wykonane</option>
              <option value="todo">Niewykonane</option>
            </select>
          </label>
          <label>
            Sortuj:
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="original">Oryginalny porządek</option>
              <option value="alphabetical">Alfabetycznie</option>
              <option value="status">Według stanu</option>
            </select>
          </label>
        </div>

        <ul>
          {visibleTasks.map((task) => (
            <li key={task.id}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {
                    setTasks(tasks.map((item) =>
                      item.id === task.id
                        ? { ...item, completed: !item.completed }
                        : item
                    ))
                  }}
                />
                <span>{task.title}</span>
              </label>
              <span>
                {task.completed ? ' Wykonane' : ' Niewykonane'}
              </span>
            </li>
          ))}
        </ul>

        {visibleTasks.length === 0 && <p>Brak zadań do wyświetlenia.</p>}

        <p>
          Liczba niewykonanych zadań: <strong>{tasks.filter((task) => !task.completed).length}</strong>
        </p>
      </section>
    </main>
  )
}
export default App