import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

/**
 * Minimal hash-based router.
 * Chosen over a routing library so the prototype deploys anywhere
 * (Vercel, static hosting, `vite preview`) with zero configuration.
 */

interface RouterCtx {
  path: string
  navigate: (to: string) => void
  back: () => void
}

const Ctx = createContext<RouterCtx>({ path: '/', navigate: () => {}, back: () => {} })

function readHash(): string {
  const h = window.location.hash.replace(/^#/, '')
  return h === '' ? '/' : h
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState<string>(readHash())

  useEffect(() => {
    const onChange = () => {
      setPath(readHash())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const navigate = (to: string) => {
    if (to === path) return
    window.location.hash = to
  }

  const back = () => window.history.back()

  return <Ctx.Provider value={{ path, navigate, back }}>{children}</Ctx.Provider>
}

export function useRouter() {
  return useContext(Ctx)
}

/** Matches '/passport/asset/:id' style patterns. Returns params or null. */
export function matchPath(pattern: string, path: string): Record<string, string> | null {
  const p = pattern.split('/').filter(Boolean)
  const a = path.split('/').filter(Boolean)
  if (p.length !== a.length) return null
  const params: Record<string, string> = {}
  for (let i = 0; i < p.length; i++) {
    if (p[i].startsWith(':')) params[p[i].slice(1)] = decodeURIComponent(a[i])
    else if (p[i] !== a[i]) return null
  }
  return params
}
