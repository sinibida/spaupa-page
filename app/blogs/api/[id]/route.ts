import { NextRequest, NextResponse } from "next/server";
import GetMDX, { BLOG_PATH, getBlogPathWithId, getTrashPathWithId } from "../util";
import * as fs from "fs";
import path from "path";
import { Readable } from "stream";
import { error } from "console";

interface Params {
    params: {
        id: string
    }
}

export function GET(request: Request, {params}: Params) {
    const id = params.id;

    return NextResponse.json(GetMDX(id));
}

export async function DELETE(request: Request, {params}: Params) {
    const id = params.id;

    const srcPath = getBlogPathWithId(id);
    const dstPath = getTrashPathWithId(id);
    console.log(srcPath, dstPath);

    if (!fs.existsSync(srcPath)) {
        return NextResponse.json({
            message: `Post '${id}' not found`
        }, {
            status: 400
        });
    }

    if (!fs.existsSync(path.dirname(dstPath))){
        fs.mkdirSync(path.dirname(dstPath), { recursive: true });
    }

    const rstr = fs.createReadStream(srcPath);
    const wstr = fs.createWriteStream(dstPath, {
        flags: 'w'
    });

    await new Promise((resolve, reject) => {
        rstr
        .on('end', resolve)
        .on('error', reject)
        .pipe(wstr);
    });

    rstr.close();
    wstr.close();

    await fs.promises.unlink(srcPath);

    return NextResponse.json({
        message: `Moved post '${id}' into trash folder.`
    });
}

async function pipeBodyToWriteStream(body: ReadableStream<Uint8Array>, writeStream: fs.WriteStream) {
    const bodyReader = body.getReader();
    while (true) {
        const {value, done} = await bodyReader.read();
        if (done) break;
        await new Promise((resolve, reject) => {
            writeStream.write(value, (err) => {resolve(null)});
        });
    }
}

export async function POST(request: Request, {params}: Params) {
    const id = params.id;

    const { body } = request;
    if (!body) {
        return NextResponse.json({
            message: `Requires body`
        }, {
            status: 400
        });
    }
    
    const dstPath = getBlogPathWithId(id);

    if (fs.existsSync(dstPath)) {
        return NextResponse.json({
            message: `Post already exists`
        }, {
            status: 400
        });
    }

    const wstr = fs.createWriteStream(dstPath, {
        flags: 'w'
    });

    await pipeBodyToWriteStream(body, wstr);

    wstr.close();

    return NextResponse.json({
        message: `Posted post '${id}'`
    });
}
