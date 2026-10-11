import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />

      <main className="main">
        <section className="container" style={{ paddingTop: '180px', paddingBottom: '100px' }}>
          <h1>Restaurant Platform</h1>
          <p>Клієнтська вебплатформа для ресторанного бізнесу</p>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default App