declare module 'd3-force-3d' {
  export function forceCollide<NodeDatum = any>(
    radius?:
      | number
      | ((node: NodeDatum, i: number, nodes: NodeDatum[]) => number),
  ): {
    radius(
      radius?:
        | number
        | ((node: NodeDatum, i: number, nodes: NodeDatum[]) => number),
    ): any;
    strength(strength?: number): any;
    iterations(n?: number): any;
  };
}
