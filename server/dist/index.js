"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 4000;
const handleAppError = (error) => console.log(error);
const handleListening = () => console.log(`Listening on http://localhost:${PORT}`);
app_1.default.listen(PORT, handleListening);
app_1.default.on("error", handleAppError);
