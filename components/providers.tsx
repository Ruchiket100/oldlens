"use client";
import { createStore, Provider } from "jotai";
import Overlay from "./overlays/overlay";

export default function Providers({ children }: { children: React.ReactNode }) {
	const myStore = createStore();
	return (
		<Provider store={myStore}>
			<Overlay />
			{children}
		</Provider>
	);
}
