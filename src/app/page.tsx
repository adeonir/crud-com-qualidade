'use client'

import type { ChangeEvent, FormEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'

import { GlobalStyles } from '~/styles/global-styles'

import { todosController } from '~/frontend/controller/todos'
import type { Todo } from '~/schema/todo'

const bg = 'https://mariosouto.com/cursos/crudcomqualidade/bg'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [todoContent, setTodoContent] = useState('')
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const filteredTodos = todosController.filterByContent<Todo>({ todos, search })

  const hasMorePages = useMemo(() => pages > page, [pages, page])
  const emptyTodosList = useMemo(() => filteredTodos.length === 0 && !isLoading, [isLoading, filteredTodos])

  const handleLoadMorePages = () => {
    const nextPage = page + 1
    setIsLoading(true)
    setPage(nextPage)
    todosController
      .findAll({ page: nextPage })
      .then(({ todos, pages }) => {
        setTodos((prev) => [...prev, ...todos])
        setPages(pages)
      })
      .finally(() => setIsLoading(false))
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleTodoContent = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoContent(event.target.value)
  }

  const handleToggleDone = (id: string) => {
    setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
    todosController.toggleDone({ id }).catch(() => console.error('Failed to toggle done'))
  }

  const handleDelete = (id: string) => {
    todosController
      .deleteById({ id })
      .then(() => setTodos((todos) => todos.filter((todo) => todo.id !== id)))
      .catch(() => console.error('Failed to delete'))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    todosController
      .createNew({
        content: todoContent,
      })
      .then((todo) => {
        setTodos((prev) => [todo as Todo, ...prev])
        setTodoContent('')
      })
  }

  useEffect(() => {
    todosController
      .findAll({ page })
      .then(({ todos, pages }) => {
        setTodos(todos)
        setPages(pages)
      })
      .finally(() => setIsLoading(false))
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <GlobalStyles themeName="devsoutinho" />
      <main>
        <header
          style={{
            backgroundImage: `url('${bg}')`,
          }}
        >
          <div className="typewriter">
            <h1>O que fazer hoje?</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="addNew"
              placeholder="Correr, Estudar..."
              value={todoContent}
              onChange={handleTodoContent}
            />
            <button type="submit" aria-label="Adicionar novo item">
              +
            </button>
          </form>
        </header>

        <section>
          <form>
            <input type="text" placeholder="Filtrar lista atual, ex: Dentista" onChange={handleSearch} />
          </form>

          <table border={1}>
            <thead>
              <tr>
                <th align="left">
                  <input type="checkbox" disabled />
                </th>
                <th align="left">Id</th>
                <th align="left">Conteúdo</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {filteredTodos.map((todo) => (
                <tr key={todo.id} role="row">
                  <td>
                    <input type="checkbox" checked={todo.done} onChange={() => handleToggleDone(todo.id)} />
                  </td>
                  <td>{todo.id.slice(0, 5)}</td>
                  <td>{todo.done ? <s>{todo.content}</s> : todo.content}</td>
                  <td align="right">
                    <button data-type="delete" onClick={() => handleDelete(todo.id)}>
                      Apagar
                    </button>
                  </td>
                </tr>
              ))}

              {isLoading && (
                <tr>
                  <td colSpan={4} align="center" style={{ textAlign: 'center' }}>
                    Carregando...
                  </td>
                </tr>
              )}

              {emptyTodosList && (
                <tr>
                  <td colSpan={4} align="center">
                    Nenhum item encontrado
                  </td>
                </tr>
              )}

              {hasMorePages && (
                <tr>
                  <td colSpan={4} align="center" style={{ textAlign: 'center' }}>
                    <button data-type="load-more" onClick={handleLoadMorePages}>
                      Página {page}, Carregar mais{' '}
                      <span
                        style={{
                          display: 'inline-block',
                          marginLeft: '4px',
                          fontSize: '1.2em',
                        }}
                      >
                        ↓
                      </span>
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </>
  )
}
