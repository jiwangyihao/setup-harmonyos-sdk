const core = require("@actions/core");
const tc = require("@actions/tool-cache"); // 引入 @actions/tool-cache
const os = require("node:os");
const path = require("node:path");
const exec = require("@actions/exec");

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
			core.setFailed(
				"No assets found in the latest release. Perhaps hit the rate limit?",
			);
			return;
		}

		if (!mappedOS) {
			core.setFailed("Unsupported OS: " + os.platform());
			return;
		}

		const asset = assets.find(
			(a) => a.name.includes(mappedOS) && a.name.includes("commandline-tools"),
		);

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

		core.info("Setting up HarmonyOS SDK environment...");
		core.setOutput("sdk-path", sdkHome);
		core.exportVariable("HOS_SDK_HOME", sdkHome);
		core.exportVariable("COMMANDLINE_TOOL_DIR", sdkHome);
		core.addPath(sdkBin);

		core.exportVariable("NODE_HOME", path.join(sdkHome, "tool/node"));
		core.addPath(path.join(sdkHome, "tool/node/bin"));

		core.exportVariable(
			"HDC_HOME",
			path.join(sdkHome, "sdk/default/openharmony/toolchains"),
		);
		core.addPath(path.join(sdkHome, "sdk/default/openharmony/toolchains"));

		await exec.exec("npm", [
			"config",
			"set",
			"registry",
			"https://repo.huaweicloud.com/repository/npm/",
		]);
		await exec.exec("npm", [
			"config",
			"set",
			"@ohos:registry",
			"https://repo.harmonyos.com/npm/",
		]);

		await exec.exec("ohpm", [
			"config",
			"set",
			"registry",
			"https://ohpm.openharmony.cn/ohpm/",
		]);
		await exec.exec("ohpm", ["config", "set", "strict_ssl", "false"]);

		core.info("HarmonyOS SDK setup completed successfully.");

		const asset_arkuix = assets.find(
			(a) => a.name.includes(os.platform()) && a.name.includes("arkui-x"),
		);

		if (!asset_arkuix) {
			core.setFailed(
				`Could not find a release asset for ArkUI-X on platform: ${os.platform()}`,
			);
			return;
		}

		const url_arkuix = asset_arkuix.browser_download_url;

		core.info("Downloading ArkUI-X...");
		const arkuixPath = await tc.downloadTool(url_arkuix);

		core.info("Extracting ArkUI-X...");
		await tc.extractZip(arkuixPath, sdkHome);
		core.info("ArkUI-X extracted to " + sdkHome);

		core.info("Setting up ArkUI-X environment...");
		core.exportVariable("ARKUIX_HOME", path.join(sdkHome, "arkui-x"));
		core.addPath(path.join(sdkHome, "arkui-x/toolchains/bin"));

		await exec.exec("ace", [
			"config",
			"--arkui-x-sdk",
			path.join(sdkHome, "arkui-x"),
			"--openharmony-sdk",
			path.join(sdkHome, "sdk/default/openharmony"),
			"--harmonyos-sdk",
			sdkHome,
			"--nodejs-dir",
			path.join(sdkHome, "tool/node"),
			"--ohpm-dir",
			path.join(sdkHome, "ohpm"),
		]);

		await exec.exec("ace", ["check", "-v"]);

		core.info("ArkUI-X setup completed successfully.");
	} catch (error) {
		core.setFailed(error.message);
	}
}

module.exports = {
	run,
};
