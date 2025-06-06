import { useEffect } from "react";

type AdBannerTypes = {
	dataAdSlot: string;
	dataAdFormat: string;
	dataFullWidthResponsive: boolean;
};

const AdBanner = (props: AdBannerTypes) => {
	useEffect(() => {
		try {
			((window as any).adsbygoogle =
				(window as any).adsbygoogle || []).push({});
		} catch (error) {
			console.error("Error loading Google AdSense script:", error);
		}
	}, []);
	return (
		<ins
			className="adsbygoogle"
			style={{ display: "block", textAlign: "center" }}
			data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
			data-ad-slot={props.dataAdSlot}
			data-ad-format={props.dataAdFormat}
			data-full-width-responsive={props.dataFullWidthResponsive.toString()}
		></ins>
	);
};

export default AdBanner;
