import { NotificationTypes } from "../enums/notificationTypes.enum";

export interface SnackbarInterface {
    message: string;
    type: NotificationTypes;
}
