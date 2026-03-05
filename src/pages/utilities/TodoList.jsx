// src/pages/utilities/TodoList.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('utilityHub_todos')
    return saved ? JSON.parse(saved) : []
  })
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('utilityHub_todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setTodos(prev => [...prev, {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    }])
    setInput('')
  }

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const completedCount = todos.filter(t => t.completed).length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </Link>

      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">📝 Todo List</h1>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          {/* Add Todo Form */}
          <form onSubmit={addTodo} className="flex gap-3 mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-xl transition-all duration-300 cursor-pointer"
            >
              Add
            </button>
          </form>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer capitalize ${
                  filter === f
                    ? 'bg-indigo-500/20 text-indigo-400'
                    : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Todo List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-3">📋</div>
                <p>No tasks {filter !== 'all' ? `(${filter})` : 'yet'}. Add one above!</p>
              </div>
            ) : (
              filteredTodos.map(todo => (
                <div
                  key={todo.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    todo.completed
                      ? 'bg-gray-800/50 border-gray-800'
                      : 'bg-gray-800 border-gray-700'
                  }`}
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                      todo.completed
                        ? 'bg-indigo-500 border-indigo-500'
                        : 'border-gray-600 hover:border-indigo-500'
                    }`}
                  >
                    {todo.completed && (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <span className={`flex-1 text-sm ${todo.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-1 text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {todos.length > 0 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
              <span className="text-sm text-gray-400">
                {completedCount}/{todos.length} completed
              </span>
              {completedCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-sm text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                >
                  Clear completed
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TodoList