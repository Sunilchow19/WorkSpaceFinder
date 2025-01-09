

import { configureStore } from "@reduxjs/toolkit"
import globalObject from "./global"

export let store=configureStore({
    reducer:globalObject
})