import { Title } from 'solid-start'
import TodoApp from '@/components/TodoApp'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main class="h-screen w-screen bg-gray-100">
      <Title>Todo Solid</Title>

      <div class="m-auto w-2xl flex flex-col justify-center gap-2">
        <TodoApp />
      </div>

      <br />
      <Footer />
    </main>
  )
}
