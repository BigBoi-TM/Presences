import { Resolver } from "../util";

function isActive(): boolean {
	return (
		document.location.pathname.includes("/shorts/") &&
		!!getTitle() &&
		!!getUploader() &&
		!!getChannelURL() &&
		!!getVideoID()
	);
}

function getTitle(): string {
	return getShortsElement()
		?.closest(".ytd-reel-player-overlay-renderer")
		?.querySelector(".title")
		?.textContent.trim();
}

function getShortsElement(): HTMLElement {
	return (
		document
			.querySelector("video")
			?.closest("ytd-reel-video-renderer")
			?.querySelector(
				"yt-formatted-string#text.style-scope.ytd-channel-name"
			) ??
		document
			.querySelectorAll("video")[1]
			?.closest("ytd-reel-video-renderer")
			?.querySelector("yt-formatted-string#text.style-scope.ytd-channel-name")
	);
}

function getUploader(): string {
	const closest = getShortsElement();
	if (!closest?.textContent) return "";
	return `${closest
		?.querySelector("a")
		?.getAttribute("href")
		?.replace("/", "")
		?.replace("@", "")} (${closest?.textContent})`;
}

function getChannelURL(): string {
	return `https://${document.location.hostname}/${
		getShortsElement()?.textContent
	}`;
}

export function getVideoID(): string {
	return document.location.pathname.split("/shorts/")[1];
}

const resolver: Resolver = {
	isActive,
	getTitle,
	getUploader,
	getChannelURL,
	getVideoID,
};

export default resolver;
