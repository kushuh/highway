import "@testing-library/jest-dom/extend-expect";
import { TextEncoder, TextDecoder } from "util";

// @ts-ignore
globalThis.TextEncoder = TextEncoder;
// @ts-ignore
globalThis.TextDecoder = TextDecoder;
