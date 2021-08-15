import express, {Request, Response} from 'express';
const app = express()

app.get('/echo/:what', (req: Request, res: Response) => {
  res.send(req.params)
})

module.exports = {
  path: '/api',
  handler: app
}
