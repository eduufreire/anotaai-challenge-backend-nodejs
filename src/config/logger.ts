import { createLogger, format, transports } from "winston";
import {v4 as uuidv4} from 'uuid'

export const logger = createLogger({
	format: format.combine(
		format.timestamp(),
		format.printf(({ level, label, timestamp, message }) => {
			return `${timestamp} [${level.toUpperCase()}] ${label}: {"correlationId": ${uuidv4()}, data: ${message}}`;
		}),
	),
	transports: [new transports.Console(), new transports.File({ filename: "telemetry.log" })],
});
