import { storageService } from "./storage.service";
import { taskService } from "./task.service";

export const service = {
  storage: storageService,
  task: taskService
}