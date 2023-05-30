import { existsSync } from "fs";
import { readFileSync } from "fs";
import matter from "gray-matter";
import path from "path";

export interface BlogPost {
    source: string
    path: string
    error?: string
}

export default function GetMDX(name: string): BlogPost {
    const resolved = path.isAbsolute(name) ? (
      name 
    ) : ( 
      path.resolve(process.cwd(), `./data/blogs/${name}.mdx`)
    );
    if (!existsSync(resolved)) {
        return {
            source: "",
            path: "",
            error: "Invalid Id"
        }
    }

    const source = readFileSync(resolved);

    return {
        source: source.toString(),
        path: path.parse(name).name
    }
}