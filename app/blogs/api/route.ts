import { NextResponse } from "next/server";
import path from "path";
import { readdirSync } from "fs";
import { getDrive, getFileContent } from "./drive";

export async function GET(request: Request) {
    // const p = BLOG_PATH;
    // const pathes = readdirSync(p);

    

    const drive = await getDrive();
    const searchResult = await drive.files.list({
        fields: 'files(id, name)',
        q: `'${process.env.DRIVE_FOLDER_ID}' in parents`
    })
    if (!(searchResult.data.files)) {
        return NextResponse.json("Error", {status: 500});
    }

    const promises = searchResult.data.files.map(async x => ({
        source: await getFileContent(drive, x.id!),
        path: /([^\.\n]+)(?:\..+)?/.exec(x.name!)![1],
    }))

    const promisesGranted = await Promise.all(promises);

    return NextResponse.json(promisesGranted);
}