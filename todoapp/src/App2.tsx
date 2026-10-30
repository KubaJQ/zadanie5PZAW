import { useState } from 'react'
import './App.css'

type Task = {
  id: number
  title: string
  completed: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Odrób pracę domową', completed: false },
    { id: 2, title: 'Przeczytaj lekturę', completed: false },
    { id: 3, title: 'Spakuj plecak', completed: true },
  ])

  const toggleTask = (taskId: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const unfinishedCount = tasks.filter((task) => !task.completed).length

  return (
    <main className="todo-app">
      <section className="todo-card" aria-labelledby="page-title">
        <p className="eyebrow">Mój plan dnia</p>
        <h1 id="page-title">Lista zadań</h1>
        <p className="intro">Zaznacz zadanie, gdy będzie już wykonane.</p>
        <ul className="task-list">
          {tasks.map((task) => (
            <li className="task-item" key={task.id}>
              <label className={`task-label${task.completed ? ' is-completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span>{task.title}</span>
              </label>
              <span className={`task-status${task.completed ? ' done' : ''}`}>
                {task.completed ? 'Wykonane' : 'Do zrobienia'}
              </span>
            </li>
          ))}
        </ul>
        <p className="task-summary" aria-live="polite">
          Niewykonane zadania: <strong>{unfinishedCount}</strong>
        </p>
      </section>
    </main>
  )
}

export default App
