import logoImage from '@/assets/images/logo-site.svg'
import IntroAnimation from '@/components/Site/IntroAnimation'
import { useState } from 'react'

export default function Home() {
  const [introCompleted, setIntroCompleted] = useState(false)

  return (
    <>
      {!introCompleted && (
        <IntroAnimation
          logoSrc={logoImage}
          onComplete={() => setIntroCompleted(true)}
        />
      )}

      <div
        className={`${introCompleted ? 'opacity-100' : 'opacity-0'} transition-all`}
      >
        Seu conteudo aqui
      </div>
    </>
  )
}
