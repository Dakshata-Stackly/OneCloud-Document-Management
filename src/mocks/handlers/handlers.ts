import { dashboardHandlers } from './dashboardHandler'
import { documentHandlers } from './documentHandler'
import { categoryHandlers } from './categoryHandler'
import { favoriteHandlers } from './favoriteHandler'
import { trashHandlers } from './trashHandler'

export const handlers = [
  ...dashboardHandlers,
  ...documentHandlers,
  ...categoryHandlers,
  ...favoriteHandlers,
  ...trashHandlers,
]