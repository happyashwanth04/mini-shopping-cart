import { createContext } from "react";
import { getDeviceType } from "../utils";
export const DeviceTypeContext = createContext(getDeviceType())