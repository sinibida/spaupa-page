import { NextResponse } from "next/server";
import path from "path";
import GetMDX, { BLOG_PATH } from "./util";
import { readdirSync } from "fs";

export function GET(request: Request) {
    const p = BLOG_PATH;
    const pathes = readdirSync(p);

    return NextResponse.json(pathes.map(x => 
        GetMDX(x)
    ));
}