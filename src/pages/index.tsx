import { useEffect, useMemo, useState } from 'react'

import { GlobalStyles } from '~/styles/global-styles'

import { todosController } from '~/frontend/controllers/todos'

const bg = 'https://mariosouto.com/cursos/crudcomqualidade/bg'

type Todo = {
  id: string
  content: string
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)

  const hasMorePages = useMemo(() => pages > page, [pages, page])

  const handleLoadMorePages = () => {
    const nextPage = page + 1
    setPage(nextPage)
    todosController.get({ page: nextPage }).then(({ todos, pages }) => {
      setTodos((prev) => [...prev, ...todos])
      setPages(pages)
    })
  }

  useEffect(() => {
    todosController.get({ page }).then(({ todos, pages }) => {
      setTodos(todos)
      setPages(pages)
    })
    return () => setTodos([])
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
          <form>
            <input type="text" placeholder="Correr, Estudar..." />
            <button type="submit" aria-label="Adicionar novo item">
              +
            </button>
          </form>
        </header>

        <section>
          <form>
            <input type="text" placeholder="Filtrar lista atual, ex: Dentista" />
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
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{todo.id.slice(0, 5)}</td>
                  <td>{todo.content}</td>
                  <td align="right">
                    <button data-type="delete">Apagar</button>
                  </td>
                </tr>
              ))}

              {/* <tr>
                <td colSpan={4} align="center" style={{ textAlign: 'center' }}>
                  Carregando...
                </td>
              </tr> */}

              {/* <tr>
                <td colSpan={4} align="center">
                  Nenhum item encontrado
                </td>
              </tr> */}

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
