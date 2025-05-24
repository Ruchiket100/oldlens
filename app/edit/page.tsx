"use client";

import Header from "@/components/Header";
import PhotoEditor from "@/components/photoEditor";
import Texture from "@/components/texture";
import { uploadedImageAtom } from "@/utils/store";
import { useAtom } from "jotai";
import { notFound, useRouter } from "next/navigation";

const EditPage = () => {
	const [uploadedImage, setUploadedImage] = useAtom(uploadedImageAtom);
	const router = useRouter();

	if (!uploadedImage) return notFound();
	return (
		<div className="min-h-screen h-full flex flex-col overflow-x-hidden w-screen text-white bg-gradient-to-t from-accent-900 to-40% to-black relative">
			<Header />
			<Texture className="fixed opacity-30 mix-blend-screen object-cover w-full h-full z-[999] pointer-events-none" />

			<PhotoEditor
				imageFile={uploadedImage}
				onReset={() => {
					router.push("/");
					setTimeout(() => {
						setUploadedImage(null);
					}, 500);
				}}
			/>
		</div>
	);
};

export default EditPage;
