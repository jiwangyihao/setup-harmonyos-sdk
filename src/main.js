const core = require("@actions/core");
const tc = require("@actions/tool-cache"); // 引入 @actions/tool-cache
const exec = require("@actions/exec");
const os = require("node:os");
const path = require("node:path");
const fs = require("node:fs");

// os.platform() 返回 'darwin', 'linux' 等
const osmap = {
	darwin: "mac",
	linux: "linux",
};

const sdkRoot = path.join(os.homedir(), "harmonyos-sdk");
const sdkHome = path.join(sdkRoot, "Contents", "tools");
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

		core.info("Downloading ArkUI-X SDK from " + url_arkuix + "...");
		const arkuixPath = await tc.downloadTool(url_arkuix);

		core.info("Extracting ArkUI-X SDK...");
		await tc.extractZip(arkuixPath, sdkHome);
		core.info("ArkUI-X extracted to " + sdkHome);

		const arkuiXConfigPath = path.join(sdkHome, "arkui-x", "arkui-x.json");
		if (!fs.existsSync(arkuiXConfigPath)) {
			core.setFailed(
				"ArkUI-X configuration file not found: " + arkuiXConfigPath,
			);
			return;
		}

		const arkuiXConfig = JSON.parse(fs.readFileSync(arkuiXConfigPath, "utf8"));
		if (!arkuiXConfig || !arkuiXConfig.apiVersion) {
			core.setFailed("Invalid ArkUI-X configuration file.");
			return;
		}

		core.info(`ArkUI-X API Version: ${arkuiXConfig.apiVersion}`);

		const arkuixVersionedPath = path.join(
			sdkHome,
			"arkui-x-sdk",
			arkuiXConfig.apiVersion,
			"arkui-x",
		);
		if (!fs.existsSync(arkuixVersionedPath)) {
			fs.mkdirSync(arkuixVersionedPath, { recursive: true });
		}

		const arkuixSourcePath = path.join(sdkHome, "arkui-x");
		if (fs.existsSync(arkuixSourcePath)) {
			fs.renameSync(arkuixSourcePath, arkuixVersionedPath);
		} else {
			core.setFailed("ArkUI-X source path does not exist: " + arkuixSourcePath);
			return;
		}

		// copy apkui-x-sdk/apiVersion/arkui-x to arkui-x-sdk/arkui-x
		core.info("Copying ArkUI-X SDK to target directory...");
		const arkuixTargetPath = path.join(sdkHome, "arkui-x-sdk", "arkui-x");
		if (fs.existsSync(arkuixVersionedPath)) {
			if (!fs.existsSync(arkuixTargetPath)) {
				fs.mkdirSync(arkuixTargetPath, { recursive: true });
			}
			fs.cpSync(arkuixVersionedPath, arkuixTargetPath, {
				recursive: true,
				force: true,
			});
			core.info("Copied ArkUI-X SDK to target directory.");
		} else {
			core.setFailed(
				"ArkUI-X versioned path does not exist: " + arkuixVersionedPath,
			);
			return;
		}

		// check if arkui-x-sdk/licenses exists and create it if not
		const sdkArkuixLicensesPath = path.join(sdkHome, "arkui-x-sdk", "licenses");
		if (!fs.existsSync(sdkArkuixLicensesPath)) {
			fs.mkdirSync(sdkArkuixLicensesPath, { recursive: true });
			core.info("Created licenses directory for ArkUI-X SDK.");
		}

		// check if sdkHome/sdk/licenses exists and create it if not
		const sdkLicensesPath = path.join(sdkHome, "sdk", "licenses");
		if (!fs.existsSync(sdkLicensesPath)) {
			fs.mkdirSync(sdkLicensesPath, { recursive: true });
			core.info("Created licenses directory for SDK.");
		}

		// Set up ArkUI-X environment
		core.info("Setting up ArkUI-X environment...");
		core.exportVariable(
			"ARKUIX_HOME",
			path.join(sdkHome, "arkui-x-sdk", arkuiXConfig.apiVersion, "arkui-x"),
		);
		core.addPath(
			path.join(
				sdkHome,
				"arkui-x-sdk",
				arkuiXConfig.apiVersion,
				"arkui-x/toolchains/bin",
			),
		);

		// copy sdkHome/sdk/default to sdkHome/sdk/HarmonyOS
		core.info(
			"Copying default SDK to HarmonyOS SDK directory to adapt to ACE...",
		);
		const sdkDefaultPath = path.join(sdkHome, "sdk", "default");
		const sdkHarmonyOSPath = path.join(sdkHome, "sdk", "HarmonyOS");
		if (fs.existsSync(sdkDefaultPath)) {
			if (!fs.existsSync(sdkHarmonyOSPath)) {
				fs.mkdirSync(sdkHarmonyOSPath, { recursive: true });
			}
			fs.cpSync(sdkDefaultPath, sdkHarmonyOSPath, {
				recursive: true,
				force: true,
			});
			core.info("Copied default SDK to HarmonyOS SDK directory.");
		} else {
			core.setFailed("Default SDK path does not exist: " + sdkDefaultPath);
			return;
		}

		// Check if sdkRoot/Contents/MacOS exists, if not create it. Then create sdkRoot/Contents/MacOS/devecostudio excutable
		const sdkContentsMacOSPath = path.join(sdkRoot, "Contents", "MacOS");
		if (!fs.existsSync(sdkContentsMacOSPath)) {
			fs.mkdirSync(sdkContentsMacOSPath, { recursive: true });
			core.info("Created MacOS directory in Contents.");
		}

		// Create sdkRoot/Contents/MacOS/devecoStudio executable
		const sdkDevecoStudioPath = path.join(sdkContentsMacOSPath, "devecoStudio");
		if (!fs.existsSync(sdkDevecoStudioPath)) {
			fs.writeFileSync(
				sdkDevecoStudioPath,
				"#!/bin/bash\necho 'Hello from devecoStudio'",
			);
			fs.chmodSync(sdkDevecoStudioPath, 0o755);
			core.info(
				"Created fake devecoStudio executable in MacOS for ace compatibility.",
			);
		}

		// Install dependencies
		core.info("Installing dependencies...");
		await exec.exec("brew", ["install", "libimobiledevice"]);
		await exec.exec("brew", ["install", "ios-deploy"]);
		core.info("Dependencies installed successfully.");

		core.info("Configuring ACE...");

		await exec.exec("ace", [
			"config",
			"--arkui-x-sdk",
			path.join(sdkHome, "arkui-x-sdk"),
			"--harmonyos-sdk",
			path.join(sdkHome, "sdk"),
			"--nodejs-dir",
			path.join(sdkHome, "tool/node"),
			"--ohpm-dir",
			path.join(sdkHome, "ohpm"),
			"--deveco-studio-path",
			path.join(sdkRoot),
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
