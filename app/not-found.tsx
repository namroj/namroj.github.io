import { Metadata } from 'next'

import '@/app/_assets/styles/not-found.scss'

export const metadata: Metadata = {
  title: '404 | Jorman Espinoza'
}

export default function NotFoundPage() {
  return (
    <div className='not-found'>
      <h2>404</h2> Recurso no encontrado
    </div>
  )
}
