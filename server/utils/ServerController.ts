import WebManager from "../WebManager"

export class ServerController {
  protected path: string = ""
  getDecorator(path: string, fn: Function) {
    WebManager.AppExpress.get(this.path + path, async (req, res) => {
      try {
        await fn(req, res)
      } catch (e) {
        res.send({ e })
      }
    })
  }

  postDecorator(path: string, fn: Function) {
    WebManager.AppExpress.post(this.path + path, async (req, res) => {
      try {
        await fn(req, res)
      } catch (e) {
        res.send({ e })
      }
    })
  }
}
