import { Router } from "express"
import AuthorizeMiddleware from "../middleware/AuthorizeMiddleware"
import RolesMiddleware from "../middleware/RolesMiddleware"
import GuildEventService from "./guildEvent.service"
const GuildEventController = Router()
/**
 * @swagger
 *  /guild-event:
 *  get:
 *    tags: [Guild Events]
 *    description: Возвращает список всех созданных событий
 *    parameters:
 *      - $ref: "#/parameters/token"
 *    responses:
 *      '200':
 *        schema:
 *          type: "array"
 *          items:
 *            $ref: "#/definitions/GuildEventsDTOResponse"
 *      '400':
 *        schema:
 *         $ref: "#/definitions/ErrorResponse"
 */
GuildEventController.get(
  "",
  AuthorizeMiddleware,
  RolesMiddleware(["USER", "ADMIN"]),
  GuildEventService.getEvents
)
/**
 * @swagger
 *  /guild-event/{id}:
 *  get:
 *    tags: [Guild Events]
 *    description: Возвращает данные об определенном событии по id
 *    parameters:
 *      - $ref: "#/parameters/token"
 *      - name: "id"
 *        in: "path"
 *        description: "id события"
 *        required: true
 *        type: "string"
 *    responses:
 *      '200':
 *        schema:
 *          $ref: "#/definitions/GuildEventsDTOResponse"
 *      '400':
 *        schema:
 *         $ref: "#/definitions/ErrorResponse"
 */
GuildEventController.get(
  "/:id",
  AuthorizeMiddleware,
  RolesMiddleware(["USER", "ADMIN"]),
  GuildEventService.getEvent
)
/**
 * @swagger
 *  /guild-event:
 *  post:
 *    tags: [Guild Events]
 *    description: Создает определенное событие
 *    parameters:
 *      - $ref: "#/parameters/token"
 *      - name: "body"
 *        in: "body"
 *        required: true
 *        schema:
 *          $ref: "#/definitions/GuildEventsDTOResponse"
 *    responses:
 *      '200':
 *        schema:
 *          $ref: "#/definitions/GuildEventsDTOResponse"
 *      '400':
 *        schema:
 *         $ref: "#/definitions/ErrorResponse"
 */
GuildEventController.post(
  "",
  AuthorizeMiddleware,
  RolesMiddleware(["ADMIN"]),
  GuildEventService.createEvent
)

/**
 * @swagger
 *  /guild-event/{id}:
 *  patch:
 *    tags: [Guild Events]
 *    description: Изменяет значения в определенном событии
 *    parameters:
 *      - $ref: "#/parameters/token"
 *      - name: "body"
 *        in: "body"
 *        required: true
 *        schema:
 *          $ref: "#/definitions/GuildEventsDTOResponse"
 *    responses:
 *      '200':
 *        schema:
 *          $ref: "#/definitions/GuildEventsDTOResponse"
 *      '400':
 *        schema:
 *         $ref: "#/definitions/ErrorResponse"
 */
GuildEventController.patch(
  "/:id",
  AuthorizeMiddleware,
  RolesMiddleware(["ADMIN"]),
  GuildEventService.updateEvent
)

export default GuildEventController
