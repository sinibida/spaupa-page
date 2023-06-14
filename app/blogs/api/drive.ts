import { promises as fs } from "fs";
import { google, drive_v3 } from "googleapis";
import { GoogleAuth } from "google-auth-library";
import { Readable } from "stream";
import path from "path";

const TOKEN_PATH = path.resolve(process.cwd(), "token.json");

let cachedDrive: (drive_v3.Drive | null) = null;

export async function getDrive(): Promise<drive_v3.Drive> {
    if (cachedDrive)
        return cachedDrive;

    const tokenContent = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(tokenContent.toString());
    const jsonClient = google.auth.fromJSON(credentials);
    const authClient = new GoogleAuth({authClient: jsonClient});
    const drive = google.drive({version: 'v3', auth: authClient});
    cachedDrive = drive;
    return drive;
}

function streamToString(stream: Readable): Promise<string> {
    const chunks: any[] = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    })
}

export async function getFileContent(drive: drive_v3.Drive, fileId: string) {
    const driveStream = await drive.files.get({
        fileId: fileId!,
        alt: 'media',
    }, {
        responseType: 'stream'
    })
    return await streamToString(driveStream.data);
}
