import { useParams } from 'react-router-dom'

function DishPage() {
  const { id } = useParams()

  return (
    <section className="container">
      <h1>Деталі страви</h1>
      <p>ID страви: {id}</p>
    </section>
  )
}

export default DishPage