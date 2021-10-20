import { rest } from 'msw'

export const handlers = [
  // TODO #17 fix mock service worker handlers
  rest.get('/user', (req, res, ctx) => {
    return res(ctx.json({ username: 'admin' }))
  }),
  rest.get('https://api.backend.dev/user', (req, res, ctx) => {
    return res(ctx.json({ firstName: 'John' }))
  }),
]
