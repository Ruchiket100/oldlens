"use client";
import { createStore, Provider } from "jotai";
import Overlay from "./overlays/overlay";

export default function Providers({ children }: { children: React.ReactNode }) {
	const storeKey = "__jotai_store__";
	const myStore =
		typeof window !== "undefined"
			? (window as any)[storeKey] ||
			  ((window as any)[storeKey] = createStore())
			: createStore();
	return (
		<Provider store={myStore}>
			<Overlay />
			{children}
		</Provider>
	);
}
