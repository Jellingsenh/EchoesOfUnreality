import type { Nature } from "./Nature";
import type { Society } from "./Society";


export type FullLocation = {
    _id: string | null,
    name: string | null,
    type: string | null,
    size: string | null,
    modifier: string | null,
    appearance: string | null,
    nature: Nature | null,
    society: Society | null,
    parent: {name: string, type: string} | null,
    position: number[] | null,
    children: {name: string, type: string, charted: boolean}[] | null,
    anomalies: string[] | null,
    summary: string | null,
    // image: string | null, // image stored separately
}  
