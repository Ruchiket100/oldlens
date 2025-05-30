import { atom } from "jotai";
import { Overlay } from "./types/overlay";
import { atomWithStorage } from "jotai/utils";

export const overlayAtom = atom<Overlay | null>(null);
export const uploadedImageAtom = atom<File | null>(null);
