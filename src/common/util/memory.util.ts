import { Injectable } from "@nestjs/common";
import * as os from "os"

@Injectable()
export class MemoryUtil {

    getFreeMemory() {
        return (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);
    }


}