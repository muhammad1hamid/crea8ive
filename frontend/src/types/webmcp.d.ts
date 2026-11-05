import "react";

declare module "react" {
  // React's generic is required for declaration merging; it does not affect these string attributes.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T extends Element> {
    toolname?: string;
    tooldescription?: string;
    toolparamdescription?: string;
    toolautosubmit?: boolean | string;
  }
}
