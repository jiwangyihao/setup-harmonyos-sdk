const core = require("@actions/core");
const os = require("node:os");
const path = require("node:path");
const zip = require("adm-zip");

osmap = {
	darwin: "mac",
	linux: "linux",
};

const sdkRoot = path.join(os.homedir(), "harmonyos-sdk");
const sdkHome = path.join(sdkRoot, "command-line-tools");
const sdkBin = path.join(sdkHome, "bin");

async function run() {
	core.info("Downloading HarmonyOS SDK...");

	const meta = await fetch(
		"https://api.github.com/repos/jiwangyihao/hos-sdk/releases/latest",
	).then((res) => res.json());
	const assets = meta.assets;
	const mappedOS = osmap[os.platform()];

	core.info("Fetched release metadata: " + JSON.stringify(meta));

	if (!assets || assets.length === 0) {
		core.setFailed("No assets found in the latest release.");
		return;
	}

	if (!mappedOS) {
		core.setFailed("Unsupported OS: " + os.platform());
		return;
	}

	const asset = assets[0];

	const url = asset.browser_download_url;
	core.info(`Downloading SDK-${mappedOS} from ${url}...`);
	const response = await fetch(url);
	if (!response.ok) {
		core.setFailed(`Failed to download SDK: ${response.statusText}`);
		return;
	}

	const zipBuffer = await response.arrayBuffer();
	zip(Buffer.from(zipBuffer)).extractAllTo(sdkRoot, true, true);
	core.info("SDK downloaded and extracted to " + sdkRoot);

	core.setOutput("sdk-path", sdkHome);
	core.exportVariable("HOS_SDK_HOME", sdkHome);
	core.addPath(sdkBin);
}

module.exports = {
	run,
};
