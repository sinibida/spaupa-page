import { existsSync } from "fs";
import { readFileSync } from "fs";
import matter from "gray-matter";
import path from "path";

export interface BlogPost {
    source: string
    path: string
    error?: string
}

export const RELATIVE_BLOG_PATH = "./data/blogs/";
export const BLOG_PATH = path.resolve(process.cwd(), RELATIVE_BLOG_PATH);
export const getBlogPathWithId = (id: string) => {
    return path.resolve(BLOG_PATH, `${id}.mdx`);
}
export const getTrashPathWithId = (id: string) => {
    return path.resolve(BLOG_PATH, `trash/${id}.mdx`);
}

export default function GetMDX(name: string): BlogPost {
    const resolved = path.isAbsolute(name) ? (
        name 
    ) : ( 
        path.extname(name) === "" ? (
            getBlogPathWithId(name)
        ) : (
            path.resolve(BLOG_PATH, name)
        )
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