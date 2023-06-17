// Raw post data (from google drive api)
export interface BlogPostRaw {
    source: string
    path: string
    createdTime: string
    error?: string
}

// Formatted post data (for front-end)
export interface BlogPost {
    content: string
    id: string
    title: string
    createdTime: Date
}