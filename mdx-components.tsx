import React from "react";

// This file is required to use @next/mdx in the `app` directory.
export function useMDXComponents(components: (props: any) => React.ReactNode) {
  return components
}