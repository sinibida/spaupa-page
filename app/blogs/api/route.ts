import { globSync } from "glob";
import { NextResponse } from "next/server";
import path from "path";
import GetMDX from "./getMdx";

export function GET(request: Request) {
    
    const pathes = globSync("data/blogs/*");
    console.log(pathes);

    return NextResponse.json(pathes.map(x => 
        GetMDX(path.resolve(process.cwd(), x))
    ));
}