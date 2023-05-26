import type { Todo } from '~/crud'
import { GlobalStyles } from '~/styles/global-styles'
const bg = 'https://mariosouto.com/cursos/crudcomqualidade/bg'

const todos: Todo[] = [
  {
    id: 'a44de2ae-5df4-4e77-aa30-782a9dabf253',
    date: '2023-05-07T13:53:21.779Z',
    content: 'Hello World Again',
    done: false,
  },
  {
    id: 'c986833a-0151-47ca-a996-b12234483709',
    date: '2023-05-07T13:53:21.779Z',
    content: 'Hello World Once More',
    done: true,
  },
]

export default function Home() {
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

              {/* <tr>
                <td colSpan={4} align="center" style={{ textAlign: 'center' }}>
                  <button data-type="load-more">
                    Carregar mais{' '}
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
              </tr> */}
            </tbody>
          </table>
        </section>
      </main>
    </>
  )
}
