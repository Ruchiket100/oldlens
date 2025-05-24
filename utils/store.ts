import { atom } from "jotai";
import { Overlay } from "./types/overlay";

export const overlayAtom = atom<Overlay | null>(null);
export const uploadedImageAtom = atom<File | null>(null);
