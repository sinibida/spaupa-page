import { NextResponse } from "next/server";
import GetMDX from "../getMdx";

interface Params {
    params: {
        id: string
    }
}

export function GET(request: Request, {params}: Params) {
    const id = params.id;

    return NextResponse.json(GetMDX(id));
}
