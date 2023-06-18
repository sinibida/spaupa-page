import { NextResponse } from "next/server";
import path from "path";
import { readdirSync } from "fs";
import { getDrive, getFileContent } from "./drive";
import { BlogPostRaw } from "../types";
import moment from "moment";

const PREVIEW_CHAR_COUNT = 200;

export async function GET(request: Request) {
    // const p = BLOG_PATH;
    // const pathes = readdirSync(p);

    const drive = await getDrive();
    const searchResult = await drive.files.list({
        pageSize: 10,
        fields: 'files(id, name, createdTime)',
        orderBy: 'createdTime desc',
        q: `'${process.env.DRIVE_FOLDER_ID}' in parents and trashed = false and name contains '.mdx'`
    })
    if (!(searchResult.data.files)) {
        return NextResponse.json<BlogPostRaw[]>([], {status: 500});
    }

    const promises = searchResult.data.files.map(async (x): Promise<BlogPostRaw> => {
        return {
            source: await getFileContent(drive, x.id!, PREVIEW_CHAR_COUNT),
            path: /([^\.\n]+)(?:\..+)?/.exec(x.name!)![1],
            createdTime: x.createdTime!
        }
    })

    const promisesGranted = await Promise.all(promises);

    return NextResponse.json<BlogPostRaw[]>(promisesGranted);
}

export function DELETE(request: Request) {
    // wtf....

    return NextResponse.json({});
}
