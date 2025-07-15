const core = require("@actions/core");
const tc = require("@actions/tool-cache"); // 引入 @actions/tool-cache
const os = require("node:os");
const path = require("node:path");

// os.platform() 返回 'darwin', 'linux' 等
const osmap = {
	darwin: "mac",
	linux: "linux",
};

const sdkRoot = path.join(os.homedir(), "harmonyos-sdk");
const sdkHome = path.join(sdkRoot, "command-line-tools");
const sdkBin = path.join(sdkHome, "bin");

async function run() {
	try {
		core.info("Downloading HarmonyOS SDK...");

		const meta = await fetch(
			"https://api.github.com/repos/jiwangyihao/hos-sdk/releases/latest",
		).then((res) => res.json());

		const assets = meta.assets;
		const mappedOS = osmap[os.platform()];

		if (!assets || assets.length === 0) {
			core.setFailed("No assets found in the latest release.");
			return;
		}

		if (!mappedOS) {
			core.setFailed("Unsupported OS: " + os.platform());
			return;
		}

		const asset = assets.find((a) => a.name.includes(mappedOS));

		if (!asset) {
			core.setFailed(
				`Could not find a release asset for platform: ${mappedOS}`,
			);
			return;
		}

		const url = asset.browser_download_url;
		core.info(`Downloading SDK for ${mappedOS} from ${url}...`);

		const sdkZipPath = await tc.downloadTool(url);
		core.info(`SDK successfully downloaded to ${sdkZipPath}`);

		core.info("Extracting SDK...");
		await tc.extractZip(sdkZipPath, sdkRoot);
		core.info("SDK downloaded and extracted to " + sdkRoot);

		core.setOutput("sdk-path", sdkHome);
		core.exportVariable("HOS_SDK_HOME", sdkHome);
		core.addPath(sdkBin);
	} catch (error) {
		core.setFailed(error.message);
	}
}

module.exports = {
	run,
};
