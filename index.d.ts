import * as React from "react"

declare module "three" {
  var THREE: any
  export = THREE
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>>
    }
  }
}
