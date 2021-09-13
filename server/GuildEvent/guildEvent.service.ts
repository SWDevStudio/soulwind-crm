import { Request, Response } from "express"
import TimeHelper from "../utils/TimeHelper"
import GuildEventModel from "./dto/guildEvent.model"
import {
  GuildEventDto,
  GuildEventDtoResponse,
} from "~/server/GuildEvent/dto/guildEvent.dto"
import { ErrorResponse } from "~/structs/ErrorResponse"
class GuildEventService {
  async getEvents(req: Request, res: Response) {
    try {
      res.json(await GuildEventModel.find())
    } catch (e) {
      res.status(400).json({ message: e })
    }
  }

  async getEvent(req: Request, res: Response) {
    try {
      res.json(
        await GuildEventModel.findOne({
          _id: req.params.id,
        })
      )
    } catch (e) {
      res.status(400).json({ message: e })
    }
  }

  async createEvent(
    req: Request<{}, {}, GuildEventDto>,
    res: Response<GuildEventDtoResponse | ErrorResponse>,
    next: Function
  ) {
    try {
      const startDay = TimeHelper.startDay(req.body.date)
      req.body.date = startDay
      const searchEvent = await GuildEventModel.findOne({
        date: startDay,
      })

      if (searchEvent) {
        return res.status(400).json({
          message: `Событие типа на этот день уже создано`,
        })
      }
      await GuildEventModel.create(req.body)
      next()
    } catch (e) {
      res.status(400).json({ message: e })
    }
  }

  async updateEvent(
    req: Request<{ id: string }, {}, GuildEventDto>,
    res: Response<GuildEventDtoResponse[] | ErrorResponse>,
    next: Function
  ) {
    try {
      await GuildEventModel.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body
      )
      next()
    } catch (e) {
      res.status(400).json({ message: e })
    }
  }
}

export default new GuildEventService()
