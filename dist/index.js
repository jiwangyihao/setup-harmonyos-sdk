/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 4914:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(857));
const utils_1 = __nccwpck_require__(302);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return (0, utils_1.toCommandValue)(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return (0, utils_1.toCommandValue)(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 7484:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.platform = exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = exports.markdownSummary = exports.summary = exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(4914);
const file_command_1 = __nccwpck_require__(4753);
const utils_1 = __nccwpck_require__(302);
const os = __importStar(__nccwpck_require__(857));
const path = __importStar(__nccwpck_require__(6928));
const oidc_utils_1 = __nccwpck_require__(5306);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode || (exports.ExitCode = ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = (0, utils_1.toCommandValue)(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        return (0, file_command_1.issueFileCommand)('ENV', (0, file_command_1.prepareKeyValueMessage)(name, val));
    }
    (0, command_1.issueCommand)('set-env', { name }, convertedVal);
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    (0, command_1.issueCommand)('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        (0, file_command_1.issueFileCommand)('PATH', inputPath);
    }
    else {
        (0, command_1.issueCommand)('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    if (options && options.trimWhitespace === false) {
        return inputs;
    }
    return inputs.map(input => input.trim());
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    const filePath = process.env['GITHUB_OUTPUT'] || '';
    if (filePath) {
        return (0, file_command_1.issueFileCommand)('OUTPUT', (0, file_command_1.prepareKeyValueMessage)(name, value));
    }
    process.stdout.write(os.EOL);
    (0, command_1.issueCommand)('set-output', { name }, (0, utils_1.toCommandValue)(value));
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    (0, command_1.issue)('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    (0, command_1.issueCommand)('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    (0, command_1.issueCommand)('error', (0, utils_1.toCommandProperties)(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    (0, command_1.issueCommand)('warning', (0, utils_1.toCommandProperties)(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    (0, command_1.issueCommand)('notice', (0, utils_1.toCommandProperties)(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    (0, command_1.issue)('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    (0, command_1.issue)('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    const filePath = process.env['GITHUB_STATE'] || '';
    if (filePath) {
        return (0, file_command_1.issueFileCommand)('STATE', (0, file_command_1.prepareKeyValueMessage)(name, value));
    }
    (0, command_1.issueCommand)('save-state', { name }, (0, utils_1.toCommandValue)(value));
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
function getIDToken(aud) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
}
exports.getIDToken = getIDToken;
/**
 * Summary exports
 */
var summary_1 = __nccwpck_require__(1847);
Object.defineProperty(exports, "summary", ({ enumerable: true, get: function () { return summary_1.summary; } }));
/**
 * @deprecated use core.summary
 */
var summary_2 = __nccwpck_require__(1847);
Object.defineProperty(exports, "markdownSummary", ({ enumerable: true, get: function () { return summary_2.markdownSummary; } }));
/**
 * Path exports
 */
var path_utils_1 = __nccwpck_require__(1976);
Object.defineProperty(exports, "toPosixPath", ({ enumerable: true, get: function () { return path_utils_1.toPosixPath; } }));
Object.defineProperty(exports, "toWin32Path", ({ enumerable: true, get: function () { return path_utils_1.toWin32Path; } }));
Object.defineProperty(exports, "toPlatformPath", ({ enumerable: true, get: function () { return path_utils_1.toPlatformPath; } }));
/**
 * Platform utilities exports
 */
exports.platform = __importStar(__nccwpck_require__(8968));
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 4753:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prepareKeyValueMessage = exports.issueFileCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const crypto = __importStar(__nccwpck_require__(6982));
const fs = __importStar(__nccwpck_require__(9896));
const os = __importStar(__nccwpck_require__(857));
const utils_1 = __nccwpck_require__(302);
function issueFileCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${(0, utils_1.toCommandValue)(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueFileCommand = issueFileCommand;
function prepareKeyValueMessage(key, value) {
    const delimiter = `ghadelimiter_${crypto.randomUUID()}`;
    const convertedValue = (0, utils_1.toCommandValue)(value);
    // These should realistically never happen, but just in case someone finds a
    // way to exploit uuid generation let's not allow keys or values that contain
    // the delimiter.
    if (key.includes(delimiter)) {
        throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
    }
    if (convertedValue.includes(delimiter)) {
        throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
    }
    return `${key}<<${delimiter}${os.EOL}${convertedValue}${os.EOL}${delimiter}`;
}
exports.prepareKeyValueMessage = prepareKeyValueMessage;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 5306:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcClient = void 0;
const http_client_1 = __nccwpck_require__(4844);
const auth_1 = __nccwpck_require__(4552);
const core_1 = __nccwpck_require__(7484);
class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
                .getJson(id_token_url)
                .catch(error => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
                throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
        });
    }
    static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // New ID Token is requested from action service
                let id_token_url = OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                (0, core_1.debug)(`ID token url is ${id_token_url}`);
                const id_token = yield OidcClient.getCall(id_token_url);
                (0, core_1.setSecret)(id_token);
                return id_token;
            }
            catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
exports.OidcClient = OidcClient;
//# sourceMappingURL=oidc-utils.js.map

/***/ }),

/***/ 1976:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = void 0;
const path = __importStar(__nccwpck_require__(6928));
/**
 * toPosixPath converts the given path to the posix form. On Windows, \\ will be
 * replaced with /.
 *
 * @param pth. Path to transform.
 * @return string Posix path.
 */
function toPosixPath(pth) {
    return pth.replace(/[\\]/g, '/');
}
exports.toPosixPath = toPosixPath;
/**
 * toWin32Path converts the given path to the win32 form. On Linux, / will be
 * replaced with \\.
 *
 * @param pth. Path to transform.
 * @return string Win32 path.
 */
function toWin32Path(pth) {
    return pth.replace(/[/]/g, '\\');
}
exports.toWin32Path = toWin32Path;
/**
 * toPlatformPath converts the given path to a platform-specific path. It does
 * this by replacing instances of / and \ with the platform-specific path
 * separator.
 *
 * @param pth The path to platformize.
 * @return string The platform-specific path.
 */
function toPlatformPath(pth) {
    return pth.replace(/[/\\]/g, path.sep);
}
exports.toPlatformPath = toPlatformPath;
//# sourceMappingURL=path-utils.js.map

/***/ }),

/***/ 8968:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDetails = exports.isLinux = exports.isMacOS = exports.isWindows = exports.arch = exports.platform = void 0;
const os_1 = __importDefault(__nccwpck_require__(857));
const exec = __importStar(__nccwpck_require__(5236));
const getWindowsInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const { stdout: version } = yield exec.getExecOutput('powershell -command "(Get-CimInstance -ClassName Win32_OperatingSystem).Version"', undefined, {
        silent: true
    });
    const { stdout: name } = yield exec.getExecOutput('powershell -command "(Get-CimInstance -ClassName Win32_OperatingSystem).Caption"', undefined, {
        silent: true
    });
    return {
        name: name.trim(),
        version: version.trim()
    };
});
const getMacOsInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { stdout } = yield exec.getExecOutput('sw_vers', undefined, {
        silent: true
    });
    const version = (_b = (_a = stdout.match(/ProductVersion:\s*(.+)/)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : '';
    const name = (_d = (_c = stdout.match(/ProductName:\s*(.+)/)) === null || _c === void 0 ? void 0 : _c[1]) !== null && _d !== void 0 ? _d : '';
    return {
        name,
        version
    };
});
const getLinuxInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const { stdout } = yield exec.getExecOutput('lsb_release', ['-i', '-r', '-s'], {
        silent: true
    });
    const [name, version] = stdout.trim().split('\n');
    return {
        name,
        version
    };
});
exports.platform = os_1.default.platform();
exports.arch = os_1.default.arch();
exports.isWindows = exports.platform === 'win32';
exports.isMacOS = exports.platform === 'darwin';
exports.isLinux = exports.platform === 'linux';
function getDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        return Object.assign(Object.assign({}, (yield (exports.isWindows
            ? getWindowsInfo()
            : exports.isMacOS
                ? getMacOsInfo()
                : getLinuxInfo()))), { platform: exports.platform,
            arch: exports.arch,
            isWindows: exports.isWindows,
            isMacOS: exports.isMacOS,
            isLinux: exports.isLinux });
    });
}
exports.getDetails = getDetails;
//# sourceMappingURL=platform.js.map

/***/ }),

/***/ 1847:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
const os_1 = __nccwpck_require__(857);
const fs_1 = __nccwpck_require__(9896);
const { access, appendFile, writeFile } = fs_1.promises;
exports.SUMMARY_ENV_VAR = 'GITHUB_STEP_SUMMARY';
exports.SUMMARY_DOCS_URL = 'https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary';
class Summary {
    constructor() {
        this._buffer = '';
    }
    /**
     * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
     * Also checks r/w permissions.
     *
     * @returns step summary file path
     */
    filePath() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._filePath) {
                return this._filePath;
            }
            const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
            if (!pathFromEnv) {
                throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
            }
            try {
                yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
            }
            catch (_a) {
                throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
            }
            this._filePath = pathFromEnv;
            return this._filePath;
        });
    }
    /**
     * Wraps content in an HTML tag, adding any HTML attributes
     *
     * @param {string} tag HTML tag to wrap
     * @param {string | null} content content within the tag
     * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
     *
     * @returns {string} content wrapped in HTML element
     */
    wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs)
            .map(([key, value]) => ` ${key}="${value}"`)
            .join('');
        if (!content) {
            return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
    }
    /**
     * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
     *
     * @param {SummaryWriteOptions} [options] (optional) options for write operation
     *
     * @returns {Promise<Summary>} summary instance
     */
    write(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
            const filePath = yield this.filePath();
            const writeFunc = overwrite ? writeFile : appendFile;
            yield writeFunc(filePath, this._buffer, { encoding: 'utf8' });
            return this.emptyBuffer();
        });
    }
    /**
     * Clears the summary buffer and wipes the summary file
     *
     * @returns {Summary} summary instance
     */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.emptyBuffer().write({ overwrite: true });
        });
    }
    /**
     * Returns the current summary buffer as a string
     *
     * @returns {string} string of summary buffer
     */
    stringify() {
        return this._buffer;
    }
    /**
     * If the summary buffer is empty
     *
     * @returns {boolen} true if the buffer is empty
     */
    isEmptyBuffer() {
        return this._buffer.length === 0;
    }
    /**
     * Resets the summary buffer without writing to summary file
     *
     * @returns {Summary} summary instance
     */
    emptyBuffer() {
        this._buffer = '';
        return this;
    }
    /**
     * Adds raw text to the summary buffer
     *
     * @param {string} text content to add
     * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
     *
     * @returns {Summary} summary instance
     */
    addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
    }
    /**
     * Adds the operating system-specific end-of-line marker to the buffer
     *
     * @returns {Summary} summary instance
     */
    addEOL() {
        return this.addRaw(os_1.EOL);
    }
    /**
     * Adds an HTML codeblock to the summary buffer
     *
     * @param {string} code content to render within fenced code block
     * @param {string} lang (optional) language to syntax highlight code
     *
     * @returns {Summary} summary instance
     */
    addCodeBlock(code, lang) {
        const attrs = Object.assign({}, (lang && { lang }));
        const element = this.wrap('pre', this.wrap('code', code), attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML list to the summary buffer
     *
     * @param {string[]} items list of items to render
     * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
     *
     * @returns {Summary} summary instance
     */
    addList(items, ordered = false) {
        const tag = ordered ? 'ol' : 'ul';
        const listItems = items.map(item => this.wrap('li', item)).join('');
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML table to the summary buffer
     *
     * @param {SummaryTableCell[]} rows table rows
     *
     * @returns {Summary} summary instance
     */
    addTable(rows) {
        const tableBody = rows
            .map(row => {
            const cells = row
                .map(cell => {
                if (typeof cell === 'string') {
                    return this.wrap('td', cell);
                }
                const { header, data, colspan, rowspan } = cell;
                const tag = header ? 'th' : 'td';
                const attrs = Object.assign(Object.assign({}, (colspan && { colspan })), (rowspan && { rowspan }));
                return this.wrap(tag, data, attrs);
            })
                .join('');
            return this.wrap('tr', cells);
        })
            .join('');
        const element = this.wrap('table', tableBody);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds a collapsable HTML details element to the summary buffer
     *
     * @param {string} label text for the closed state
     * @param {string} content collapsable content
     *
     * @returns {Summary} summary instance
     */
    addDetails(label, content) {
        const element = this.wrap('details', this.wrap('summary', label) + content);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML image tag to the summary buffer
     *
     * @param {string} src path to the image you to embed
     * @param {string} alt text description of the image
     * @param {SummaryImageOptions} options (optional) addition image attributes
     *
     * @returns {Summary} summary instance
     */
    addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, (width && { width })), (height && { height }));
        const element = this.wrap('img', null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML section heading element
     *
     * @param {string} text heading text
     * @param {number | string} [level=1] (optional) the heading level, default: 1
     *
     * @returns {Summary} summary instance
     */
    addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)
            ? tag
            : 'h1';
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML thematic break (<hr>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addSeparator() {
        const element = this.wrap('hr', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML line break (<br>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addBreak() {
        const element = this.wrap('br', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML blockquote to the summary buffer
     *
     * @param {string} text quote text
     * @param {string} cite (optional) citation url
     *
     * @returns {Summary} summary instance
     */
    addQuote(text, cite) {
        const attrs = Object.assign({}, (cite && { cite }));
        const element = this.wrap('blockquote', text, attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML anchor tag to the summary buffer
     *
     * @param {string} text link text/content
     * @param {string} href hyperlink
     *
     * @returns {Summary} summary instance
     */
    addLink(text, href) {
        const element = this.wrap('a', text, { href });
        return this.addRaw(element).addEOL();
    }
}
const _summary = new Summary();
/**
 * @deprecated use `core.summary`
 */
exports.markdownSummary = _summary;
exports.summary = _summary;
//# sourceMappingURL=summary.js.map

/***/ }),

/***/ 302:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
        return {};
    }
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
exports.toCommandProperties = toCommandProperties;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 5236:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getExecOutput = exports.exec = void 0;
const string_decoder_1 = __nccwpck_require__(3193);
const tr = __importStar(__nccwpck_require__(6665));
/**
 * Exec a command.
 * Output will be streamed to the live console.
 * Returns promise with return code
 *
 * @param     commandLine        command to execute (can include additional args). Must be correctly escaped.
 * @param     args               optional arguments for tool. Escaping is handled by the lib.
 * @param     options            optional exec options.  See ExecOptions
 * @returns   Promise<number>    exit code
 */
function exec(commandLine, args, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const commandArgs = tr.argStringToArray(commandLine);
        if (commandArgs.length === 0) {
            throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
        }
        // Path to tool to execute should be first arg
        const toolPath = commandArgs[0];
        args = commandArgs.slice(1).concat(args || []);
        const runner = new tr.ToolRunner(toolPath, args, options);
        return runner.exec();
    });
}
exports.exec = exec;
/**
 * Exec a command and get the output.
 * Output will be streamed to the live console.
 * Returns promise with the exit code and collected stdout and stderr
 *
 * @param     commandLine           command to execute (can include additional args). Must be correctly escaped.
 * @param     args                  optional arguments for tool. Escaping is handled by the lib.
 * @param     options               optional exec options.  See ExecOptions
 * @returns   Promise<ExecOutput>   exit code, stdout, and stderr
 */
function getExecOutput(commandLine, args, options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let stdout = '';
        let stderr = '';
        //Using string decoder covers the case where a mult-byte character is split
        const stdoutDecoder = new string_decoder_1.StringDecoder('utf8');
        const stderrDecoder = new string_decoder_1.StringDecoder('utf8');
        const originalStdoutListener = (_a = options === null || options === void 0 ? void 0 : options.listeners) === null || _a === void 0 ? void 0 : _a.stdout;
        const originalStdErrListener = (_b = options === null || options === void 0 ? void 0 : options.listeners) === null || _b === void 0 ? void 0 : _b.stderr;
        const stdErrListener = (data) => {
            stderr += stderrDecoder.write(data);
            if (originalStdErrListener) {
                originalStdErrListener(data);
            }
        };
        const stdOutListener = (data) => {
            stdout += stdoutDecoder.write(data);
            if (originalStdoutListener) {
                originalStdoutListener(data);
            }
        };
        const listeners = Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.listeners), { stdout: stdOutListener, stderr: stdErrListener });
        const exitCode = yield exec(commandLine, args, Object.assign(Object.assign({}, options), { listeners }));
        //flush any remaining characters
        stdout += stdoutDecoder.end();
        stderr += stderrDecoder.end();
        return {
            exitCode,
            stdout,
            stderr
        };
    });
}
exports.getExecOutput = getExecOutput;
//# sourceMappingURL=exec.js.map

/***/ }),

/***/ 6665:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.argStringToArray = exports.ToolRunner = void 0;
const os = __importStar(__nccwpck_require__(857));
const events = __importStar(__nccwpck_require__(4434));
const child = __importStar(__nccwpck_require__(5317));
const path = __importStar(__nccwpck_require__(6928));
const io = __importStar(__nccwpck_require__(4994));
const ioUtil = __importStar(__nccwpck_require__(5207));
const timers_1 = __nccwpck_require__(3557);
/* eslint-disable @typescript-eslint/unbound-method */
const IS_WINDOWS = process.platform === 'win32';
/*
 * Class for running command line tools. Handles quoting and arg parsing in a platform agnostic way.
 */
class ToolRunner extends events.EventEmitter {
    constructor(toolPath, args, options) {
        super();
        if (!toolPath) {
            throw new Error("Parameter 'toolPath' cannot be null or empty.");
        }
        this.toolPath = toolPath;
        this.args = args || [];
        this.options = options || {};
    }
    _debug(message) {
        if (this.options.listeners && this.options.listeners.debug) {
            this.options.listeners.debug(message);
        }
    }
    _getCommandString(options, noPrefix) {
        const toolPath = this._getSpawnFileName();
        const args = this._getSpawnArgs(options);
        let cmd = noPrefix ? '' : '[command]'; // omit prefix when piped to a second tool
        if (IS_WINDOWS) {
            // Windows + cmd file
            if (this._isCmdFile()) {
                cmd += toolPath;
                for (const a of args) {
                    cmd += ` ${a}`;
                }
            }
            // Windows + verbatim
            else if (options.windowsVerbatimArguments) {
                cmd += `"${toolPath}"`;
                for (const a of args) {
                    cmd += ` ${a}`;
                }
            }
            // Windows (regular)
            else {
                cmd += this._windowsQuoteCmdArg(toolPath);
                for (const a of args) {
                    cmd += ` ${this._windowsQuoteCmdArg(a)}`;
                }
            }
        }
        else {
            // OSX/Linux - this can likely be improved with some form of quoting.
            // creating processes on Unix is fundamentally different than Windows.
            // on Unix, execvp() takes an arg array.
            cmd += toolPath;
            for (const a of args) {
                cmd += ` ${a}`;
            }
        }
        return cmd;
    }
    _processLineBuffer(data, strBuffer, onLine) {
        try {
            let s = strBuffer + data.toString();
            let n = s.indexOf(os.EOL);
            while (n > -1) {
                const line = s.substring(0, n);
                onLine(line);
                // the rest of the string ...
                s = s.substring(n + os.EOL.length);
                n = s.indexOf(os.EOL);
            }
            return s;
        }
        catch (err) {
            // streaming lines to console is best effort.  Don't fail a build.
            this._debug(`error processing line. Failed with error ${err}`);
            return '';
        }
    }
    _getSpawnFileName() {
        if (IS_WINDOWS) {
            if (this._isCmdFile()) {
                return process.env['COMSPEC'] || 'cmd.exe';
            }
        }
        return this.toolPath;
    }
    _getSpawnArgs(options) {
        if (IS_WINDOWS) {
            if (this._isCmdFile()) {
                let argline = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
                for (const a of this.args) {
                    argline += ' ';
                    argline += options.windowsVerbatimArguments
                        ? a
                        : this._windowsQuoteCmdArg(a);
                }
                argline += '"';
                return [argline];
            }
        }
        return this.args;
    }
    _endsWith(str, end) {
        return str.endsWith(end);
    }
    _isCmdFile() {
        const upperToolPath = this.toolPath.toUpperCase();
        return (this._endsWith(upperToolPath, '.CMD') ||
            this._endsWith(upperToolPath, '.BAT'));
    }
    _windowsQuoteCmdArg(arg) {
        // for .exe, apply the normal quoting rules that libuv applies
        if (!this._isCmdFile()) {
            return this._uvQuoteCmdArg(arg);
        }
        // otherwise apply quoting rules specific to the cmd.exe command line parser.
        // the libuv rules are generic and are not designed specifically for cmd.exe
        // command line parser.
        //
        // for a detailed description of the cmd.exe command line parser, refer to
        // http://stackoverflow.com/questions/4094699/how-does-the-windows-command-interpreter-cmd-exe-parse-scripts/7970912#7970912
        // need quotes for empty arg
        if (!arg) {
            return '""';
        }
        // determine whether the arg needs to be quoted
        const cmdSpecialChars = [
            ' ',
            '\t',
            '&',
            '(',
            ')',
            '[',
            ']',
            '{',
            '}',
            '^',
            '=',
            ';',
            '!',
            "'",
            '+',
            ',',
            '`',
            '~',
            '|',
            '<',
            '>',
            '"'
        ];
        let needsQuotes = false;
        for (const char of arg) {
            if (cmdSpecialChars.some(x => x === char)) {
                needsQuotes = true;
                break;
            }
        }
        // short-circuit if quotes not needed
        if (!needsQuotes) {
            return arg;
        }
        // the following quoting rules are very similar to the rules that by libuv applies.
        //
        // 1) wrap the string in quotes
        //
        // 2) double-up quotes - i.e. " => ""
        //
        //    this is different from the libuv quoting rules. libuv replaces " with \", which unfortunately
        //    doesn't work well with a cmd.exe command line.
        //
        //    note, replacing " with "" also works well if the arg is passed to a downstream .NET console app.
        //    for example, the command line:
        //          foo.exe "myarg:""my val"""
        //    is parsed by a .NET console app into an arg array:
        //          [ "myarg:\"my val\"" ]
        //    which is the same end result when applying libuv quoting rules. although the actual
        //    command line from libuv quoting rules would look like:
        //          foo.exe "myarg:\"my val\""
        //
        // 3) double-up slashes that precede a quote,
        //    e.g.  hello \world    => "hello \world"
        //          hello\"world    => "hello\\""world"
        //          hello\\"world   => "hello\\\\""world"
        //          hello world\    => "hello world\\"
        //
        //    technically this is not required for a cmd.exe command line, or the batch argument parser.
        //    the reasons for including this as a .cmd quoting rule are:
        //
        //    a) this is optimized for the scenario where the argument is passed from the .cmd file to an
        //       external program. many programs (e.g. .NET console apps) rely on the slash-doubling rule.
        //
        //    b) it's what we've been doing previously (by deferring to node default behavior) and we
        //       haven't heard any complaints about that aspect.
        //
        // note, a weakness of the quoting rules chosen here, is that % is not escaped. in fact, % cannot be
        // escaped when used on the command line directly - even though within a .cmd file % can be escaped
        // by using %%.
        //
        // the saving grace is, on the command line, %var% is left as-is if var is not defined. this contrasts
        // the line parsing rules within a .cmd file, where if var is not defined it is replaced with nothing.
        //
        // one option that was explored was replacing % with ^% - i.e. %var% => ^%var^%. this hack would
        // often work, since it is unlikely that var^ would exist, and the ^ character is removed when the
        // variable is used. the problem, however, is that ^ is not removed when %* is used to pass the args
        // to an external program.
        //
        // an unexplored potential solution for the % escaping problem, is to create a wrapper .cmd file.
        // % can be escaped within a .cmd file.
        let reverse = '"';
        let quoteHit = true;
        for (let i = arg.length; i > 0; i--) {
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === '\\') {
                reverse += '\\'; // double the slash
            }
            else if (arg[i - 1] === '"') {
                quoteHit = true;
                reverse += '"'; // double the quote
            }
            else {
                quoteHit = false;
            }
        }
        reverse += '"';
        return reverse
            .split('')
            .reverse()
            .join('');
    }
    _uvQuoteCmdArg(arg) {
        // Tool runner wraps child_process.spawn() and needs to apply the same quoting as
        // Node in certain cases where the undocumented spawn option windowsVerbatimArguments
        // is used.
        //
        // Since this function is a port of quote_cmd_arg from Node 4.x (technically, lib UV,
        // see https://github.com/nodejs/node/blob/v4.x/deps/uv/src/win/process.c for details),
        // pasting copyright notice from Node within this function:
        //
        //      Copyright Joyent, Inc. and other Node contributors. All rights reserved.
        //
        //      Permission is hereby granted, free of charge, to any person obtaining a copy
        //      of this software and associated documentation files (the "Software"), to
        //      deal in the Software without restriction, including without limitation the
        //      rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
        //      sell copies of the Software, and to permit persons to whom the Software is
        //      furnished to do so, subject to the following conditions:
        //
        //      The above copyright notice and this permission notice shall be included in
        //      all copies or substantial portions of the Software.
        //
        //      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        //      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        //      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        //      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        //      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
        //      FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
        //      IN THE SOFTWARE.
        if (!arg) {
            // Need double quotation for empty argument
            return '""';
        }
        if (!arg.includes(' ') && !arg.includes('\t') && !arg.includes('"')) {
            // No quotation needed
            return arg;
        }
        if (!arg.includes('"') && !arg.includes('\\')) {
            // No embedded double quotes or backslashes, so I can just wrap
            // quote marks around the whole thing.
            return `"${arg}"`;
        }
        // Expected input/output:
        //   input : hello"world
        //   output: "hello\"world"
        //   input : hello""world
        //   output: "hello\"\"world"
        //   input : hello\world
        //   output: hello\world
        //   input : hello\\world
        //   output: hello\\world
        //   input : hello\"world
        //   output: "hello\\\"world"
        //   input : hello\\"world
        //   output: "hello\\\\\"world"
        //   input : hello world\
        //   output: "hello world\\" - note the comment in libuv actually reads "hello world\"
        //                             but it appears the comment is wrong, it should be "hello world\\"
        let reverse = '"';
        let quoteHit = true;
        for (let i = arg.length; i > 0; i--) {
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === '\\') {
                reverse += '\\';
            }
            else if (arg[i - 1] === '"') {
                quoteHit = true;
                reverse += '\\';
            }
            else {
                quoteHit = false;
            }
        }
        reverse += '"';
        return reverse
            .split('')
            .reverse()
            .join('');
    }
    _cloneExecOptions(options) {
        options = options || {};
        const result = {
            cwd: options.cwd || process.cwd(),
            env: options.env || process.env,
            silent: options.silent || false,
            windowsVerbatimArguments: options.windowsVerbatimArguments || false,
            failOnStdErr: options.failOnStdErr || false,
            ignoreReturnCode: options.ignoreReturnCode || false,
            delay: options.delay || 10000
        };
        result.outStream = options.outStream || process.stdout;
        result.errStream = options.errStream || process.stderr;
        return result;
    }
    _getSpawnOptions(options, toolPath) {
        options = options || {};
        const result = {};
        result.cwd = options.cwd;
        result.env = options.env;
        result['windowsVerbatimArguments'] =
            options.windowsVerbatimArguments || this._isCmdFile();
        if (options.windowsVerbatimArguments) {
            result.argv0 = `"${toolPath}"`;
        }
        return result;
    }
    /**
     * Exec a tool.
     * Output will be streamed to the live console.
     * Returns promise with return code
     *
     * @param     tool     path to tool to exec
     * @param     options  optional exec options.  See ExecOptions
     * @returns   number
     */
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            // root the tool path if it is unrooted and contains relative pathing
            if (!ioUtil.isRooted(this.toolPath) &&
                (this.toolPath.includes('/') ||
                    (IS_WINDOWS && this.toolPath.includes('\\')))) {
                // prefer options.cwd if it is specified, however options.cwd may also need to be rooted
                this.toolPath = path.resolve(process.cwd(), this.options.cwd || process.cwd(), this.toolPath);
            }
            // if the tool is only a file name, then resolve it from the PATH
            // otherwise verify it exists (add extension on Windows if necessary)
            this.toolPath = yield io.which(this.toolPath, true);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this._debug(`exec tool: ${this.toolPath}`);
                this._debug('arguments:');
                for (const arg of this.args) {
                    this._debug(`   ${arg}`);
                }
                const optionsNonNull = this._cloneExecOptions(this.options);
                if (!optionsNonNull.silent && optionsNonNull.outStream) {
                    optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + os.EOL);
                }
                const state = new ExecState(optionsNonNull, this.toolPath);
                state.on('debug', (message) => {
                    this._debug(message);
                });
                if (this.options.cwd && !(yield ioUtil.exists(this.options.cwd))) {
                    return reject(new Error(`The cwd: ${this.options.cwd} does not exist!`));
                }
                const fileName = this._getSpawnFileName();
                const cp = child.spawn(fileName, this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(this.options, fileName));
                let stdbuffer = '';
                if (cp.stdout) {
                    cp.stdout.on('data', (data) => {
                        if (this.options.listeners && this.options.listeners.stdout) {
                            this.options.listeners.stdout(data);
                        }
                        if (!optionsNonNull.silent && optionsNonNull.outStream) {
                            optionsNonNull.outStream.write(data);
                        }
                        stdbuffer = this._processLineBuffer(data, stdbuffer, (line) => {
                            if (this.options.listeners && this.options.listeners.stdline) {
                                this.options.listeners.stdline(line);
                            }
                        });
                    });
                }
                let errbuffer = '';
                if (cp.stderr) {
                    cp.stderr.on('data', (data) => {
                        state.processStderr = true;
                        if (this.options.listeners && this.options.listeners.stderr) {
                            this.options.listeners.stderr(data);
                        }
                        if (!optionsNonNull.silent &&
                            optionsNonNull.errStream &&
                            optionsNonNull.outStream) {
                            const s = optionsNonNull.failOnStdErr
                                ? optionsNonNull.errStream
                                : optionsNonNull.outStream;
                            s.write(data);
                        }
                        errbuffer = this._processLineBuffer(data, errbuffer, (line) => {
                            if (this.options.listeners && this.options.listeners.errline) {
                                this.options.listeners.errline(line);
                            }
                        });
                    });
                }
                cp.on('error', (err) => {
                    state.processError = err.message;
                    state.processExited = true;
                    state.processClosed = true;
                    state.CheckComplete();
                });
                cp.on('exit', (code) => {
                    state.processExitCode = code;
                    state.processExited = true;
                    this._debug(`Exit code ${code} received from tool '${this.toolPath}'`);
                    state.CheckComplete();
                });
                cp.on('close', (code) => {
                    state.processExitCode = code;
                    state.processExited = true;
                    state.processClosed = true;
                    this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);
                    state.CheckComplete();
                });
                state.on('done', (error, exitCode) => {
                    if (stdbuffer.length > 0) {
                        this.emit('stdline', stdbuffer);
                    }
                    if (errbuffer.length > 0) {
                        this.emit('errline', errbuffer);
                    }
                    cp.removeAllListeners();
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(exitCode);
                    }
                });
                if (this.options.input) {
                    if (!cp.stdin) {
                        throw new Error('child process missing stdin');
                    }
                    cp.stdin.end(this.options.input);
                }
            }));
        });
    }
}
exports.ToolRunner = ToolRunner;
/**
 * Convert an arg string to an array of args. Handles escaping
 *
 * @param    argString   string of arguments
 * @returns  string[]    array of arguments
 */
function argStringToArray(argString) {
    const args = [];
    let inQuotes = false;
    let escaped = false;
    let arg = '';
    function append(c) {
        // we only escape double quotes.
        if (escaped && c !== '"') {
            arg += '\\';
        }
        arg += c;
        escaped = false;
    }
    for (let i = 0; i < argString.length; i++) {
        const c = argString.charAt(i);
        if (c === '"') {
            if (!escaped) {
                inQuotes = !inQuotes;
            }
            else {
                append(c);
            }
            continue;
        }
        if (c === '\\' && escaped) {
            append(c);
            continue;
        }
        if (c === '\\' && inQuotes) {
            escaped = true;
            continue;
        }
        if (c === ' ' && !inQuotes) {
            if (arg.length > 0) {
                args.push(arg);
                arg = '';
            }
            continue;
        }
        append(c);
    }
    if (arg.length > 0) {
        args.push(arg.trim());
    }
    return args;
}
exports.argStringToArray = argStringToArray;
class ExecState extends events.EventEmitter {
    constructor(options, toolPath) {
        super();
        this.processClosed = false; // tracks whether the process has exited and stdio is closed
        this.processError = '';
        this.processExitCode = 0;
        this.processExited = false; // tracks whether the process has exited
        this.processStderr = false; // tracks whether stderr was written to
        this.delay = 10000; // 10 seconds
        this.done = false;
        this.timeout = null;
        if (!toolPath) {
            throw new Error('toolPath must not be empty');
        }
        this.options = options;
        this.toolPath = toolPath;
        if (options.delay) {
            this.delay = options.delay;
        }
    }
    CheckComplete() {
        if (this.done) {
            return;
        }
        if (this.processClosed) {
            this._setResult();
        }
        else if (this.processExited) {
            this.timeout = timers_1.setTimeout(ExecState.HandleTimeout, this.delay, this);
        }
    }
    _debug(message) {
        this.emit('debug', message);
    }
    _setResult() {
        // determine whether there is an error
        let error;
        if (this.processExited) {
            if (this.processError) {
                error = new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`);
            }
            else if (this.processExitCode !== 0 && !this.options.ignoreReturnCode) {
                error = new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`);
            }
            else if (this.processStderr && this.options.failOnStdErr) {
                error = new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`);
            }
        }
        // clear the timeout
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.done = true;
        this.emit('done', error, this.processExitCode);
    }
    static HandleTimeout(state) {
        if (state.done) {
            return;
        }
        if (!state.processClosed && state.processExited) {
            const message = `The STDIO streams did not close within ${state.delay /
                1000} seconds of the exit event from process '${state.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
            state._debug(message);
        }
        state._setResult();
    }
}
//# sourceMappingURL=toolrunner.js.map

/***/ }),

/***/ 4552:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonalAccessTokenCredentialHandler = exports.BearerCredentialHandler = exports.BasicCredentialHandler = void 0;
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Bearer ${this.token}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`PAT:${this.token}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 4844:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
const http = __importStar(__nccwpck_require__(8611));
const https = __importStar(__nccwpck_require__(5692));
const pm = __importStar(__nccwpck_require__(4988));
const tunnel = __importStar(__nccwpck_require__(770));
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let output = Buffer.alloc(0);
                this.message.on('data', (chunk) => {
                    output = Buffer.concat([output, chunk]);
                });
                this.message.on('end', () => {
                    resolve(output.toString());
                });
            }));
        });
    }
    readBodyBuffer() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const chunks = [];
                this.message.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                this.message.on('end', () => {
                    resolve(Buffer.concat(chunks));
                });
            }));
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    const parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
        });
    }
    get(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('GET', requestUrl, null, additionalHeaders || {});
        });
    }
    del(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('DELETE', requestUrl, null, additionalHeaders || {});
        });
    }
    post(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('POST', requestUrl, data, additionalHeaders || {});
        });
    }
    patch(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PATCH', requestUrl, data, additionalHeaders || {});
        });
    }
    put(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PUT', requestUrl, data, additionalHeaders || {});
        });
    }
    head(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('HEAD', requestUrl, null, additionalHeaders || {});
        });
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(verb, requestUrl, stream, additionalHeaders);
        });
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    getJson(requestUrl, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            const res = yield this.get(requestUrl, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    postJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.post(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    putJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.put(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    patchJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.patch(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._disposed) {
                throw new Error('Client has already been disposed.');
            }
            const parsedUrl = new URL(requestUrl);
            let info = this._prepareRequest(verb, parsedUrl, headers);
            // Only perform retries on reads since writes may not be idempotent.
            const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb)
                ? this._maxRetries + 1
                : 1;
            let numTries = 0;
            let response;
            do {
                response = yield this.requestRaw(info, data);
                // Check if it's an authentication challenge
                if (response &&
                    response.message &&
                    response.message.statusCode === HttpCodes.Unauthorized) {
                    let authenticationHandler;
                    for (const handler of this.handlers) {
                        if (handler.canHandleAuthentication(response)) {
                            authenticationHandler = handler;
                            break;
                        }
                    }
                    if (authenticationHandler) {
                        return authenticationHandler.handleAuthentication(this, info, data);
                    }
                    else {
                        // We have received an unauthorized response but have no handlers to handle it.
                        // Let the response return to the caller.
                        return response;
                    }
                }
                let redirectsRemaining = this._maxRedirects;
                while (response.message.statusCode &&
                    HttpRedirectCodes.includes(response.message.statusCode) &&
                    this._allowRedirects &&
                    redirectsRemaining > 0) {
                    const redirectUrl = response.message.headers['location'];
                    if (!redirectUrl) {
                        // if there's no location to redirect to, we won't
                        break;
                    }
                    const parsedRedirectUrl = new URL(redirectUrl);
                    if (parsedUrl.protocol === 'https:' &&
                        parsedUrl.protocol !== parsedRedirectUrl.protocol &&
                        !this._allowRedirectDowngrade) {
                        throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                    }
                    // we need to finish reading the response before reassigning response
                    // which will leak the open socket.
                    yield response.readBody();
                    // strip authorization header if redirected to a different hostname
                    if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                        for (const header in headers) {
                            // header names are case insensitive
                            if (header.toLowerCase() === 'authorization') {
                                delete headers[header];
                            }
                        }
                    }
                    // let's make the request with the new redirectUrl
                    info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                    response = yield this.requestRaw(info, data);
                    redirectsRemaining--;
                }
                if (!response.message.statusCode ||
                    !HttpResponseRetryCodes.includes(response.message.statusCode)) {
                    // If not a retry code, return immediately instead of retrying
                    return response;
                }
                numTries += 1;
                if (numTries < maxTries) {
                    yield response.readBody();
                    yield this._performExponentialBackoff(numTries);
                }
            } while (numTries < maxTries);
            return response;
        });
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                function callbackForResult(err, res) {
                    if (err) {
                        reject(err);
                    }
                    else if (!res) {
                        // If `err` is not passed, then `res` must be passed.
                        reject(new Error('Unknown error'));
                    }
                    else {
                        resolve(res);
                    }
                }
                this.requestRawWithCallback(info, data, callbackForResult);
            });
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        if (typeof data === 'string') {
            if (!info.options.headers) {
                info.options.headers = {};
            }
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        function handleResult(err, res) {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        }
        const req = info.httpModule.request(info.options, (msg) => {
            const res = new HttpClientResponse(msg);
            handleResult(undefined, res);
        });
        let socket;
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error(`Request timeout: ${info.options.path}`));
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        const parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            for (const handler of this.handlers) {
                handler.prepareRequest(info.options);
            }
        }
        return info;
    }
    _mergeHeaders(headers) {
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers || {}));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        const proxyUrl = pm.getProxyUrl(parsedUrl);
        const useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        // This is `useProxy` again, but we need to check `proxyURl` directly for TypeScripts's flow analysis.
        if (proxyUrl && proxyUrl.hostname) {
            const agentOptions = {
                maxSockets,
                keepAlive: this._keepAlive,
                proxy: Object.assign(Object.assign({}, ((proxyUrl.username || proxyUrl.password) && {
                    proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                })), { host: proxyUrl.hostname, port: proxyUrl.port })
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
            const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
            return new Promise(resolve => setTimeout(() => resolve(), ms));
        });
    }
    _processResponse(res, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const statusCode = res.message.statusCode || 0;
                const response = {
                    statusCode,
                    result: null,
                    headers: {}
                };
                // not found leads to null obj returned
                if (statusCode === HttpCodes.NotFound) {
                    resolve(response);
                }
                // get the result from the body
                function dateTimeDeserializer(key, value) {
                    if (typeof value === 'string') {
                        const a = new Date(value);
                        if (!isNaN(a.valueOf())) {
                            return a;
                        }
                    }
                    return value;
                }
                let obj;
                let contents;
                try {
                    contents = yield res.readBody();
                    if (contents && contents.length > 0) {
                        if (options && options.deserializeDates) {
                            obj = JSON.parse(contents, dateTimeDeserializer);
                        }
                        else {
                            obj = JSON.parse(contents);
                        }
                        response.result = obj;
                    }
                    response.headers = res.message.headers;
                }
                catch (err) {
                    // Invalid resource (contents not json);  leaving result obj null
                }
                // note that 3xx redirects are handled by the http layer.
                if (statusCode > 299) {
                    let msg;
                    // if exception/error in body, attempt to get better error
                    if (obj && obj.message) {
                        msg = obj.message;
                    }
                    else if (contents && contents.length > 0) {
                        // it may be the case that the exception is in the body message as string
                        msg = contents;
                    }
                    else {
                        msg = `Failed request: (${statusCode})`;
                    }
                    const err = new HttpClientError(msg, statusCode);
                    err.result = response.result;
                    reject(err);
                }
                else {
                    resolve(response);
                }
            }));
        });
    }
}
exports.HttpClient = HttpClient;
const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 4988:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkBypass = exports.getProxyUrl = void 0;
function getProxyUrl(reqUrl) {
    const usingSsl = reqUrl.protocol === 'https:';
    if (checkBypass(reqUrl)) {
        return undefined;
    }
    const proxyVar = (() => {
        if (usingSsl) {
            return process.env['https_proxy'] || process.env['HTTPS_PROXY'];
        }
        else {
            return process.env['http_proxy'] || process.env['HTTP_PROXY'];
        }
    })();
    if (proxyVar) {
        try {
            return new URL(proxyVar);
        }
        catch (_a) {
            if (!proxyVar.startsWith('http://') && !proxyVar.startsWith('https://'))
                return new URL(`http://${proxyVar}`);
        }
    }
    else {
        return undefined;
    }
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    const reqHost = reqUrl.hostname;
    if (isLoopbackAddress(reqHost)) {
        return true;
    }
    const noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    const upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (const upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperNoProxyItem === '*' ||
            upperReqHosts.some(x => x === upperNoProxyItem ||
                x.endsWith(`.${upperNoProxyItem}`) ||
                (upperNoProxyItem.startsWith('.') &&
                    x.endsWith(`${upperNoProxyItem}`)))) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;
function isLoopbackAddress(host) {
    const hostLower = host.toLowerCase();
    return (hostLower === 'localhost' ||
        hostLower.startsWith('127.') ||
        hostLower.startsWith('[::1]') ||
        hostLower.startsWith('[0:0:0:0:0:0:0:1]'));
}
//# sourceMappingURL=proxy.js.map

/***/ }),

/***/ 5207:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCmdPath = exports.tryGetExecutablePath = exports.isRooted = exports.isDirectory = exports.exists = exports.READONLY = exports.UV_FS_O_EXLOCK = exports.IS_WINDOWS = exports.unlink = exports.symlink = exports.stat = exports.rmdir = exports.rm = exports.rename = exports.readlink = exports.readdir = exports.open = exports.mkdir = exports.lstat = exports.copyFile = exports.chmod = void 0;
const fs = __importStar(__nccwpck_require__(9896));
const path = __importStar(__nccwpck_require__(6928));
_a = fs.promises
// export const {open} = 'fs'
, exports.chmod = _a.chmod, exports.copyFile = _a.copyFile, exports.lstat = _a.lstat, exports.mkdir = _a.mkdir, exports.open = _a.open, exports.readdir = _a.readdir, exports.readlink = _a.readlink, exports.rename = _a.rename, exports.rm = _a.rm, exports.rmdir = _a.rmdir, exports.stat = _a.stat, exports.symlink = _a.symlink, exports.unlink = _a.unlink;
// export const {open} = 'fs'
exports.IS_WINDOWS = process.platform === 'win32';
// See https://github.com/nodejs/node/blob/d0153aee367422d0858105abec186da4dff0a0c5/deps/uv/include/uv/win.h#L691
exports.UV_FS_O_EXLOCK = 0x10000000;
exports.READONLY = fs.constants.O_RDONLY;
function exists(fsPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.stat(fsPath);
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                return false;
            }
            throw err;
        }
        return true;
    });
}
exports.exists = exists;
function isDirectory(fsPath, useStat = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const stats = useStat ? yield exports.stat(fsPath) : yield exports.lstat(fsPath);
        return stats.isDirectory();
    });
}
exports.isDirectory = isDirectory;
/**
 * On OSX/Linux, true if path starts with '/'. On Windows, true for paths like:
 * \, \hello, \\hello\share, C:, and C:\hello (and corresponding alternate separator cases).
 */
function isRooted(p) {
    p = normalizeSeparators(p);
    if (!p) {
        throw new Error('isRooted() parameter "p" cannot be empty');
    }
    if (exports.IS_WINDOWS) {
        return (p.startsWith('\\') || /^[A-Z]:/i.test(p) // e.g. \ or \hello or \\hello
        ); // e.g. C: or C:\hello
    }
    return p.startsWith('/');
}
exports.isRooted = isRooted;
/**
 * Best effort attempt to determine whether a file exists and is executable.
 * @param filePath    file path to check
 * @param extensions  additional file extensions to try
 * @return if file exists and is executable, returns the file path. otherwise empty string.
 */
function tryGetExecutablePath(filePath, extensions) {
    return __awaiter(this, void 0, void 0, function* () {
        let stats = undefined;
        try {
            // test file exists
            stats = yield exports.stat(filePath);
        }
        catch (err) {
            if (err.code !== 'ENOENT') {
                // eslint-disable-next-line no-console
                console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
            }
        }
        if (stats && stats.isFile()) {
            if (exports.IS_WINDOWS) {
                // on Windows, test for valid extension
                const upperExt = path.extname(filePath).toUpperCase();
                if (extensions.some(validExt => validExt.toUpperCase() === upperExt)) {
                    return filePath;
                }
            }
            else {
                if (isUnixExecutable(stats)) {
                    return filePath;
                }
            }
        }
        // try each extension
        const originalFilePath = filePath;
        for (const extension of extensions) {
            filePath = originalFilePath + extension;
            stats = undefined;
            try {
                stats = yield exports.stat(filePath);
            }
            catch (err) {
                if (err.code !== 'ENOENT') {
                    // eslint-disable-next-line no-console
                    console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
                }
            }
            if (stats && stats.isFile()) {
                if (exports.IS_WINDOWS) {
                    // preserve the case of the actual file (since an extension was appended)
                    try {
                        const directory = path.dirname(filePath);
                        const upperName = path.basename(filePath).toUpperCase();
                        for (const actualName of yield exports.readdir(directory)) {
                            if (upperName === actualName.toUpperCase()) {
                                filePath = path.join(directory, actualName);
                                break;
                            }
                        }
                    }
                    catch (err) {
                        // eslint-disable-next-line no-console
                        console.log(`Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`);
                    }
                    return filePath;
                }
                else {
                    if (isUnixExecutable(stats)) {
                        return filePath;
                    }
                }
            }
        }
        return '';
    });
}
exports.tryGetExecutablePath = tryGetExecutablePath;
function normalizeSeparators(p) {
    p = p || '';
    if (exports.IS_WINDOWS) {
        // convert slashes on Windows
        p = p.replace(/\//g, '\\');
        // remove redundant slashes
        return p.replace(/\\\\+/g, '\\');
    }
    // remove redundant slashes
    return p.replace(/\/\/+/g, '/');
}
// on Mac/Linux, test the execute bit
//     R   W  X  R  W X R W X
//   256 128 64 32 16 8 4 2 1
function isUnixExecutable(stats) {
    return ((stats.mode & 1) > 0 ||
        ((stats.mode & 8) > 0 && stats.gid === process.getgid()) ||
        ((stats.mode & 64) > 0 && stats.uid === process.getuid()));
}
// Get the path of cmd.exe in windows
function getCmdPath() {
    var _a;
    return (_a = process.env['COMSPEC']) !== null && _a !== void 0 ? _a : `cmd.exe`;
}
exports.getCmdPath = getCmdPath;
//# sourceMappingURL=io-util.js.map

/***/ }),

/***/ 4994:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.findInPath = exports.which = exports.mkdirP = exports.rmRF = exports.mv = exports.cp = void 0;
const assert_1 = __nccwpck_require__(2613);
const path = __importStar(__nccwpck_require__(6928));
const ioUtil = __importStar(__nccwpck_require__(5207));
/**
 * Copies a file or folder.
 * Based off of shelljs - https://github.com/shelljs/shelljs/blob/9237f66c52e5daa40458f94f9565e18e8132f5a6/src/cp.js
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See CopyOptions.
 */
function cp(source, dest, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const { force, recursive, copySourceDirectory } = readCopyOptions(options);
        const destStat = (yield ioUtil.exists(dest)) ? yield ioUtil.stat(dest) : null;
        // Dest is an existing file, but not forcing
        if (destStat && destStat.isFile() && !force) {
            return;
        }
        // If dest is an existing directory, should copy inside.
        const newDest = destStat && destStat.isDirectory() && copySourceDirectory
            ? path.join(dest, path.basename(source))
            : dest;
        if (!(yield ioUtil.exists(source))) {
            throw new Error(`no such file or directory: ${source}`);
        }
        const sourceStat = yield ioUtil.stat(source);
        if (sourceStat.isDirectory()) {
            if (!recursive) {
                throw new Error(`Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`);
            }
            else {
                yield cpDirRecursive(source, newDest, 0, force);
            }
        }
        else {
            if (path.relative(source, newDest) === '') {
                // a file cannot be copied to itself
                throw new Error(`'${newDest}' and '${source}' are the same file`);
            }
            yield copyFile(source, newDest, force);
        }
    });
}
exports.cp = cp;
/**
 * Moves a path.
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See MoveOptions.
 */
function mv(source, dest, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield ioUtil.exists(dest)) {
            let destExists = true;
            if (yield ioUtil.isDirectory(dest)) {
                // If dest is directory copy src into dest
                dest = path.join(dest, path.basename(source));
                destExists = yield ioUtil.exists(dest);
            }
            if (destExists) {
                if (options.force == null || options.force) {
                    yield rmRF(dest);
                }
                else {
                    throw new Error('Destination already exists');
                }
            }
        }
        yield mkdirP(path.dirname(dest));
        yield ioUtil.rename(source, dest);
    });
}
exports.mv = mv;
/**
 * Remove a path recursively with force
 *
 * @param inputPath path to remove
 */
function rmRF(inputPath) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ioUtil.IS_WINDOWS) {
            // Check for invalid characters
            // https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file
            if (/[*"<>|]/.test(inputPath)) {
                throw new Error('File path must not contain `*`, `"`, `<`, `>` or `|` on Windows');
            }
        }
        try {
            // note if path does not exist, error is silent
            yield ioUtil.rm(inputPath, {
                force: true,
                maxRetries: 3,
                recursive: true,
                retryDelay: 300
            });
        }
        catch (err) {
            throw new Error(`File was unable to be removed ${err}`);
        }
    });
}
exports.rmRF = rmRF;
/**
 * Make a directory.  Creates the full path with folders in between
 * Will throw if it fails
 *
 * @param   fsPath        path to create
 * @returns Promise<void>
 */
function mkdirP(fsPath) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.ok(fsPath, 'a path argument must be provided');
        yield ioUtil.mkdir(fsPath, { recursive: true });
    });
}
exports.mkdirP = mkdirP;
/**
 * Returns path of a tool had the tool actually been invoked.  Resolves via paths.
 * If you check and the tool does not exist, it will throw.
 *
 * @param     tool              name of the tool
 * @param     check             whether to check if tool exists
 * @returns   Promise<string>   path to tool
 */
function which(tool, check) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!tool) {
            throw new Error("parameter 'tool' is required");
        }
        // recursive when check=true
        if (check) {
            const result = yield which(tool, false);
            if (!result) {
                if (ioUtil.IS_WINDOWS) {
                    throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`);
                }
                else {
                    throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);
                }
            }
            return result;
        }
        const matches = yield findInPath(tool);
        if (matches && matches.length > 0) {
            return matches[0];
        }
        return '';
    });
}
exports.which = which;
/**
 * Returns a list of all occurrences of the given tool on the system path.
 *
 * @returns   Promise<string[]>  the paths of the tool
 */
function findInPath(tool) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!tool) {
            throw new Error("parameter 'tool' is required");
        }
        // build the list of extensions to try
        const extensions = [];
        if (ioUtil.IS_WINDOWS && process.env['PATHEXT']) {
            for (const extension of process.env['PATHEXT'].split(path.delimiter)) {
                if (extension) {
                    extensions.push(extension);
                }
            }
        }
        // if it's rooted, return it if exists. otherwise return empty.
        if (ioUtil.isRooted(tool)) {
            const filePath = yield ioUtil.tryGetExecutablePath(tool, extensions);
            if (filePath) {
                return [filePath];
            }
            return [];
        }
        // if any path separators, return empty
        if (tool.includes(path.sep)) {
            return [];
        }
        // build the list of directories
        //
        // Note, technically "where" checks the current directory on Windows. From a toolkit perspective,
        // it feels like we should not do this. Checking the current directory seems like more of a use
        // case of a shell, and the which() function exposed by the toolkit should strive for consistency
        // across platforms.
        const directories = [];
        if (process.env.PATH) {
            for (const p of process.env.PATH.split(path.delimiter)) {
                if (p) {
                    directories.push(p);
                }
            }
        }
        // find all matches
        const matches = [];
        for (const directory of directories) {
            const filePath = yield ioUtil.tryGetExecutablePath(path.join(directory, tool), extensions);
            if (filePath) {
                matches.push(filePath);
            }
        }
        return matches;
    });
}
exports.findInPath = findInPath;
function readCopyOptions(options) {
    const force = options.force == null ? true : options.force;
    const recursive = Boolean(options.recursive);
    const copySourceDirectory = options.copySourceDirectory == null
        ? true
        : Boolean(options.copySourceDirectory);
    return { force, recursive, copySourceDirectory };
}
function cpDirRecursive(sourceDir, destDir, currentDepth, force) {
    return __awaiter(this, void 0, void 0, function* () {
        // Ensure there is not a run away recursive copy
        if (currentDepth >= 255)
            return;
        currentDepth++;
        yield mkdirP(destDir);
        const files = yield ioUtil.readdir(sourceDir);
        for (const fileName of files) {
            const srcFile = `${sourceDir}/${fileName}`;
            const destFile = `${destDir}/${fileName}`;
            const srcFileStat = yield ioUtil.lstat(srcFile);
            if (srcFileStat.isDirectory()) {
                // Recurse
                yield cpDirRecursive(srcFile, destFile, currentDepth, force);
            }
            else {
                yield copyFile(srcFile, destFile, force);
            }
        }
        // Change the mode for the newly created directory
        yield ioUtil.chmod(destDir, (yield ioUtil.stat(sourceDir)).mode);
    });
}
// Buffered file copy
function copyFile(srcFile, destFile, force) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((yield ioUtil.lstat(srcFile)).isSymbolicLink()) {
            // unlink/re-link it
            try {
                yield ioUtil.lstat(destFile);
                yield ioUtil.unlink(destFile);
            }
            catch (e) {
                // Try to override file permission
                if (e.code === 'EPERM') {
                    yield ioUtil.chmod(destFile, '0666');
                    yield ioUtil.unlink(destFile);
                }
                // other errors = it doesn't exist, no work to do
            }
            // Copy over symlink
            const symlinkFull = yield ioUtil.readlink(srcFile);
            yield ioUtil.symlink(symlinkFull, destFile, ioUtil.IS_WINDOWS ? 'junction' : null);
        }
        else if (!(yield ioUtil.exists(destFile)) || force) {
            yield ioUtil.copyFile(srcFile, destFile);
        }
    });
}
//# sourceMappingURL=io.js.map

/***/ }),

/***/ 1316:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Utils = __nccwpck_require__(5391);
const pth = __nccwpck_require__(6928);
const ZipEntry = __nccwpck_require__(2609);
const ZipFile = __nccwpck_require__(6991);

const get_Bool = (...val) => Utils.findLast(val, (c) => typeof c === "boolean");
const get_Str = (...val) => Utils.findLast(val, (c) => typeof c === "string");
const get_Fun = (...val) => Utils.findLast(val, (c) => typeof c === "function");

const defaultOptions = {
    // option "noSort" : if true it disables files sorting
    noSort: false,
    // read entries during load (initial loading may be slower)
    readEntries: false,
    // default method is none
    method: Utils.Constants.NONE,
    // file system
    fs: null
};

module.exports = function (/**String*/ input, /** object */ options) {
    let inBuffer = null;

    // create object based default options, allowing them to be overwritten
    const opts = Object.assign(Object.create(null), defaultOptions);

    // test input variable
    if (input && "object" === typeof input) {
        // if value is not buffer we accept it to be object with options
        if (!(input instanceof Uint8Array)) {
            Object.assign(opts, input);
            input = opts.input ? opts.input : undefined;
            if (opts.input) delete opts.input;
        }

        // if input is buffer
        if (Buffer.isBuffer(input)) {
            inBuffer = input;
            opts.method = Utils.Constants.BUFFER;
            input = undefined;
        }
    }

    // assign options
    Object.assign(opts, options);

    // instanciate utils filesystem
    const filetools = new Utils(opts);

    if (typeof opts.decoder !== "object" || typeof opts.decoder.encode !== "function" || typeof opts.decoder.decode !== "function") {
        opts.decoder = Utils.decoder;
    }

    // if input is file name we retrieve its content
    if (input && "string" === typeof input) {
        // load zip file
        if (filetools.fs.existsSync(input)) {
            opts.method = Utils.Constants.FILE;
            opts.filename = input;
            inBuffer = filetools.fs.readFileSync(input);
        } else {
            throw Utils.Errors.INVALID_FILENAME();
        }
    }

    // create variable
    const _zip = new ZipFile(inBuffer, opts);

    const { canonical, sanitize, zipnamefix } = Utils;

    function getEntry(/**Object*/ entry) {
        if (entry && _zip) {
            var item;
            // If entry was given as a file name
            if (typeof entry === "string") item = _zip.getEntry(pth.posix.normalize(entry));
            // if entry was given as a ZipEntry object
            if (typeof entry === "object" && typeof entry.entryName !== "undefined" && typeof entry.header !== "undefined") item = _zip.getEntry(entry.entryName);

            if (item) {
                return item;
            }
        }
        return null;
    }

    function fixPath(zipPath) {
        const { join, normalize, sep } = pth.posix;
        // convert windows file separators and normalize
        return join(".", normalize(sep + zipPath.split("\\").join(sep) + sep));
    }

    function filenameFilter(filterfn) {
        if (filterfn instanceof RegExp) {
            // if filter is RegExp wrap it
            return (function (rx) {
                return function (filename) {
                    return rx.test(filename);
                };
            })(filterfn);
        } else if ("function" !== typeof filterfn) {
            // if filter is not function we will replace it
            return () => true;
        }
        return filterfn;
    }

    // keep last character on folders
    const relativePath = (local, entry) => {
        let lastChar = entry.slice(-1);
        lastChar = lastChar === filetools.sep ? filetools.sep : "";
        return pth.relative(local, entry) + lastChar;
    };

    return {
        /**
         * Extracts the given entry from the archive and returns the content as a Buffer object
         * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
         * @param {Buffer|string} [pass] - password
         * @return Buffer or Null in case of error
         */
        readFile: function (entry, pass) {
            var item = getEntry(entry);
            return (item && item.getData(pass)) || null;
        },

        /**
         * Returns how many child elements has on entry (directories) on files it is always 0
         * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
         * @returns {integer}
         */
        childCount: function (entry) {
            const item = getEntry(entry);
            if (item) {
                return _zip.getChildCount(item);
            }
        },

        /**
         * Asynchronous readFile
         * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
         * @param {callback} callback
         *
         * @return Buffer or Null in case of error
         */
        readFileAsync: function (entry, callback) {
            var item = getEntry(entry);
            if (item) {
                item.getDataAsync(callback);
            } else {
                callback(null, "getEntry failed for:" + entry);
            }
        },

        /**
         * Extracts the given entry from the archive and returns the content as plain text in the given encoding
         * @param {ZipEntry|string} entry - ZipEntry object or String with the full path of the entry
         * @param {string} encoding - Optional. If no encoding is specified utf8 is used
         *
         * @return String
         */
        readAsText: function (entry, encoding) {
            var item = getEntry(entry);
            if (item) {
                var data = item.getData();
                if (data && data.length) {
                    return data.toString(encoding || "utf8");
                }
            }
            return "";
        },

        /**
         * Asynchronous readAsText
         * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
         * @param {callback} callback
         * @param {string} [encoding] - Optional. If no encoding is specified utf8 is used
         *
         * @return String
         */
        readAsTextAsync: function (entry, callback, encoding) {
            var item = getEntry(entry);
            if (item) {
                item.getDataAsync(function (data, err) {
                    if (err) {
                        callback(data, err);
                        return;
                    }

                    if (data && data.length) {
                        callback(data.toString(encoding || "utf8"));
                    } else {
                        callback("");
                    }
                });
            } else {
                callback("");
            }
        },

        /**
         * Remove the entry from the file or the entry and all it's nested directories and files if the given entry is a directory
         *
         * @param {ZipEntry|string} entry
         * @returns {void}
         */
        deleteFile: function (entry, withsubfolders = true) {
            // @TODO: test deleteFile
            var item = getEntry(entry);
            if (item) {
                _zip.deleteFile(item.entryName, withsubfolders);
            }
        },

        /**
         * Remove the entry from the file or directory without affecting any nested entries
         *
         * @param {ZipEntry|string} entry
         * @returns {void}
         */
        deleteEntry: function (entry) {
            // @TODO: test deleteEntry
            var item = getEntry(entry);
            if (item) {
                _zip.deleteEntry(item.entryName);
            }
        },

        /**
         * Adds a comment to the zip. The zip must be rewritten after adding the comment.
         *
         * @param {string} comment
         */
        addZipComment: function (comment) {
            // @TODO: test addZipComment
            _zip.comment = comment;
        },

        /**
         * Returns the zip comment
         *
         * @return String
         */
        getZipComment: function () {
            return _zip.comment || "";
        },

        /**
         * Adds a comment to a specified zipEntry. The zip must be rewritten after adding the comment
         * The comment cannot exceed 65535 characters in length
         *
         * @param {ZipEntry} entry
         * @param {string} comment
         */
        addZipEntryComment: function (entry, comment) {
            var item = getEntry(entry);
            if (item) {
                item.comment = comment;
            }
        },

        /**
         * Returns the comment of the specified entry
         *
         * @param {ZipEntry} entry
         * @return String
         */
        getZipEntryComment: function (entry) {
            var item = getEntry(entry);
            if (item) {
                return item.comment || "";
            }
            return "";
        },

        /**
         * Updates the content of an existing entry inside the archive. The zip must be rewritten after updating the content
         *
         * @param {ZipEntry} entry
         * @param {Buffer} content
         */
        updateFile: function (entry, content) {
            var item = getEntry(entry);
            if (item) {
                item.setData(content);
            }
        },

        /**
         * Adds a file from the disk to the archive
         *
         * @param {string} localPath File to add to zip
         * @param {string} [zipPath] Optional path inside the zip
         * @param {string} [zipName] Optional name for the file
         * @param {string} [comment] Optional file comment
         */
        addLocalFile: function (localPath, zipPath, zipName, comment) {
            if (filetools.fs.existsSync(localPath)) {
                // fix ZipPath
                zipPath = zipPath ? fixPath(zipPath) : "";

                // p - local file name
                const p = pth.win32.basename(pth.win32.normalize(localPath));

                // add file name into zippath
                zipPath += zipName ? zipName : p;

                // read file attributes
                const _attr = filetools.fs.statSync(localPath);

                // get file content
                const data = _attr.isFile() ? filetools.fs.readFileSync(localPath) : Buffer.alloc(0);

                // if folder
                if (_attr.isDirectory()) zipPath += filetools.sep;

                // add file into zip file
                this.addFile(zipPath, data, comment, _attr);
            } else {
                throw Utils.Errors.FILE_NOT_FOUND(localPath);
            }
        },

        /**
         * Callback for showing if everything was done.
         *
         * @callback doneCallback
         * @param {Error} err - Error object
         * @param {boolean} done - was request fully completed
         */

        /**
         * Adds a file from the disk to the archive
         *
         * @param {(object|string)} options - options object, if it is string it us used as localPath.
         * @param {string} options.localPath - Local path to the file.
         * @param {string} [options.comment] - Optional file comment.
         * @param {string} [options.zipPath] - Optional path inside the zip
         * @param {string} [options.zipName] - Optional name for the file
         * @param {doneCallback} callback - The callback that handles the response.
         */
        addLocalFileAsync: function (options, callback) {
            options = typeof options === "object" ? options : { localPath: options };
            const localPath = pth.resolve(options.localPath);
            const { comment } = options;
            let { zipPath, zipName } = options;
            const self = this;

            filetools.fs.stat(localPath, function (err, stats) {
                if (err) return callback(err, false);
                // fix ZipPath
                zipPath = zipPath ? fixPath(zipPath) : "";
                // p - local file name
                const p = pth.win32.basename(pth.win32.normalize(localPath));
                // add file name into zippath
                zipPath += zipName ? zipName : p;

                if (stats.isFile()) {
                    filetools.fs.readFile(localPath, function (err, data) {
                        if (err) return callback(err, false);
                        self.addFile(zipPath, data, comment, stats);
                        return setImmediate(callback, undefined, true);
                    });
                } else if (stats.isDirectory()) {
                    zipPath += filetools.sep;
                    self.addFile(zipPath, Buffer.alloc(0), comment, stats);
                    return setImmediate(callback, undefined, true);
                }
            });
        },

        /**
         * Adds a local directory and all its nested files and directories to the archive
         *
         * @param {string} localPath - local path to the folder
         * @param {string} [zipPath] - optional path inside zip
         * @param {(RegExp|function)} [filter] - optional RegExp or Function if files match will be included.
         */
        addLocalFolder: function (localPath, zipPath, filter) {
            // Prepare filter
            filter = filenameFilter(filter);

            // fix ZipPath
            zipPath = zipPath ? fixPath(zipPath) : "";

            // normalize the path first
            localPath = pth.normalize(localPath);

            if (filetools.fs.existsSync(localPath)) {
                const items = filetools.findFiles(localPath);
                const self = this;

                if (items.length) {
                    for (const filepath of items) {
                        const p = pth.join(zipPath, relativePath(localPath, filepath));
                        if (filter(p)) {
                            self.addLocalFile(filepath, pth.dirname(p));
                        }
                    }
                }
            } else {
                throw Utils.Errors.FILE_NOT_FOUND(localPath);
            }
        },

        /**
         * Asynchronous addLocalFolder
         * @param {string} localPath
         * @param {callback} callback
         * @param {string} [zipPath] optional path inside zip
         * @param {RegExp|function} [filter] optional RegExp or Function if files match will
         *               be included.
         */
        addLocalFolderAsync: function (localPath, callback, zipPath, filter) {
            // Prepare filter
            filter = filenameFilter(filter);

            // fix ZipPath
            zipPath = zipPath ? fixPath(zipPath) : "";

            // normalize the path first
            localPath = pth.normalize(localPath);

            var self = this;
            filetools.fs.open(localPath, "r", function (err) {
                if (err && err.code === "ENOENT") {
                    callback(undefined, Utils.Errors.FILE_NOT_FOUND(localPath));
                } else if (err) {
                    callback(undefined, err);
                } else {
                    var items = filetools.findFiles(localPath);
                    var i = -1;

                    var next = function () {
                        i += 1;
                        if (i < items.length) {
                            var filepath = items[i];
                            var p = relativePath(localPath, filepath).split("\\").join("/"); //windows fix
                            p = p
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .replace(/[^\x20-\x7E]/g, ""); // accent fix
                            if (filter(p)) {
                                filetools.fs.stat(filepath, function (er0, stats) {
                                    if (er0) callback(undefined, er0);
                                    if (stats.isFile()) {
                                        filetools.fs.readFile(filepath, function (er1, data) {
                                            if (er1) {
                                                callback(undefined, er1);
                                            } else {
                                                self.addFile(zipPath + p, data, "", stats);
                                                next();
                                            }
                                        });
                                    } else {
                                        self.addFile(zipPath + p + "/", Buffer.alloc(0), "", stats);
                                        next();
                                    }
                                });
                            } else {
                                process.nextTick(() => {
                                    next();
                                });
                            }
                        } else {
                            callback(true, undefined);
                        }
                    };

                    next();
                }
            });
        },

        /**
         * Adds a local directory and all its nested files and directories to the archive
         *
         * @param {object | string} options - options object, if it is string it us used as localPath.
         * @param {string} options.localPath - Local path to the folder.
         * @param {string} [options.zipPath] - optional path inside zip.
         * @param {RegExp|function} [options.filter] - optional RegExp or Function if files match will be included.
         * @param {function|string} [options.namefix] - optional function to help fix filename
         * @param {doneCallback} callback - The callback that handles the response.
         *
         */
        addLocalFolderAsync2: function (options, callback) {
            const self = this;
            options = typeof options === "object" ? options : { localPath: options };
            localPath = pth.resolve(fixPath(options.localPath));
            let { zipPath, filter, namefix } = options;

            if (filter instanceof RegExp) {
                filter = (function (rx) {
                    return function (filename) {
                        return rx.test(filename);
                    };
                })(filter);
            } else if ("function" !== typeof filter) {
                filter = function () {
                    return true;
                };
            }

            // fix ZipPath
            zipPath = zipPath ? fixPath(zipPath) : "";

            // Check Namefix function
            if (namefix == "latin1") {
                namefix = (str) =>
                    str
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(/[^\x20-\x7E]/g, ""); // accent fix (latin1 characers only)
            }

            if (typeof namefix !== "function") namefix = (str) => str;

            // internal, create relative path + fix the name
            const relPathFix = (entry) => pth.join(zipPath, namefix(relativePath(localPath, entry)));
            const fileNameFix = (entry) => pth.win32.basename(pth.win32.normalize(namefix(entry)));

            filetools.fs.open(localPath, "r", function (err) {
                if (err && err.code === "ENOENT") {
                    callback(undefined, Utils.Errors.FILE_NOT_FOUND(localPath));
                } else if (err) {
                    callback(undefined, err);
                } else {
                    filetools.findFilesAsync(localPath, function (err, fileEntries) {
                        if (err) return callback(err);
                        fileEntries = fileEntries.filter((dir) => filter(relPathFix(dir)));
                        if (!fileEntries.length) callback(undefined, false);

                        setImmediate(
                            fileEntries.reverse().reduce(function (next, entry) {
                                return function (err, done) {
                                    if (err || done === false) return setImmediate(next, err, false);

                                    self.addLocalFileAsync(
                                        {
                                            localPath: entry,
                                            zipPath: pth.dirname(relPathFix(entry)),
                                            zipName: fileNameFix(entry)
                                        },
                                        next
                                    );
                                };
                            }, callback)
                        );
                    });
                }
            });
        },

        /**
         * Adds a local directory and all its nested files and directories to the archive
         *
         * @param {string} localPath - path where files will be extracted
         * @param {object} props - optional properties
         * @param {string} [props.zipPath] - optional path inside zip
         * @param {RegExp|function} [props.filter] - optional RegExp or Function if files match will be included.
         * @param {function|string} [props.namefix] - optional function to help fix filename
         */
        addLocalFolderPromise: function (localPath, props) {
            return new Promise((resolve, reject) => {
                this.addLocalFolderAsync2(Object.assign({ localPath }, props), (err, done) => {
                    if (err) reject(err);
                    if (done) resolve(this);
                });
            });
        },

        /**
         * Allows you to create a entry (file or directory) in the zip file.
         * If you want to create a directory the entryName must end in / and a null buffer should be provided.
         * Comment and attributes are optional
         *
         * @param {string} entryName
         * @param {Buffer | string} content - file content as buffer or utf8 coded string
         * @param {string} [comment] - file comment
         * @param {number | object} [attr] - number as unix file permissions, object as filesystem Stats object
         */
        addFile: function (entryName, content, comment, attr) {
            entryName = zipnamefix(entryName);
            let entry = getEntry(entryName);
            const update = entry != null;

            // prepare new entry
            if (!update) {
                entry = new ZipEntry(opts);
                entry.entryName = entryName;
            }
            entry.comment = comment || "";

            const isStat = "object" === typeof attr && attr instanceof filetools.fs.Stats;

            // last modification time from file stats
            if (isStat) {
                entry.header.time = attr.mtime;
            }

            // Set file attribute
            var fileattr = entry.isDirectory ? 0x10 : 0; // (MS-DOS directory flag)

            // extended attributes field for Unix
            // set file type either S_IFDIR / S_IFREG
            let unix = entry.isDirectory ? 0x4000 : 0x8000;

            if (isStat) {
                // File attributes from file stats
                unix |= 0xfff & attr.mode;
            } else if ("number" === typeof attr) {
                // attr from given attr values
                unix |= 0xfff & attr;
            } else {
                // Default values:
                unix |= entry.isDirectory ? 0o755 : 0o644; // permissions (drwxr-xr-x) or (-r-wr--r--)
            }

            fileattr = (fileattr | (unix << 16)) >>> 0; // add attributes

            entry.attr = fileattr;

            entry.setData(content);
            if (!update) _zip.setEntry(entry);

            return entry;
        },

        /**
         * Returns an array of ZipEntry objects representing the files and folders inside the archive
         *
         * @param {string} [password]
         * @returns Array
         */
        getEntries: function (password) {
            _zip.password = password;
            return _zip ? _zip.entries : [];
        },

        /**
         * Returns a ZipEntry object representing the file or folder specified by ``name``.
         *
         * @param {string} name
         * @return ZipEntry
         */
        getEntry: function (/**String*/ name) {
            return getEntry(name);
        },

        getEntryCount: function () {
            return _zip.getEntryCount();
        },

        forEach: function (callback) {
            return _zip.forEach(callback);
        },

        /**
         * Extracts the given entry to the given targetPath
         * If the entry is a directory inside the archive, the entire directory and it's subdirectories will be extracted
         *
         * @param {string|ZipEntry} entry - ZipEntry object or String with the full path of the entry
         * @param {string} targetPath - Target folder where to write the file
         * @param {boolean} [maintainEntryPath=true] - If maintainEntryPath is true and the entry is inside a folder, the entry folder will be created in targetPath as well. Default is TRUE
         * @param {boolean} [overwrite=false] - If the file already exists at the target path, the file will be overwriten if this is true.
         * @param {boolean} [keepOriginalPermission=false] - The file will be set as the permission from the entry if this is true.
         * @param {string} [outFileName] - String If set will override the filename of the extracted file (Only works if the entry is a file)
         *
         * @return Boolean
         */
        extractEntryTo: function (entry, targetPath, maintainEntryPath, overwrite, keepOriginalPermission, outFileName) {
            overwrite = get_Bool(false, overwrite);
            keepOriginalPermission = get_Bool(false, keepOriginalPermission);
            maintainEntryPath = get_Bool(true, maintainEntryPath);
            outFileName = get_Str(keepOriginalPermission, outFileName);

            var item = getEntry(entry);
            if (!item) {
                throw Utils.Errors.NO_ENTRY();
            }

            var entryName = canonical(item.entryName);

            var target = sanitize(targetPath, outFileName && !item.isDirectory ? outFileName : maintainEntryPath ? entryName : pth.basename(entryName));

            if (item.isDirectory) {
                var children = _zip.getEntryChildren(item);
                children.forEach(function (child) {
                    if (child.isDirectory) return;
                    var content = child.getData();
                    if (!content) {
                        throw Utils.Errors.CANT_EXTRACT_FILE();
                    }
                    var name = canonical(child.entryName);
                    var childName = sanitize(targetPath, maintainEntryPath ? name : pth.basename(name));
                    // The reverse operation for attr depend on method addFile()
                    const fileAttr = keepOriginalPermission ? child.header.fileAttr : undefined;
                    filetools.writeFileTo(childName, content, overwrite, fileAttr);
                });
                return true;
            }

            var content = item.getData(_zip.password);
            if (!content) throw Utils.Errors.CANT_EXTRACT_FILE();

            if (filetools.fs.existsSync(target) && !overwrite) {
                throw Utils.Errors.CANT_OVERRIDE();
            }
            // The reverse operation for attr depend on method addFile()
            const fileAttr = keepOriginalPermission ? entry.header.fileAttr : undefined;
            filetools.writeFileTo(target, content, overwrite, fileAttr);

            return true;
        },

        /**
         * Test the archive
         * @param {string} [pass]
         */
        test: function (pass) {
            if (!_zip) {
                return false;
            }

            for (var entry in _zip.entries) {
                try {
                    if (entry.isDirectory) {
                        continue;
                    }
                    var content = _zip.entries[entry].getData(pass);
                    if (!content) {
                        return false;
                    }
                } catch (err) {
                    return false;
                }
            }
            return true;
        },

        /**
         * Extracts the entire archive to the given location
         *
         * @param {string} targetPath Target location
         * @param {boolean} [overwrite=false] If the file already exists at the target path, the file will be overwriten if this is true.
         *                  Default is FALSE
         * @param {boolean} [keepOriginalPermission=false] The file will be set as the permission from the entry if this is true.
         *                  Default is FALSE
         * @param {string|Buffer} [pass] password
         */
        extractAllTo: function (targetPath, overwrite, keepOriginalPermission, pass) {
            keepOriginalPermission = get_Bool(false, keepOriginalPermission);
            pass = get_Str(keepOriginalPermission, pass);
            overwrite = get_Bool(false, overwrite);
            if (!_zip) throw Utils.Errors.NO_ZIP();

            _zip.entries.forEach(function (entry) {
                var entryName = sanitize(targetPath, canonical(entry.entryName));
                if (entry.isDirectory) {
                    filetools.makeDir(entryName);
                    return;
                }
                var content = entry.getData(pass);
                if (!content) {
                    throw Utils.Errors.CANT_EXTRACT_FILE();
                }
                // The reverse operation for attr depend on method addFile()
                const fileAttr = keepOriginalPermission ? entry.header.fileAttr : undefined;
                filetools.writeFileTo(entryName, content, overwrite, fileAttr);
                try {
                    filetools.fs.utimesSync(entryName, entry.header.time, entry.header.time);
                } catch (err) {
                    throw Utils.Errors.CANT_EXTRACT_FILE();
                }
            });
        },

        /**
         * Asynchronous extractAllTo
         *
         * @param {string} targetPath Target location
         * @param {boolean} [overwrite=false] If the file already exists at the target path, the file will be overwriten if this is true.
         *                  Default is FALSE
         * @param {boolean} [keepOriginalPermission=false] The file will be set as the permission from the entry if this is true.
         *                  Default is FALSE
         * @param {function} callback The callback will be executed when all entries are extracted successfully or any error is thrown.
         */
        extractAllToAsync: function (targetPath, overwrite, keepOriginalPermission, callback) {
            callback = get_Fun(overwrite, keepOriginalPermission, callback);
            keepOriginalPermission = get_Bool(false, keepOriginalPermission);
            overwrite = get_Bool(false, overwrite);
            if (!callback) {
                return new Promise((resolve, reject) => {
                    this.extractAllToAsync(targetPath, overwrite, keepOriginalPermission, function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(this);
                        }
                    });
                });
            }
            if (!_zip) {
                callback(Utils.Errors.NO_ZIP());
                return;
            }

            targetPath = pth.resolve(targetPath);
            // convert entryName to
            const getPath = (entry) => sanitize(targetPath, pth.normalize(canonical(entry.entryName)));
            const getError = (msg, file) => new Error(msg + ': "' + file + '"');

            // separate directories from files
            const dirEntries = [];
            const fileEntries = [];
            _zip.entries.forEach((e) => {
                if (e.isDirectory) {
                    dirEntries.push(e);
                } else {
                    fileEntries.push(e);
                }
            });

            // Create directory entries first synchronously
            // this prevents race condition and assures folders are there before writing files
            for (const entry of dirEntries) {
                const dirPath = getPath(entry);
                // The reverse operation for attr depend on method addFile()
                const dirAttr = keepOriginalPermission ? entry.header.fileAttr : undefined;
                try {
                    filetools.makeDir(dirPath);
                    if (dirAttr) filetools.fs.chmodSync(dirPath, dirAttr);
                    // in unix timestamp will change if files are later added to folder, but still
                    filetools.fs.utimesSync(dirPath, entry.header.time, entry.header.time);
                } catch (er) {
                    callback(getError("Unable to create folder", dirPath));
                }
            }

            fileEntries.reverse().reduce(function (next, entry) {
                return function (err) {
                    if (err) {
                        next(err);
                    } else {
                        const entryName = pth.normalize(canonical(entry.entryName));
                        const filePath = sanitize(targetPath, entryName);
                        entry.getDataAsync(function (content, err_1) {
                            if (err_1) {
                                next(err_1);
                            } else if (!content) {
                                next(Utils.Errors.CANT_EXTRACT_FILE());
                            } else {
                                // The reverse operation for attr depend on method addFile()
                                const fileAttr = keepOriginalPermission ? entry.header.fileAttr : undefined;
                                filetools.writeFileToAsync(filePath, content, overwrite, fileAttr, function (succ) {
                                    if (!succ) {
                                        next(getError("Unable to write file", filePath));
                                    }
                                    filetools.fs.utimes(filePath, entry.header.time, entry.header.time, function (err_2) {
                                        if (err_2) {
                                            next(getError("Unable to set times", filePath));
                                        } else {
                                            next();
                                        }
                                    });
                                });
                            }
                        });
                    }
                };
            }, callback)();
        },

        /**
         * Writes the newly created zip file to disk at the specified location or if a zip was opened and no ``targetFileName`` is provided, it will overwrite the opened zip
         *
         * @param {string} targetFileName
         * @param {function} callback
         */
        writeZip: function (targetFileName, callback) {
            if (arguments.length === 1) {
                if (typeof targetFileName === "function") {
                    callback = targetFileName;
                    targetFileName = "";
                }
            }

            if (!targetFileName && opts.filename) {
                targetFileName = opts.filename;
            }
            if (!targetFileName) return;

            var zipData = _zip.compressToBuffer();
            if (zipData) {
                var ok = filetools.writeFileTo(targetFileName, zipData, true);
                if (typeof callback === "function") callback(!ok ? new Error("failed") : null, "");
            }
        },

        /**
         *
         * @param {string} targetFileName
         * @param {object} [props]
         * @param {boolean} [props.overwrite=true] If the file already exists at the target path, the file will be overwriten if this is true.
         * @param {boolean} [props.perm] The file will be set as the permission from the entry if this is true.

         * @returns {Promise<void>}
         */
        writeZipPromise: function (/**String*/ targetFileName, /* object */ props) {
            const { overwrite, perm } = Object.assign({ overwrite: true }, props);

            return new Promise((resolve, reject) => {
                // find file name
                if (!targetFileName && opts.filename) targetFileName = opts.filename;
                if (!targetFileName) reject("ADM-ZIP: ZIP File Name Missing");

                this.toBufferPromise().then((zipData) => {
                    const ret = (done) => (done ? resolve(done) : reject("ADM-ZIP: Wasn't able to write zip file"));
                    filetools.writeFileToAsync(targetFileName, zipData, overwrite, perm, ret);
                }, reject);
            });
        },

        /**
         * @returns {Promise<Buffer>} A promise to the Buffer.
         */
        toBufferPromise: function () {
            return new Promise((resolve, reject) => {
                _zip.toAsyncBuffer(resolve, reject);
            });
        },

        /**
         * Returns the content of the entire zip file as a Buffer object
         *
         * @prop {function} [onSuccess]
         * @prop {function} [onFail]
         * @prop {function} [onItemStart]
         * @prop {function} [onItemEnd]
         * @returns {Buffer}
         */
        toBuffer: function (onSuccess, onFail, onItemStart, onItemEnd) {
            if (typeof onSuccess === "function") {
                _zip.toAsyncBuffer(onSuccess, onFail, onItemStart, onItemEnd);
                return null;
            }
            return _zip.compressToBuffer();
        }
    };
};


/***/ }),

/***/ 3746:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var Utils = __nccwpck_require__(5391),
    Constants = Utils.Constants;

/* The central directory file header */
module.exports = function () {
    var _verMade = 20, // v2.0
        _version = 10, // v1.0
        _flags = 0,
        _method = 0,
        _time = 0,
        _crc = 0,
        _compressedSize = 0,
        _size = 0,
        _fnameLen = 0,
        _extraLen = 0,
        _comLen = 0,
        _diskStart = 0,
        _inattr = 0,
        _attr = 0,
        _offset = 0;

    _verMade |= Utils.isWin ? 0x0a00 : 0x0300;

    // Set EFS flag since filename and comment fields are all by default encoded using UTF-8.
    // Without it file names may be corrupted for other apps when file names use unicode chars
    _flags |= Constants.FLG_EFS;

    const _localHeader = {
        extraLen: 0
    };

    // casting
    const uint32 = (val) => Math.max(0, val) >>> 0;
    const uint16 = (val) => Math.max(0, val) & 0xffff;
    const uint8 = (val) => Math.max(0, val) & 0xff;

    _time = Utils.fromDate2DOS(new Date());

    return {
        get made() {
            return _verMade;
        },
        set made(val) {
            _verMade = val;
        },

        get version() {
            return _version;
        },
        set version(val) {
            _version = val;
        },

        get flags() {
            return _flags;
        },
        set flags(val) {
            _flags = val;
        },

        get flags_efs() {
            return (_flags & Constants.FLG_EFS) > 0;
        },
        set flags_efs(val) {
            if (val) {
                _flags |= Constants.FLG_EFS;
            } else {
                _flags &= ~Constants.FLG_EFS;
            }
        },

        get flags_desc() {
            return (_flags & Constants.FLG_DESC) > 0;
        },
        set flags_desc(val) {
            if (val) {
                _flags |= Constants.FLG_DESC;
            } else {
                _flags &= ~Constants.FLG_DESC;
            }
        },

        get method() {
            return _method;
        },
        set method(val) {
            switch (val) {
                case Constants.STORED:
                    this.version = 10;
                case Constants.DEFLATED:
                default:
                    this.version = 20;
            }
            _method = val;
        },

        get time() {
            return Utils.fromDOS2Date(this.timeval);
        },
        set time(val) {
            this.timeval = Utils.fromDate2DOS(val);
        },

        get timeval() {
            return _time;
        },
        set timeval(val) {
            _time = uint32(val);
        },

        get timeHighByte() {
            return uint8(_time >>> 8);
        },
        get crc() {
            return _crc;
        },
        set crc(val) {
            _crc = uint32(val);
        },

        get compressedSize() {
            return _compressedSize;
        },
        set compressedSize(val) {
            _compressedSize = uint32(val);
        },

        get size() {
            return _size;
        },
        set size(val) {
            _size = uint32(val);
        },

        get fileNameLength() {
            return _fnameLen;
        },
        set fileNameLength(val) {
            _fnameLen = val;
        },

        get extraLength() {
            return _extraLen;
        },
        set extraLength(val) {
            _extraLen = val;
        },

        get extraLocalLength() {
            return _localHeader.extraLen;
        },
        set extraLocalLength(val) {
            _localHeader.extraLen = val;
        },

        get commentLength() {
            return _comLen;
        },
        set commentLength(val) {
            _comLen = val;
        },

        get diskNumStart() {
            return _diskStart;
        },
        set diskNumStart(val) {
            _diskStart = uint32(val);
        },

        get inAttr() {
            return _inattr;
        },
        set inAttr(val) {
            _inattr = uint32(val);
        },

        get attr() {
            return _attr;
        },
        set attr(val) {
            _attr = uint32(val);
        },

        // get Unix file permissions
        get fileAttr() {
            return (_attr || 0) >> 16 & 0xfff;
        },

        get offset() {
            return _offset;
        },
        set offset(val) {
            _offset = uint32(val);
        },

        get encrypted() {
            return (_flags & Constants.FLG_ENC) === Constants.FLG_ENC;
        },

        get centralHeaderSize() {
            return Constants.CENHDR + _fnameLen + _extraLen + _comLen;
        },

        get realDataOffset() {
            return _offset + Constants.LOCHDR + _localHeader.fnameLen + _localHeader.extraLen;
        },

        get localHeader() {
            return _localHeader;
        },

        loadLocalHeaderFromBinary: function (/*Buffer*/ input) {
            var data = input.slice(_offset, _offset + Constants.LOCHDR);
            // 30 bytes and should start with "PK\003\004"
            if (data.readUInt32LE(0) !== Constants.LOCSIG) {
                throw Utils.Errors.INVALID_LOC();
            }

            // version needed to extract
            _localHeader.version = data.readUInt16LE(Constants.LOCVER);
            // general purpose bit flag
            _localHeader.flags = data.readUInt16LE(Constants.LOCFLG);
            // compression method
            _localHeader.method = data.readUInt16LE(Constants.LOCHOW);
            // modification time (2 bytes time, 2 bytes date)
            _localHeader.time = data.readUInt32LE(Constants.LOCTIM);
            // uncompressed file crc-32 valu
            _localHeader.crc = data.readUInt32LE(Constants.LOCCRC);
            // compressed size
            _localHeader.compressedSize = data.readUInt32LE(Constants.LOCSIZ);
            // uncompressed size
            _localHeader.size = data.readUInt32LE(Constants.LOCLEN);
            // filename length
            _localHeader.fnameLen = data.readUInt16LE(Constants.LOCNAM);
            // extra field length
            _localHeader.extraLen = data.readUInt16LE(Constants.LOCEXT);

            // read extra data
            const extraStart = _offset + Constants.LOCHDR + _localHeader.fnameLen;
            const extraEnd = extraStart + _localHeader.extraLen;
            return input.slice(extraStart, extraEnd);
        },

        loadFromBinary: function (/*Buffer*/ data) {
            // data should be 46 bytes and start with "PK 01 02"
            if (data.length !== Constants.CENHDR || data.readUInt32LE(0) !== Constants.CENSIG) {
                throw Utils.Errors.INVALID_CEN();
            }
            // version made by
            _verMade = data.readUInt16LE(Constants.CENVEM);
            // version needed to extract
            _version = data.readUInt16LE(Constants.CENVER);
            // encrypt, decrypt flags
            _flags = data.readUInt16LE(Constants.CENFLG);
            // compression method
            _method = data.readUInt16LE(Constants.CENHOW);
            // modification time (2 bytes time, 2 bytes date)
            _time = data.readUInt32LE(Constants.CENTIM);
            // uncompressed file crc-32 value
            _crc = data.readUInt32LE(Constants.CENCRC);
            // compressed size
            _compressedSize = data.readUInt32LE(Constants.CENSIZ);
            // uncompressed size
            _size = data.readUInt32LE(Constants.CENLEN);
            // filename length
            _fnameLen = data.readUInt16LE(Constants.CENNAM);
            // extra field length
            _extraLen = data.readUInt16LE(Constants.CENEXT);
            // file comment length
            _comLen = data.readUInt16LE(Constants.CENCOM);
            // volume number start
            _diskStart = data.readUInt16LE(Constants.CENDSK);
            // internal file attributes
            _inattr = data.readUInt16LE(Constants.CENATT);
            // external file attributes
            _attr = data.readUInt32LE(Constants.CENATX);
            // LOC header offset
            _offset = data.readUInt32LE(Constants.CENOFF);
        },

        localHeaderToBinary: function () {
            // LOC header size (30 bytes)
            var data = Buffer.alloc(Constants.LOCHDR);
            // "PK\003\004"
            data.writeUInt32LE(Constants.LOCSIG, 0);
            // version needed to extract
            data.writeUInt16LE(_version, Constants.LOCVER);
            // general purpose bit flag
            data.writeUInt16LE(_flags, Constants.LOCFLG);
            // compression method
            data.writeUInt16LE(_method, Constants.LOCHOW);
            // modification time (2 bytes time, 2 bytes date)
            data.writeUInt32LE(_time, Constants.LOCTIM);
            // uncompressed file crc-32 value
            data.writeUInt32LE(_crc, Constants.LOCCRC);
            // compressed size
            data.writeUInt32LE(_compressedSize, Constants.LOCSIZ);
            // uncompressed size
            data.writeUInt32LE(_size, Constants.LOCLEN);
            // filename length
            data.writeUInt16LE(_fnameLen, Constants.LOCNAM);
            // extra field length
            data.writeUInt16LE(_localHeader.extraLen, Constants.LOCEXT);
            return data;
        },

        centralHeaderToBinary: function () {
            // CEN header size (46 bytes)
            var data = Buffer.alloc(Constants.CENHDR + _fnameLen + _extraLen + _comLen);
            // "PK\001\002"
            data.writeUInt32LE(Constants.CENSIG, 0);
            // version made by
            data.writeUInt16LE(_verMade, Constants.CENVEM);
            // version needed to extract
            data.writeUInt16LE(_version, Constants.CENVER);
            // encrypt, decrypt flags
            data.writeUInt16LE(_flags, Constants.CENFLG);
            // compression method
            data.writeUInt16LE(_method, Constants.CENHOW);
            // modification time (2 bytes time, 2 bytes date)
            data.writeUInt32LE(_time, Constants.CENTIM);
            // uncompressed file crc-32 value
            data.writeUInt32LE(_crc, Constants.CENCRC);
            // compressed size
            data.writeUInt32LE(_compressedSize, Constants.CENSIZ);
            // uncompressed size
            data.writeUInt32LE(_size, Constants.CENLEN);
            // filename length
            data.writeUInt16LE(_fnameLen, Constants.CENNAM);
            // extra field length
            data.writeUInt16LE(_extraLen, Constants.CENEXT);
            // file comment length
            data.writeUInt16LE(_comLen, Constants.CENCOM);
            // volume number start
            data.writeUInt16LE(_diskStart, Constants.CENDSK);
            // internal file attributes
            data.writeUInt16LE(_inattr, Constants.CENATT);
            // external file attributes
            data.writeUInt32LE(_attr, Constants.CENATX);
            // LOC header offset
            data.writeUInt32LE(_offset, Constants.CENOFF);
            return data;
        },

        toJSON: function () {
            const bytes = function (nr) {
                return nr + " bytes";
            };

            return {
                made: _verMade,
                version: _version,
                flags: _flags,
                method: Utils.methodToString(_method),
                time: this.time,
                crc: "0x" + _crc.toString(16).toUpperCase(),
                compressedSize: bytes(_compressedSize),
                size: bytes(_size),
                fileNameLength: bytes(_fnameLen),
                extraLength: bytes(_extraLen),
                commentLength: bytes(_comLen),
                diskNumStart: _diskStart,
                inAttr: _inattr,
                attr: _attr,
                offset: _offset,
                centralHeaderSize: bytes(Constants.CENHDR + _fnameLen + _extraLen + _comLen)
            };
        },

        toString: function () {
            return JSON.stringify(this.toJSON(), null, "\t");
        }
    };
};


/***/ }),

/***/ 1907:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

exports.EntryHeader = __nccwpck_require__(3746);
exports.MainHeader = __nccwpck_require__(9311);


/***/ }),

/***/ 9311:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var Utils = __nccwpck_require__(5391),
    Constants = Utils.Constants;

/* The entries in the end of central directory */
module.exports = function () {
    var _volumeEntries = 0,
        _totalEntries = 0,
        _size = 0,
        _offset = 0,
        _commentLength = 0;

    return {
        get diskEntries() {
            return _volumeEntries;
        },
        set diskEntries(/*Number*/ val) {
            _volumeEntries = _totalEntries = val;
        },

        get totalEntries() {
            return _totalEntries;
        },
        set totalEntries(/*Number*/ val) {
            _totalEntries = _volumeEntries = val;
        },

        get size() {
            return _size;
        },
        set size(/*Number*/ val) {
            _size = val;
        },

        get offset() {
            return _offset;
        },
        set offset(/*Number*/ val) {
            _offset = val;
        },

        get commentLength() {
            return _commentLength;
        },
        set commentLength(/*Number*/ val) {
            _commentLength = val;
        },

        get mainHeaderSize() {
            return Constants.ENDHDR + _commentLength;
        },

        loadFromBinary: function (/*Buffer*/ data) {
            // data should be 22 bytes and start with "PK 05 06"
            // or be 56+ bytes and start with "PK 06 06" for Zip64
            if (
                (data.length !== Constants.ENDHDR || data.readUInt32LE(0) !== Constants.ENDSIG) &&
                (data.length < Constants.ZIP64HDR || data.readUInt32LE(0) !== Constants.ZIP64SIG)
            ) {
                throw Utils.Errors.INVALID_END();
            }

            if (data.readUInt32LE(0) === Constants.ENDSIG) {
                // number of entries on this volume
                _volumeEntries = data.readUInt16LE(Constants.ENDSUB);
                // total number of entries
                _totalEntries = data.readUInt16LE(Constants.ENDTOT);
                // central directory size in bytes
                _size = data.readUInt32LE(Constants.ENDSIZ);
                // offset of first CEN header
                _offset = data.readUInt32LE(Constants.ENDOFF);
                // zip file comment length
                _commentLength = data.readUInt16LE(Constants.ENDCOM);
            } else {
                // number of entries on this volume
                _volumeEntries = Utils.readBigUInt64LE(data, Constants.ZIP64SUB);
                // total number of entries
                _totalEntries = Utils.readBigUInt64LE(data, Constants.ZIP64TOT);
                // central directory size in bytes
                _size = Utils.readBigUInt64LE(data, Constants.ZIP64SIZE);
                // offset of first CEN header
                _offset = Utils.readBigUInt64LE(data, Constants.ZIP64OFF);

                _commentLength = 0;
            }
        },

        toBinary: function () {
            var b = Buffer.alloc(Constants.ENDHDR + _commentLength);
            // "PK 05 06" signature
            b.writeUInt32LE(Constants.ENDSIG, 0);
            b.writeUInt32LE(0, 4);
            // number of entries on this volume
            b.writeUInt16LE(_volumeEntries, Constants.ENDSUB);
            // total number of entries
            b.writeUInt16LE(_totalEntries, Constants.ENDTOT);
            // central directory size in bytes
            b.writeUInt32LE(_size, Constants.ENDSIZ);
            // offset of first CEN header
            b.writeUInt32LE(_offset, Constants.ENDOFF);
            // zip file comment length
            b.writeUInt16LE(_commentLength, Constants.ENDCOM);
            // fill comment memory with spaces so no garbage is left there
            b.fill(" ", Constants.ENDHDR);

            return b;
        },

        toJSON: function () {
            // creates 0x0000 style output
            const offset = function (nr, len) {
                let offs = nr.toString(16).toUpperCase();
                while (offs.length < len) offs = "0" + offs;
                return "0x" + offs;
            };

            return {
                diskEntries: _volumeEntries,
                totalEntries: _totalEntries,
                size: _size + " bytes",
                offset: offset(_offset, 4),
                commentLength: _commentLength
            };
        },

        toString: function () {
            return JSON.stringify(this.toJSON(), null, "\t");
        }
    };
};
// Misspelled


/***/ }),

/***/ 5120:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = function (/*Buffer*/ inbuf) {
    var zlib = __nccwpck_require__(3106);

    var opts = { chunkSize: (parseInt(inbuf.length / 1024) + 1) * 1024 };

    return {
        deflate: function () {
            return zlib.deflateRawSync(inbuf, opts);
        },

        deflateAsync: function (/*Function*/ callback) {
            var tmp = zlib.createDeflateRaw(opts),
                parts = [],
                total = 0;
            tmp.on("data", function (data) {
                parts.push(data);
                total += data.length;
            });
            tmp.on("end", function () {
                var buf = Buffer.alloc(total),
                    written = 0;
                buf.fill(0);
                for (var i = 0; i < parts.length; i++) {
                    var part = parts[i];
                    part.copy(buf, written);
                    written += part.length;
                }
                callback && callback(buf);
            });
            tmp.end(inbuf);
        }
    };
};


/***/ }),

/***/ 3667:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

exports.Deflater = __nccwpck_require__(5120);
exports.Inflater = __nccwpck_require__(9540);
exports.ZipCrypto = __nccwpck_require__(2689);


/***/ }),

/***/ 9540:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const version = +(process.versions ? process.versions.node : "").split(".")[0] || 0;

module.exports = function (/*Buffer*/ inbuf, /*number*/ expectedLength) {
    var zlib = __nccwpck_require__(3106);
    const option = version >= 15 && expectedLength > 0 ? { maxOutputLength: expectedLength } : {};

    return {
        inflate: function () {
            return zlib.inflateRawSync(inbuf, option);
        },

        inflateAsync: function (/*Function*/ callback) {
            var tmp = zlib.createInflateRaw(option),
                parts = [],
                total = 0;
            tmp.on("data", function (data) {
                parts.push(data);
                total += data.length;
            });
            tmp.on("end", function () {
                var buf = Buffer.alloc(total),
                    written = 0;
                buf.fill(0);
                for (var i = 0; i < parts.length; i++) {
                    var part = parts[i];
                    part.copy(buf, written);
                    written += part.length;
                }
                callback && callback(buf);
            });
            tmp.end(inbuf);
        }
    };
};


/***/ }),

/***/ 2689:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


// node crypt, we use it for generate salt
// eslint-disable-next-line node/no-unsupported-features/node-builtins
const { randomFillSync } = __nccwpck_require__(6982);
const Errors = __nccwpck_require__(6232);

// generate CRC32 lookup table
const crctable = new Uint32Array(256).map((t, crc) => {
    for (let j = 0; j < 8; j++) {
        if (0 !== (crc & 1)) {
            crc = (crc >>> 1) ^ 0xedb88320;
        } else {
            crc >>>= 1;
        }
    }
    return crc >>> 0;
});

// C-style uInt32 Multiply (discards higher bits, when JS multiply discards lower bits)
const uMul = (a, b) => Math.imul(a, b) >>> 0;

// crc32 byte single update (actually same function is part of utils.crc32 function :) )
const crc32update = (pCrc32, bval) => {
    return crctable[(pCrc32 ^ bval) & 0xff] ^ (pCrc32 >>> 8);
};

// function for generating salt for encrytion header
const genSalt = () => {
    if ("function" === typeof randomFillSync) {
        return randomFillSync(Buffer.alloc(12));
    } else {
        // fallback if function is not defined
        return genSalt.node();
    }
};

// salt generation with node random function (mainly as fallback)
genSalt.node = () => {
    const salt = Buffer.alloc(12);
    const len = salt.length;
    for (let i = 0; i < len; i++) salt[i] = (Math.random() * 256) & 0xff;
    return salt;
};

// general config
const config = {
    genSalt
};

// Class Initkeys handles same basic ops with keys
function Initkeys(pw) {
    const pass = Buffer.isBuffer(pw) ? pw : Buffer.from(pw);
    this.keys = new Uint32Array([0x12345678, 0x23456789, 0x34567890]);
    for (let i = 0; i < pass.length; i++) {
        this.updateKeys(pass[i]);
    }
}

Initkeys.prototype.updateKeys = function (byteValue) {
    const keys = this.keys;
    keys[0] = crc32update(keys[0], byteValue);
    keys[1] += keys[0] & 0xff;
    keys[1] = uMul(keys[1], 134775813) + 1;
    keys[2] = crc32update(keys[2], keys[1] >>> 24);
    return byteValue;
};

Initkeys.prototype.next = function () {
    const k = (this.keys[2] | 2) >>> 0; // key
    return (uMul(k, k ^ 1) >> 8) & 0xff; // decode
};

function make_decrypter(/*Buffer*/ pwd) {
    // 1. Stage initialize key
    const keys = new Initkeys(pwd);

    // return decrypter function
    return function (/*Buffer*/ data) {
        // result - we create new Buffer for results
        const result = Buffer.alloc(data.length);
        let pos = 0;
        // process input data
        for (let c of data) {
            //c ^= keys.next();
            //result[pos++] = c; // decode & Save Value
            result[pos++] = keys.updateKeys(c ^ keys.next()); // update keys with decoded byte
        }
        return result;
    };
}

function make_encrypter(/*Buffer*/ pwd) {
    // 1. Stage initialize key
    const keys = new Initkeys(pwd);

    // return encrypting function, result and pos is here so we dont have to merge buffers later
    return function (/*Buffer*/ data, /*Buffer*/ result, /* Number */ pos = 0) {
        // result - we create new Buffer for results
        if (!result) result = Buffer.alloc(data.length);
        // process input data
        for (let c of data) {
            const k = keys.next(); // save key byte
            result[pos++] = c ^ k; // save val
            keys.updateKeys(c); // update keys with decoded byte
        }
        return result;
    };
}

function decrypt(/*Buffer*/ data, /*Object*/ header, /*String, Buffer*/ pwd) {
    if (!data || !Buffer.isBuffer(data) || data.length < 12) {
        return Buffer.alloc(0);
    }

    // 1. We Initialize and generate decrypting function
    const decrypter = make_decrypter(pwd);

    // 2. decrypt salt what is always 12 bytes and is a part of file content
    const salt = decrypter(data.slice(0, 12));

    // if bit 3 (0x08) of the general-purpose flags field is set, check salt[11] with the high byte of the header time
    // 2 byte data block (as per Info-Zip spec), otherwise check with the high byte of the header entry
    const verifyByte = (header.flags & 0x8) === 0x8 ? header.timeHighByte : header.crc >>> 24;

    //3. does password meet expectations
    if (salt[11] !== verifyByte) {
        throw Errors.WRONG_PASSWORD();
    }

    // 4. decode content
    return decrypter(data.slice(12));
}

// lets add way to populate salt, NOT RECOMMENDED for production but maybe useful for testing general functionality
function _salter(data) {
    if (Buffer.isBuffer(data) && data.length >= 12) {
        // be aware - currently salting buffer data is modified
        config.genSalt = function () {
            return data.slice(0, 12);
        };
    } else if (data === "node") {
        // test salt generation with node random function
        config.genSalt = genSalt.node;
    } else {
        // if value is not acceptable config gets reset.
        config.genSalt = genSalt;
    }
}

function encrypt(/*Buffer*/ data, /*Object*/ header, /*String, Buffer*/ pwd, /*Boolean*/ oldlike = false) {
    // 1. test data if data is not Buffer we make buffer from it
    if (data == null) data = Buffer.alloc(0);
    // if data is not buffer be make buffer from it
    if (!Buffer.isBuffer(data)) data = Buffer.from(data.toString());

    // 2. We Initialize and generate encrypting function
    const encrypter = make_encrypter(pwd);

    // 3. generate salt (12-bytes of random data)
    const salt = config.genSalt();
    salt[11] = (header.crc >>> 24) & 0xff;

    // old implementations (before PKZip 2.04g) used two byte check
    if (oldlike) salt[10] = (header.crc >>> 16) & 0xff;

    // 4. create output
    const result = Buffer.alloc(data.length + 12);
    encrypter(salt, result);

    // finally encode content
    return encrypter(data, result, 12);
}

module.exports = { decrypt, encrypt, _salter };


/***/ }),

/***/ 2834:
/***/ ((module) => {

module.exports = {
    /* The local file header */
    LOCHDR           : 30, // LOC header size
    LOCSIG           : 0x04034b50, // "PK\003\004"
    LOCVER           : 4,	// version needed to extract
    LOCFLG           : 6, // general purpose bit flag
    LOCHOW           : 8, // compression method
    LOCTIM           : 10, // modification time (2 bytes time, 2 bytes date)
    LOCCRC           : 14, // uncompressed file crc-32 value
    LOCSIZ           : 18, // compressed size
    LOCLEN           : 22, // uncompressed size
    LOCNAM           : 26, // filename length
    LOCEXT           : 28, // extra field length

    /* The Data descriptor */
    EXTSIG           : 0x08074b50, // "PK\007\008"
    EXTHDR           : 16, // EXT header size
    EXTCRC           : 4, // uncompressed file crc-32 value
    EXTSIZ           : 8, // compressed size
    EXTLEN           : 12, // uncompressed size

    /* The central directory file header */
    CENHDR           : 46, // CEN header size
    CENSIG           : 0x02014b50, // "PK\001\002"
    CENVEM           : 4, // version made by
    CENVER           : 6, // version needed to extract
    CENFLG           : 8, // encrypt, decrypt flags
    CENHOW           : 10, // compression method
    CENTIM           : 12, // modification time (2 bytes time, 2 bytes date)
    CENCRC           : 16, // uncompressed file crc-32 value
    CENSIZ           : 20, // compressed size
    CENLEN           : 24, // uncompressed size
    CENNAM           : 28, // filename length
    CENEXT           : 30, // extra field length
    CENCOM           : 32, // file comment length
    CENDSK           : 34, // volume number start
    CENATT           : 36, // internal file attributes
    CENATX           : 38, // external file attributes (host system dependent)
    CENOFF           : 42, // LOC header offset

    /* The entries in the end of central directory */
    ENDHDR           : 22, // END header size
    ENDSIG           : 0x06054b50, // "PK\005\006"
    ENDSUB           : 8, // number of entries on this disk
    ENDTOT           : 10, // total number of entries
    ENDSIZ           : 12, // central directory size in bytes
    ENDOFF           : 16, // offset of first CEN header
    ENDCOM           : 20, // zip file comment length

    END64HDR         : 20, // zip64 END header size
    END64SIG         : 0x07064b50, // zip64 Locator signature, "PK\006\007"
    END64START       : 4, // number of the disk with the start of the zip64
    END64OFF         : 8, // relative offset of the zip64 end of central directory
    END64NUMDISKS    : 16, // total number of disks

    ZIP64SIG         : 0x06064b50, // zip64 signature, "PK\006\006"
    ZIP64HDR         : 56, // zip64 record minimum size
    ZIP64LEAD        : 12, // leading bytes at the start of the record, not counted by the value stored in ZIP64SIZE
    ZIP64SIZE        : 4, // zip64 size of the central directory record
    ZIP64VEM         : 12, // zip64 version made by
    ZIP64VER         : 14, // zip64 version needed to extract
    ZIP64DSK         : 16, // zip64 number of this disk
    ZIP64DSKDIR      : 20, // number of the disk with the start of the record directory
    ZIP64SUB         : 24, // number of entries on this disk
    ZIP64TOT         : 32, // total number of entries
    ZIP64SIZB        : 40, // zip64 central directory size in bytes
    ZIP64OFF         : 48, // offset of start of central directory with respect to the starting disk number
    ZIP64EXTRA       : 56, // extensible data sector

    /* Compression methods */
    STORED           : 0, // no compression
    SHRUNK           : 1, // shrunk
    REDUCED1         : 2, // reduced with compression factor 1
    REDUCED2         : 3, // reduced with compression factor 2
    REDUCED3         : 4, // reduced with compression factor 3
    REDUCED4         : 5, // reduced with compression factor 4
    IMPLODED         : 6, // imploded
    // 7 reserved for Tokenizing compression algorithm
    DEFLATED         : 8, // deflated
    ENHANCED_DEFLATED: 9, // enhanced deflated
    PKWARE           : 10,// PKWare DCL imploded
    // 11 reserved by PKWARE
    BZIP2            : 12, //  compressed using BZIP2
    // 13 reserved by PKWARE
    LZMA             : 14, // LZMA
    // 15-17 reserved by PKWARE
    IBM_TERSE        : 18, // compressed using IBM TERSE
    IBM_LZ77         : 19, // IBM LZ77 z
    AES_ENCRYPT      : 99, // WinZIP AES encryption method

    /* General purpose bit flag */
    // values can obtained with expression 2**bitnr
    FLG_ENC          : 1,    // Bit 0: encrypted file
    FLG_COMP1        : 2,    // Bit 1, compression option
    FLG_COMP2        : 4,    // Bit 2, compression option
    FLG_DESC         : 8,    // Bit 3, data descriptor
    FLG_ENH          : 16,   // Bit 4, enhanced deflating
    FLG_PATCH        : 32,   // Bit 5, indicates that the file is compressed patched data.
    FLG_STR          : 64,   // Bit 6, strong encryption (patented)
                             // Bits 7-10: Currently unused.
    FLG_EFS          : 2048, // Bit 11: Language encoding flag (EFS)
                             // Bit 12: Reserved by PKWARE for enhanced compression.
                             // Bit 13: encrypted the Central Directory (patented).
                             // Bits 14-15: Reserved by PKWARE.
    FLG_MSK          : 4096, // mask header values

    /* Load type */
    FILE             : 2,
    BUFFER           : 1,
    NONE             : 0,

    /* 4.5 Extensible data fields */
    EF_ID            : 0,
    EF_SIZE          : 2,

    /* Header IDs */
    ID_ZIP64         : 0x0001,
    ID_AVINFO        : 0x0007,
    ID_PFS           : 0x0008,
    ID_OS2           : 0x0009,
    ID_NTFS          : 0x000a,
    ID_OPENVMS       : 0x000c,
    ID_UNIX          : 0x000d,
    ID_FORK          : 0x000e,
    ID_PATCH         : 0x000f,
    ID_X509_PKCS7    : 0x0014,
    ID_X509_CERTID_F : 0x0015,
    ID_X509_CERTID_C : 0x0016,
    ID_STRONGENC     : 0x0017,
    ID_RECORD_MGT    : 0x0018,
    ID_X509_PKCS7_RL : 0x0019,
    ID_IBM1          : 0x0065,
    ID_IBM2          : 0x0066,
    ID_POSZIP        : 0x4690,

    EF_ZIP64_OR_32   : 0xffffffff,
    EF_ZIP64_OR_16   : 0xffff,
    EF_ZIP64_SUNCOMP : 0,
    EF_ZIP64_SCOMP   : 8,
    EF_ZIP64_RHO     : 16,
    EF_ZIP64_DSN     : 24
};


/***/ }),

/***/ 1579:
/***/ ((module) => {

module.exports = {
    efs: true,
    encode: (data) => Buffer.from(data, "utf8"),
    decode: (data) => data.toString("utf8")
};


/***/ }),

/***/ 6232:
/***/ ((__unused_webpack_module, exports) => {

const errors = {
    /* Header error messages */
    INVALID_LOC: "Invalid LOC header (bad signature)",
    INVALID_CEN: "Invalid CEN header (bad signature)",
    INVALID_END: "Invalid END header (bad signature)",

    /* Descriptor */
    DESCRIPTOR_NOT_EXIST: "No descriptor present",
    DESCRIPTOR_UNKNOWN: "Unknown descriptor format",
    DESCRIPTOR_FAULTY: "Descriptor data is malformed",

    /* ZipEntry error messages*/
    NO_DATA: "Nothing to decompress",
    BAD_CRC: "CRC32 checksum failed {0}",
    FILE_IN_THE_WAY: "There is a file in the way: {0}",
    UNKNOWN_METHOD: "Invalid/unsupported compression method",

    /* Inflater error messages */
    AVAIL_DATA: "inflate::Available inflate data did not terminate",
    INVALID_DISTANCE: "inflate::Invalid literal/length or distance code in fixed or dynamic block",
    TO_MANY_CODES: "inflate::Dynamic block code description: too many length or distance codes",
    INVALID_REPEAT_LEN: "inflate::Dynamic block code description: repeat more than specified lengths",
    INVALID_REPEAT_FIRST: "inflate::Dynamic block code description: repeat lengths with no first length",
    INCOMPLETE_CODES: "inflate::Dynamic block code description: code lengths codes incomplete",
    INVALID_DYN_DISTANCE: "inflate::Dynamic block code description: invalid distance code lengths",
    INVALID_CODES_LEN: "inflate::Dynamic block code description: invalid literal/length code lengths",
    INVALID_STORE_BLOCK: "inflate::Stored block length did not match one's complement",
    INVALID_BLOCK_TYPE: "inflate::Invalid block type (type == 3)",

    /* ADM-ZIP error messages */
    CANT_EXTRACT_FILE: "Could not extract the file",
    CANT_OVERRIDE: "Target file already exists",
    DISK_ENTRY_TOO_LARGE: "Number of disk entries is too large",
    NO_ZIP: "No zip file was loaded",
    NO_ENTRY: "Entry doesn't exist",
    DIRECTORY_CONTENT_ERROR: "A directory cannot have content",
    FILE_NOT_FOUND: 'File not found: "{0}"',
    NOT_IMPLEMENTED: "Not implemented",
    INVALID_FILENAME: "Invalid filename",
    INVALID_FORMAT: "Invalid or unsupported zip format. No END header found",
    INVALID_PASS_PARAM: "Incompatible password parameter",
    WRONG_PASSWORD: "Wrong Password",

    /* ADM-ZIP */
    COMMENT_TOO_LONG: "Comment is too long", // Comment can be max 65535 bytes long (NOTE: some non-US characters may take more space)
    EXTRA_FIELD_PARSE_ERROR: "Extra field parsing error"
};

// template
function E(message) {
    return function (...args) {
        if (args.length) { // Allow {0} .. {9} arguments in error message, based on argument number
            message = message.replace(/\{(\d)\}/g, (_, n) => args[n] || '');
        }

        return new Error('ADM-ZIP: ' + message);
    };
}

// Init errors with template
for (const msg of Object.keys(errors)) {
    exports[msg] = E(errors[msg]);
}


/***/ }),

/***/ 38:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const pth = __nccwpck_require__(6928);

module.exports = function (/*String*/ path, /*Utils object*/ { fs }) {
    var _path = path || "",
        _obj = newAttr(),
        _stat = null;

    function newAttr() {
        return {
            directory: false,
            readonly: false,
            hidden: false,
            executable: false,
            mtime: 0,
            atime: 0
        };
    }

    if (_path && fs.existsSync(_path)) {
        _stat = fs.statSync(_path);
        _obj.directory = _stat.isDirectory();
        _obj.mtime = _stat.mtime;
        _obj.atime = _stat.atime;
        _obj.executable = (0o111 & _stat.mode) !== 0; // file is executable who ever har right not just owner
        _obj.readonly = (0o200 & _stat.mode) === 0; // readonly if owner has no write right
        _obj.hidden = pth.basename(_path)[0] === ".";
    } else {
        console.warn("Invalid path: " + _path);
    }

    return {
        get directory() {
            return _obj.directory;
        },

        get readOnly() {
            return _obj.readonly;
        },

        get hidden() {
            return _obj.hidden;
        },

        get mtime() {
            return _obj.mtime;
        },

        get atime() {
            return _obj.atime;
        },

        get executable() {
            return _obj.executable;
        },

        decodeAttributes: function () {},

        encodeAttributes: function () {},

        toJSON: function () {
            return {
                path: _path,
                isDirectory: _obj.directory,
                isReadOnly: _obj.readonly,
                isHidden: _obj.hidden,
                isExecutable: _obj.executable,
                mTime: _obj.mtime,
                aTime: _obj.atime
            };
        },

        toString: function () {
            return JSON.stringify(this.toJSON(), null, "\t");
        }
    };
};


/***/ }),

/***/ 5391:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(9066);
module.exports.Constants = __nccwpck_require__(2834);
module.exports.Errors = __nccwpck_require__(6232);
module.exports.FileAttr = __nccwpck_require__(38);
module.exports.decoder = __nccwpck_require__(1579);


/***/ }),

/***/ 9066:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const fsystem = __nccwpck_require__(9896);
const pth = __nccwpck_require__(6928);
const Constants = __nccwpck_require__(2834);
const Errors = __nccwpck_require__(6232);
const isWin = typeof process === "object" && "win32" === process.platform;

const is_Obj = (obj) => typeof obj === "object" && obj !== null;

// generate CRC32 lookup table
const crcTable = new Uint32Array(256).map((t, c) => {
    for (let k = 0; k < 8; k++) {
        if ((c & 1) !== 0) {
            c = 0xedb88320 ^ (c >>> 1);
        } else {
            c >>>= 1;
        }
    }
    return c >>> 0;
});

// UTILS functions

function Utils(opts) {
    this.sep = pth.sep;
    this.fs = fsystem;

    if (is_Obj(opts)) {
        // custom filesystem
        if (is_Obj(opts.fs) && typeof opts.fs.statSync === "function") {
            this.fs = opts.fs;
        }
    }
}

module.exports = Utils;

// INSTANTIABLE functions

Utils.prototype.makeDir = function (/*String*/ folder) {
    const self = this;

    // Sync - make directories tree
    function mkdirSync(/*String*/ fpath) {
        let resolvedPath = fpath.split(self.sep)[0];
        fpath.split(self.sep).forEach(function (name) {
            if (!name || name.substr(-1, 1) === ":") return;
            resolvedPath += self.sep + name;
            var stat;
            try {
                stat = self.fs.statSync(resolvedPath);
            } catch (e) {
                self.fs.mkdirSync(resolvedPath);
            }
            if (stat && stat.isFile()) throw Errors.FILE_IN_THE_WAY(`"${resolvedPath}"`);
        });
    }

    mkdirSync(folder);
};

Utils.prototype.writeFileTo = function (/*String*/ path, /*Buffer*/ content, /*Boolean*/ overwrite, /*Number*/ attr) {
    const self = this;
    if (self.fs.existsSync(path)) {
        if (!overwrite) return false; // cannot overwrite

        var stat = self.fs.statSync(path);
        if (stat.isDirectory()) {
            return false;
        }
    }
    var folder = pth.dirname(path);
    if (!self.fs.existsSync(folder)) {
        self.makeDir(folder);
    }

    var fd;
    try {
        fd = self.fs.openSync(path, "w", 0o666); // 0666
    } catch (e) {
        self.fs.chmodSync(path, 0o666);
        fd = self.fs.openSync(path, "w", 0o666);
    }
    if (fd) {
        try {
            self.fs.writeSync(fd, content, 0, content.length, 0);
        } finally {
            self.fs.closeSync(fd);
        }
    }
    self.fs.chmodSync(path, attr || 0o666);
    return true;
};

Utils.prototype.writeFileToAsync = function (/*String*/ path, /*Buffer*/ content, /*Boolean*/ overwrite, /*Number*/ attr, /*Function*/ callback) {
    if (typeof attr === "function") {
        callback = attr;
        attr = undefined;
    }

    const self = this;

    self.fs.exists(path, function (exist) {
        if (exist && !overwrite) return callback(false);

        self.fs.stat(path, function (err, stat) {
            if (exist && stat.isDirectory()) {
                return callback(false);
            }

            var folder = pth.dirname(path);
            self.fs.exists(folder, function (exists) {
                if (!exists) self.makeDir(folder);

                self.fs.open(path, "w", 0o666, function (err, fd) {
                    if (err) {
                        self.fs.chmod(path, 0o666, function () {
                            self.fs.open(path, "w", 0o666, function (err, fd) {
                                self.fs.write(fd, content, 0, content.length, 0, function () {
                                    self.fs.close(fd, function () {
                                        self.fs.chmod(path, attr || 0o666, function () {
                                            callback(true);
                                        });
                                    });
                                });
                            });
                        });
                    } else if (fd) {
                        self.fs.write(fd, content, 0, content.length, 0, function () {
                            self.fs.close(fd, function () {
                                self.fs.chmod(path, attr || 0o666, function () {
                                    callback(true);
                                });
                            });
                        });
                    } else {
                        self.fs.chmod(path, attr || 0o666, function () {
                            callback(true);
                        });
                    }
                });
            });
        });
    });
};

Utils.prototype.findFiles = function (/*String*/ path) {
    const self = this;

    function findSync(/*String*/ dir, /*RegExp*/ pattern, /*Boolean*/ recursive) {
        if (typeof pattern === "boolean") {
            recursive = pattern;
            pattern = undefined;
        }
        let files = [];
        self.fs.readdirSync(dir).forEach(function (file) {
            const path = pth.join(dir, file);
            const stat = self.fs.statSync(path);

            if (!pattern || pattern.test(path)) {
                files.push(pth.normalize(path) + (stat.isDirectory() ? self.sep : ""));
            }

            if (stat.isDirectory() && recursive) files = files.concat(findSync(path, pattern, recursive));
        });
        return files;
    }

    return findSync(path, undefined, true);
};

/**
 * Callback for showing if everything was done.
 *
 * @callback filelistCallback
 * @param {Error} err - Error object
 * @param {string[]} list - was request fully completed
 */

/**
 *
 * @param {string} dir
 * @param {filelistCallback} cb
 */
Utils.prototype.findFilesAsync = function (dir, cb) {
    const self = this;
    let results = [];
    self.fs.readdir(dir, function (err, list) {
        if (err) return cb(err);
        let list_length = list.length;
        if (!list_length) return cb(null, results);
        list.forEach(function (file) {
            file = pth.join(dir, file);
            self.fs.stat(file, function (err, stat) {
                if (err) return cb(err);
                if (stat) {
                    results.push(pth.normalize(file) + (stat.isDirectory() ? self.sep : ""));
                    if (stat.isDirectory()) {
                        self.findFilesAsync(file, function (err, res) {
                            if (err) return cb(err);
                            results = results.concat(res);
                            if (!--list_length) cb(null, results);
                        });
                    } else {
                        if (!--list_length) cb(null, results);
                    }
                }
            });
        });
    });
};

Utils.prototype.getAttributes = function () {};

Utils.prototype.setAttributes = function () {};

// STATIC functions

// crc32 single update (it is part of crc32)
Utils.crc32update = function (crc, byte) {
    return crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
};

Utils.crc32 = function (buf) {
    if (typeof buf === "string") {
        buf = Buffer.from(buf, "utf8");
    }

    let len = buf.length;
    let crc = ~0;
    for (let off = 0; off < len; ) crc = Utils.crc32update(crc, buf[off++]);
    // xor and cast as uint32 number
    return ~crc >>> 0;
};

Utils.methodToString = function (/*Number*/ method) {
    switch (method) {
        case Constants.STORED:
            return "STORED (" + method + ")";
        case Constants.DEFLATED:
            return "DEFLATED (" + method + ")";
        default:
            return "UNSUPPORTED (" + method + ")";
    }
};

/**
 * removes ".." style path elements
 * @param {string} path - fixable path
 * @returns string - fixed filepath
 */
Utils.canonical = function (/*string*/ path) {
    if (!path) return "";
    // trick normalize think path is absolute
    const safeSuffix = pth.posix.normalize("/" + path.split("\\").join("/"));
    return pth.join(".", safeSuffix);
};

/**
 * fix file names in achive
 * @param {string} path - fixable path
 * @returns string - fixed filepath
 */

Utils.zipnamefix = function (path) {
    if (!path) return "";
    // trick normalize think path is absolute
    const safeSuffix = pth.posix.normalize("/" + path.split("\\").join("/"));
    return pth.posix.join(".", safeSuffix);
};

/**
 *
 * @param {Array} arr
 * @param {function} callback
 * @returns
 */
Utils.findLast = function (arr, callback) {
    if (!Array.isArray(arr)) throw new TypeError("arr is not array");

    const len = arr.length >>> 0;
    for (let i = len - 1; i >= 0; i--) {
        if (callback(arr[i], i, arr)) {
            return arr[i];
        }
    }
    return void 0;
};

// make abolute paths taking prefix as root folder
Utils.sanitize = function (/*string*/ prefix, /*string*/ name) {
    prefix = pth.resolve(pth.normalize(prefix));
    var parts = name.split("/");
    for (var i = 0, l = parts.length; i < l; i++) {
        var path = pth.normalize(pth.join(prefix, parts.slice(i, l).join(pth.sep)));
        if (path.indexOf(prefix) === 0) {
            return path;
        }
    }
    return pth.normalize(pth.join(prefix, pth.basename(name)));
};

// converts buffer, Uint8Array, string types to buffer
Utils.toBuffer = function toBuffer(/*buffer, Uint8Array, string*/ input, /* function */ encoder) {
    if (Buffer.isBuffer(input)) {
        return input;
    } else if (input instanceof Uint8Array) {
        return Buffer.from(input);
    } else {
        // expect string all other values are invalid and return empty buffer
        return typeof input === "string" ? encoder(input) : Buffer.alloc(0);
    }
};

Utils.readBigUInt64LE = function (/*Buffer*/ buffer, /*int*/ index) {
    var slice = Buffer.from(buffer.slice(index, index + 8));
    slice.swap64();

    return parseInt(`0x${slice.toString("hex")}`);
};

Utils.fromDOS2Date = function (val) {
    return new Date(((val >> 25) & 0x7f) + 1980, Math.max(((val >> 21) & 0x0f) - 1, 0), Math.max((val >> 16) & 0x1f, 1), (val >> 11) & 0x1f, (val >> 5) & 0x3f, (val & 0x1f) << 1);
};

Utils.fromDate2DOS = function (val) {
    let date = 0;
    let time = 0;
    if (val.getFullYear() > 1979) {
        date = (((val.getFullYear() - 1980) & 0x7f) << 9) | ((val.getMonth() + 1) << 5) | val.getDate();
        time = (val.getHours() << 11) | (val.getMinutes() << 5) | (val.getSeconds() >> 1);
    }
    return (date << 16) | time;
};

Utils.isWin = isWin; // Do we have windows system
Utils.crcTable = crcTable;


/***/ }),

/***/ 2609:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var Utils = __nccwpck_require__(5391),
    Headers = __nccwpck_require__(1907),
    Constants = Utils.Constants,
    Methods = __nccwpck_require__(3667);

module.exports = function (/** object */ options, /*Buffer*/ input) {
    var _centralHeader = new Headers.EntryHeader(),
        _entryName = Buffer.alloc(0),
        _comment = Buffer.alloc(0),
        _isDirectory = false,
        uncompressedData = null,
        _extra = Buffer.alloc(0),
        _extralocal = Buffer.alloc(0),
        _efs = true;

    // assign options
    const opts = options;

    const decoder = typeof opts.decoder === "object" ? opts.decoder : Utils.decoder;
    _efs = decoder.hasOwnProperty("efs") ? decoder.efs : false;

    function getCompressedDataFromZip() {
        //if (!input || !Buffer.isBuffer(input)) {
        if (!input || !(input instanceof Uint8Array)) {
            return Buffer.alloc(0);
        }
        _extralocal = _centralHeader.loadLocalHeaderFromBinary(input);
        return input.slice(_centralHeader.realDataOffset, _centralHeader.realDataOffset + _centralHeader.compressedSize);
    }

    function crc32OK(data) {
        // if bit 3 (0x08) of the general-purpose flags field is set, then the CRC-32 and file sizes are not known when the local header is written
        if (!_centralHeader.flags_desc) {
            if (Utils.crc32(data) !== _centralHeader.localHeader.crc) {
                return false;
            }
        } else {
            const descriptor = {};
            const dataEndOffset = _centralHeader.realDataOffset + _centralHeader.compressedSize;
            // no descriptor after compressed data, instead new local header
            if (input.readUInt32LE(dataEndOffset) == Constants.LOCSIG || input.readUInt32LE(dataEndOffset) == Constants.CENSIG) {
                throw Utils.Errors.DESCRIPTOR_NOT_EXIST();
            }

            // get decriptor data
            if (input.readUInt32LE(dataEndOffset) == Constants.EXTSIG) {
                // descriptor with signature
                descriptor.crc = input.readUInt32LE(dataEndOffset + Constants.EXTCRC);
                descriptor.compressedSize = input.readUInt32LE(dataEndOffset + Constants.EXTSIZ);
                descriptor.size = input.readUInt32LE(dataEndOffset + Constants.EXTLEN);
            } else if (input.readUInt16LE(dataEndOffset + 12) === 0x4b50) {
                // descriptor without signature (we check is new header starting where we expect)
                descriptor.crc = input.readUInt32LE(dataEndOffset + Constants.EXTCRC - 4);
                descriptor.compressedSize = input.readUInt32LE(dataEndOffset + Constants.EXTSIZ - 4);
                descriptor.size = input.readUInt32LE(dataEndOffset + Constants.EXTLEN - 4);
            } else {
                throw Utils.Errors.DESCRIPTOR_UNKNOWN();
            }

            // check data integrity
            if (descriptor.compressedSize !== _centralHeader.compressedSize || descriptor.size !== _centralHeader.size || descriptor.crc !== _centralHeader.crc) {
                throw Utils.Errors.DESCRIPTOR_FAULTY();
            }
            if (Utils.crc32(data) !== descriptor.crc) {
                return false;
            }

            // @TODO: zip64 bit descriptor fields
            // if bit 3 is set and any value in local header "zip64 Extended information" extra field are set 0 (place holder)
            // then 64-bit descriptor format is used instead of 32-bit
            // central header - "zip64 Extended information" extra field should store real values and not place holders
        }
        return true;
    }

    function decompress(/*Boolean*/ async, /*Function*/ callback, /*String, Buffer*/ pass) {
        if (typeof callback === "undefined" && typeof async === "string") {
            pass = async;
            async = void 0;
        }
        if (_isDirectory) {
            if (async && callback) {
                callback(Buffer.alloc(0), Utils.Errors.DIRECTORY_CONTENT_ERROR()); //si added error.
            }
            return Buffer.alloc(0);
        }

        var compressedData = getCompressedDataFromZip();

        if (compressedData.length === 0) {
            // File is empty, nothing to decompress.
            if (async && callback) callback(compressedData);
            return compressedData;
        }

        if (_centralHeader.encrypted) {
            if ("string" !== typeof pass && !Buffer.isBuffer(pass)) {
                throw Utils.Errors.INVALID_PASS_PARAM();
            }
            compressedData = Methods.ZipCrypto.decrypt(compressedData, _centralHeader, pass);
        }

        var data = Buffer.alloc(_centralHeader.size);

        switch (_centralHeader.method) {
            case Utils.Constants.STORED:
                compressedData.copy(data);
                if (!crc32OK(data)) {
                    if (async && callback) callback(data, Utils.Errors.BAD_CRC()); //si added error
                    throw Utils.Errors.BAD_CRC();
                } else {
                    //si added otherwise did not seem to return data.
                    if (async && callback) callback(data);
                    return data;
                }
            case Utils.Constants.DEFLATED:
                var inflater = new Methods.Inflater(compressedData, _centralHeader.size);
                if (!async) {
                    const result = inflater.inflate(data);
                    result.copy(data, 0);
                    if (!crc32OK(data)) {
                        throw Utils.Errors.BAD_CRC(`"${decoder.decode(_entryName)}"`);
                    }
                    return data;
                } else {
                    inflater.inflateAsync(function (result) {
                        result.copy(result, 0);
                        if (callback) {
                            if (!crc32OK(result)) {
                                callback(result, Utils.Errors.BAD_CRC()); //si added error
                            } else {
                                callback(result);
                            }
                        }
                    });
                }
                break;
            default:
                if (async && callback) callback(Buffer.alloc(0), Utils.Errors.UNKNOWN_METHOD());
                throw Utils.Errors.UNKNOWN_METHOD();
        }
    }

    function compress(/*Boolean*/ async, /*Function*/ callback) {
        if ((!uncompressedData || !uncompressedData.length) && Buffer.isBuffer(input)) {
            // no data set or the data wasn't changed to require recompression
            if (async && callback) callback(getCompressedDataFromZip());
            return getCompressedDataFromZip();
        }

        if (uncompressedData.length && !_isDirectory) {
            var compressedData;
            // Local file header
            switch (_centralHeader.method) {
                case Utils.Constants.STORED:
                    _centralHeader.compressedSize = _centralHeader.size;

                    compressedData = Buffer.alloc(uncompressedData.length);
                    uncompressedData.copy(compressedData);

                    if (async && callback) callback(compressedData);
                    return compressedData;
                default:
                case Utils.Constants.DEFLATED:
                    var deflater = new Methods.Deflater(uncompressedData);
                    if (!async) {
                        var deflated = deflater.deflate();
                        _centralHeader.compressedSize = deflated.length;
                        return deflated;
                    } else {
                        deflater.deflateAsync(function (data) {
                            compressedData = Buffer.alloc(data.length);
                            _centralHeader.compressedSize = data.length;
                            data.copy(compressedData);
                            callback && callback(compressedData);
                        });
                    }
                    deflater = null;
                    break;
            }
        } else if (async && callback) {
            callback(Buffer.alloc(0));
        } else {
            return Buffer.alloc(0);
        }
    }

    function readUInt64LE(buffer, offset) {
        return (buffer.readUInt32LE(offset + 4) << 4) + buffer.readUInt32LE(offset);
    }

    function parseExtra(data) {
        try {
            var offset = 0;
            var signature, size, part;
            while (offset + 4 < data.length) {
                signature = data.readUInt16LE(offset);
                offset += 2;
                size = data.readUInt16LE(offset);
                offset += 2;
                part = data.slice(offset, offset + size);
                offset += size;
                if (Constants.ID_ZIP64 === signature) {
                    parseZip64ExtendedInformation(part);
                }
            }
        } catch (error) {
            throw Utils.Errors.EXTRA_FIELD_PARSE_ERROR();
        }
    }

    //Override header field values with values from the ZIP64 extra field
    function parseZip64ExtendedInformation(data) {
        var size, compressedSize, offset, diskNumStart;

        if (data.length >= Constants.EF_ZIP64_SCOMP) {
            size = readUInt64LE(data, Constants.EF_ZIP64_SUNCOMP);
            if (_centralHeader.size === Constants.EF_ZIP64_OR_32) {
                _centralHeader.size = size;
            }
        }
        if (data.length >= Constants.EF_ZIP64_RHO) {
            compressedSize = readUInt64LE(data, Constants.EF_ZIP64_SCOMP);
            if (_centralHeader.compressedSize === Constants.EF_ZIP64_OR_32) {
                _centralHeader.compressedSize = compressedSize;
            }
        }
        if (data.length >= Constants.EF_ZIP64_DSN) {
            offset = readUInt64LE(data, Constants.EF_ZIP64_RHO);
            if (_centralHeader.offset === Constants.EF_ZIP64_OR_32) {
                _centralHeader.offset = offset;
            }
        }
        if (data.length >= Constants.EF_ZIP64_DSN + 4) {
            diskNumStart = data.readUInt32LE(Constants.EF_ZIP64_DSN);
            if (_centralHeader.diskNumStart === Constants.EF_ZIP64_OR_16) {
                _centralHeader.diskNumStart = diskNumStart;
            }
        }
    }

    return {
        get entryName() {
            return decoder.decode(_entryName);
        },
        get rawEntryName() {
            return _entryName;
        },
        set entryName(val) {
            _entryName = Utils.toBuffer(val, decoder.encode);
            var lastChar = _entryName[_entryName.length - 1];
            _isDirectory = lastChar === 47 || lastChar === 92;
            _centralHeader.fileNameLength = _entryName.length;
        },

        get efs() {
            if (typeof _efs === "function") {
                return _efs(this.entryName);
            } else {
                return _efs;
            }
        },

        get extra() {
            return _extra;
        },
        set extra(val) {
            _extra = val;
            _centralHeader.extraLength = val.length;
            parseExtra(val);
        },

        get comment() {
            return decoder.decode(_comment);
        },
        set comment(val) {
            _comment = Utils.toBuffer(val, decoder.encode);
            _centralHeader.commentLength = _comment.length;
            if (_comment.length > 0xffff) throw Utils.Errors.COMMENT_TOO_LONG();
        },

        get name() {
            var n = decoder.decode(_entryName);
            return _isDirectory
                ? n
                      .substr(n.length - 1)
                      .split("/")
                      .pop()
                : n.split("/").pop();
        },
        get isDirectory() {
            return _isDirectory;
        },

        getCompressedData: function () {
            return compress(false, null);
        },

        getCompressedDataAsync: function (/*Function*/ callback) {
            compress(true, callback);
        },

        setData: function (value) {
            uncompressedData = Utils.toBuffer(value, Utils.decoder.encode);
            if (!_isDirectory && uncompressedData.length) {
                _centralHeader.size = uncompressedData.length;
                _centralHeader.method = Utils.Constants.DEFLATED;
                _centralHeader.crc = Utils.crc32(value);
                _centralHeader.changed = true;
            } else {
                // folders and blank files should be stored
                _centralHeader.method = Utils.Constants.STORED;
            }
        },

        getData: function (pass) {
            if (_centralHeader.changed) {
                return uncompressedData;
            } else {
                return decompress(false, null, pass);
            }
        },

        getDataAsync: function (/*Function*/ callback, pass) {
            if (_centralHeader.changed) {
                callback(uncompressedData);
            } else {
                decompress(true, callback, pass);
            }
        },

        set attr(attr) {
            _centralHeader.attr = attr;
        },
        get attr() {
            return _centralHeader.attr;
        },

        set header(/*Buffer*/ data) {
            _centralHeader.loadFromBinary(data);
        },

        get header() {
            return _centralHeader;
        },

        packCentralHeader: function () {
            _centralHeader.flags_efs = this.efs;
            _centralHeader.extraLength = _extra.length;
            // 1. create header (buffer)
            var header = _centralHeader.centralHeaderToBinary();
            var addpos = Utils.Constants.CENHDR;
            // 2. add file name
            _entryName.copy(header, addpos);
            addpos += _entryName.length;
            // 3. add extra data
            _extra.copy(header, addpos);
            addpos += _centralHeader.extraLength;
            // 4. add file comment
            _comment.copy(header, addpos);
            return header;
        },

        packLocalHeader: function () {
            let addpos = 0;
            _centralHeader.flags_efs = this.efs;
            _centralHeader.extraLocalLength = _extralocal.length;
            // 1. construct local header Buffer
            const localHeaderBuf = _centralHeader.localHeaderToBinary();
            // 2. localHeader - crate header buffer
            const localHeader = Buffer.alloc(localHeaderBuf.length + _entryName.length + _centralHeader.extraLocalLength);
            // 2.1 add localheader
            localHeaderBuf.copy(localHeader, addpos);
            addpos += localHeaderBuf.length;
            // 2.2 add file name
            _entryName.copy(localHeader, addpos);
            addpos += _entryName.length;
            // 2.3 add extra field
            _extralocal.copy(localHeader, addpos);
            addpos += _extralocal.length;

            return localHeader;
        },

        toJSON: function () {
            const bytes = function (nr) {
                return "<" + ((nr && nr.length + " bytes buffer") || "null") + ">";
            };

            return {
                entryName: this.entryName,
                name: this.name,
                comment: this.comment,
                isDirectory: this.isDirectory,
                header: _centralHeader.toJSON(),
                compressedData: bytes(input),
                data: bytes(uncompressedData)
            };
        },

        toString: function () {
            return JSON.stringify(this.toJSON(), null, "\t");
        }
    };
};


/***/ }),

/***/ 6991:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const ZipEntry = __nccwpck_require__(2609);
const Headers = __nccwpck_require__(1907);
const Utils = __nccwpck_require__(5391);

module.exports = function (/*Buffer|null*/ inBuffer, /** object */ options) {
    var entryList = [],
        entryTable = {},
        _comment = Buffer.alloc(0),
        mainHeader = new Headers.MainHeader(),
        loadedEntries = false;
    var password = null;
    const temporary = new Set();

    // assign options
    const opts = options;

    const { noSort, decoder } = opts;

    if (inBuffer) {
        // is a memory buffer
        readMainHeader(opts.readEntries);
    } else {
        // none. is a new file
        loadedEntries = true;
    }

    function makeTemporaryFolders() {
        const foldersList = new Set();

        // Make list of all folders in file
        for (const elem of Object.keys(entryTable)) {
            const elements = elem.split("/");
            elements.pop(); // filename
            if (!elements.length) continue; // no folders
            for (let i = 0; i < elements.length; i++) {
                const sub = elements.slice(0, i + 1).join("/") + "/";
                foldersList.add(sub);
            }
        }

        // create missing folders as temporary
        for (const elem of foldersList) {
            if (!(elem in entryTable)) {
                const tempfolder = new ZipEntry(opts);
                tempfolder.entryName = elem;
                tempfolder.attr = 0x10;
                tempfolder.temporary = true;
                entryList.push(tempfolder);
                entryTable[tempfolder.entryName] = tempfolder;
                temporary.add(tempfolder);
            }
        }
    }

    function readEntries() {
        loadedEntries = true;
        entryTable = {};
        if (mainHeader.diskEntries > (inBuffer.length - mainHeader.offset) / Utils.Constants.CENHDR) {
            throw Utils.Errors.DISK_ENTRY_TOO_LARGE();
        }
        entryList = new Array(mainHeader.diskEntries); // total number of entries
        var index = mainHeader.offset; // offset of first CEN header
        for (var i = 0; i < entryList.length; i++) {
            var tmp = index,
                entry = new ZipEntry(opts, inBuffer);
            entry.header = inBuffer.slice(tmp, (tmp += Utils.Constants.CENHDR));

            entry.entryName = inBuffer.slice(tmp, (tmp += entry.header.fileNameLength));

            if (entry.header.extraLength) {
                entry.extra = inBuffer.slice(tmp, (tmp += entry.header.extraLength));
            }

            if (entry.header.commentLength) entry.comment = inBuffer.slice(tmp, tmp + entry.header.commentLength);

            index += entry.header.centralHeaderSize;

            entryList[i] = entry;
            entryTable[entry.entryName] = entry;
        }
        temporary.clear();
        makeTemporaryFolders();
    }

    function readMainHeader(/*Boolean*/ readNow) {
        var i = inBuffer.length - Utils.Constants.ENDHDR, // END header size
            max = Math.max(0, i - 0xffff), // 0xFFFF is the max zip file comment length
            n = max,
            endStart = inBuffer.length,
            endOffset = -1, // Start offset of the END header
            commentEnd = 0;

        // option to search header form entire file
        const trailingSpace = typeof opts.trailingSpace === "boolean" ? opts.trailingSpace : false;
        if (trailingSpace) max = 0;

        for (i; i >= n; i--) {
            if (inBuffer[i] !== 0x50) continue; // quick check that the byte is 'P'
            if (inBuffer.readUInt32LE(i) === Utils.Constants.ENDSIG) {
                // "PK\005\006"
                endOffset = i;
                commentEnd = i;
                endStart = i + Utils.Constants.ENDHDR;
                // We already found a regular signature, let's look just a bit further to check if there's any zip64 signature
                n = i - Utils.Constants.END64HDR;
                continue;
            }

            if (inBuffer.readUInt32LE(i) === Utils.Constants.END64SIG) {
                // Found a zip64 signature, let's continue reading the whole zip64 record
                n = max;
                continue;
            }

            if (inBuffer.readUInt32LE(i) === Utils.Constants.ZIP64SIG) {
                // Found the zip64 record, let's determine it's size
                endOffset = i;
                endStart = i + Utils.readBigUInt64LE(inBuffer, i + Utils.Constants.ZIP64SIZE) + Utils.Constants.ZIP64LEAD;
                break;
            }
        }

        if (endOffset == -1) throw Utils.Errors.INVALID_FORMAT();

        mainHeader.loadFromBinary(inBuffer.slice(endOffset, endStart));
        if (mainHeader.commentLength) {
            _comment = inBuffer.slice(commentEnd + Utils.Constants.ENDHDR);
        }
        if (readNow) readEntries();
    }

    function sortEntries() {
        if (entryList.length > 1 && !noSort) {
            entryList.sort((a, b) => a.entryName.toLowerCase().localeCompare(b.entryName.toLowerCase()));
        }
    }

    return {
        /**
         * Returns an array of ZipEntry objects existent in the current opened archive
         * @return Array
         */
        get entries() {
            if (!loadedEntries) {
                readEntries();
            }
            return entryList.filter((e) => !temporary.has(e));
        },

        /**
         * Archive comment
         * @return {String}
         */
        get comment() {
            return decoder.decode(_comment);
        },
        set comment(val) {
            _comment = Utils.toBuffer(val, decoder.encode);
            mainHeader.commentLength = _comment.length;
        },

        getEntryCount: function () {
            if (!loadedEntries) {
                return mainHeader.diskEntries;
            }

            return entryList.length;
        },

        forEach: function (callback) {
            this.entries.forEach(callback);
        },

        /**
         * Returns a reference to the entry with the given name or null if entry is inexistent
         *
         * @param entryName
         * @return ZipEntry
         */
        getEntry: function (/*String*/ entryName) {
            if (!loadedEntries) {
                readEntries();
            }
            return entryTable[entryName] || null;
        },

        /**
         * Adds the given entry to the entry list
         *
         * @param entry
         */
        setEntry: function (/*ZipEntry*/ entry) {
            if (!loadedEntries) {
                readEntries();
            }
            entryList.push(entry);
            entryTable[entry.entryName] = entry;
            mainHeader.totalEntries = entryList.length;
        },

        /**
         * Removes the file with the given name from the entry list.
         *
         * If the entry is a directory, then all nested files and directories will be removed
         * @param entryName
         * @returns {void}
         */
        deleteFile: function (/*String*/ entryName, withsubfolders = true) {
            if (!loadedEntries) {
                readEntries();
            }
            const entry = entryTable[entryName];
            const list = this.getEntryChildren(entry, withsubfolders).map((child) => child.entryName);

            list.forEach(this.deleteEntry);
        },

        /**
         * Removes the entry with the given name from the entry list.
         *
         * @param {string} entryName
         * @returns {void}
         */
        deleteEntry: function (/*String*/ entryName) {
            if (!loadedEntries) {
                readEntries();
            }
            const entry = entryTable[entryName];
            const index = entryList.indexOf(entry);
            if (index >= 0) {
                entryList.splice(index, 1);
                delete entryTable[entryName];
                mainHeader.totalEntries = entryList.length;
            }
        },

        /**
         *  Iterates and returns all nested files and directories of the given entry
         *
         * @param entry
         * @return Array
         */
        getEntryChildren: function (/*ZipEntry*/ entry, subfolders = true) {
            if (!loadedEntries) {
                readEntries();
            }
            if (typeof entry === "object") {
                if (entry.isDirectory && subfolders) {
                    const list = [];
                    const name = entry.entryName;

                    for (const zipEntry of entryList) {
                        if (zipEntry.entryName.startsWith(name)) {
                            list.push(zipEntry);
                        }
                    }
                    return list;
                } else {
                    return [entry];
                }
            }
            return [];
        },

        /**
         *  How many child elements entry has
         *
         * @param {ZipEntry} entry
         * @return {integer}
         */
        getChildCount: function (entry) {
            if (entry && entry.isDirectory) {
                const list = this.getEntryChildren(entry);
                return list.includes(entry) ? list.length - 1 : list.length;
            }
            return 0;
        },

        /**
         * Returns the zip file
         *
         * @return Buffer
         */
        compressToBuffer: function () {
            if (!loadedEntries) {
                readEntries();
            }
            sortEntries();

            const dataBlock = [];
            const headerBlocks = [];
            let totalSize = 0;
            let dindex = 0;

            mainHeader.size = 0;
            mainHeader.offset = 0;
            let totalEntries = 0;

            for (const entry of this.entries) {
                // compress data and set local and entry header accordingly. Reason why is called first
                const compressedData = entry.getCompressedData();
                entry.header.offset = dindex;

                // 1. construct local header
                const localHeader = entry.packLocalHeader();

                // 2. offsets
                const dataLength = localHeader.length + compressedData.length;
                dindex += dataLength;

                // 3. store values in sequence
                dataBlock.push(localHeader);
                dataBlock.push(compressedData);

                // 4. construct central header
                const centralHeader = entry.packCentralHeader();
                headerBlocks.push(centralHeader);
                // 5. update main header
                mainHeader.size += centralHeader.length;
                totalSize += dataLength + centralHeader.length;
                totalEntries++;
            }

            totalSize += mainHeader.mainHeaderSize; // also includes zip file comment length
            // point to end of data and beginning of central directory first record
            mainHeader.offset = dindex;
            mainHeader.totalEntries = totalEntries;

            dindex = 0;
            const outBuffer = Buffer.alloc(totalSize);
            // write data blocks
            for (const content of dataBlock) {
                content.copy(outBuffer, dindex);
                dindex += content.length;
            }

            // write central directory entries
            for (const content of headerBlocks) {
                content.copy(outBuffer, dindex);
                dindex += content.length;
            }

            // write main header
            const mh = mainHeader.toBinary();
            if (_comment) {
                _comment.copy(mh, Utils.Constants.ENDHDR); // add zip file comment
            }
            mh.copy(outBuffer, dindex);

            // Since we update entry and main header offsets,
            // they are no longer valid and we have to reset content
            // (Issue 64)

            inBuffer = outBuffer;
            loadedEntries = false;

            return outBuffer;
        },

        toAsyncBuffer: function (/*Function*/ onSuccess, /*Function*/ onFail, /*Function*/ onItemStart, /*Function*/ onItemEnd) {
            try {
                if (!loadedEntries) {
                    readEntries();
                }
                sortEntries();

                const dataBlock = [];
                const centralHeaders = [];
                let totalSize = 0;
                let dindex = 0;
                let totalEntries = 0;

                mainHeader.size = 0;
                mainHeader.offset = 0;

                const compress2Buffer = function (entryLists) {
                    if (entryLists.length > 0) {
                        const entry = entryLists.shift();
                        const name = entry.entryName + entry.extra.toString();
                        if (onItemStart) onItemStart(name);
                        entry.getCompressedDataAsync(function (compressedData) {
                            if (onItemEnd) onItemEnd(name);
                            entry.header.offset = dindex;

                            // 1. construct local header
                            const localHeader = entry.packLocalHeader();

                            // 2. offsets
                            const dataLength = localHeader.length + compressedData.length;
                            dindex += dataLength;

                            // 3. store values in sequence
                            dataBlock.push(localHeader);
                            dataBlock.push(compressedData);

                            // central header
                            const centalHeader = entry.packCentralHeader();
                            centralHeaders.push(centalHeader);
                            mainHeader.size += centalHeader.length;
                            totalSize += dataLength + centalHeader.length;
                            totalEntries++;

                            compress2Buffer(entryLists);
                        });
                    } else {
                        totalSize += mainHeader.mainHeaderSize; // also includes zip file comment length
                        // point to end of data and beginning of central directory first record
                        mainHeader.offset = dindex;
                        mainHeader.totalEntries = totalEntries;

                        dindex = 0;
                        const outBuffer = Buffer.alloc(totalSize);
                        dataBlock.forEach(function (content) {
                            content.copy(outBuffer, dindex); // write data blocks
                            dindex += content.length;
                        });
                        centralHeaders.forEach(function (content) {
                            content.copy(outBuffer, dindex); // write central directory entries
                            dindex += content.length;
                        });

                        const mh = mainHeader.toBinary();
                        if (_comment) {
                            _comment.copy(mh, Utils.Constants.ENDHDR); // add zip file comment
                        }

                        mh.copy(outBuffer, dindex); // write main header

                        // Since we update entry and main header offsets, they are no
                        // longer valid and we have to reset content using our new buffer
                        // (Issue 64)

                        inBuffer = outBuffer;
                        loadedEntries = false;

                        onSuccess(outBuffer);
                    }
                };

                compress2Buffer(Array.from(this.entries));
            } catch (e) {
                onFail(e);
            }
        }
    };
};


/***/ }),

/***/ 770:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(218);


/***/ }),

/***/ 218:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var net = __nccwpck_require__(9278);
var tls = __nccwpck_require__(4756);
var http = __nccwpck_require__(8611);
var https = __nccwpck_require__(5692);
var events = __nccwpck_require__(4434);
var assert = __nccwpck_require__(2613);
var util = __nccwpck_require__(9023);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 7936:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const core = __nccwpck_require__(7484);
const os = __nccwpck_require__(8161);
const path = __nccwpck_require__(6760);
const zip = __nccwpck_require__(1316);

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


/***/ }),

/***/ 2613:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 5317:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 6982:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 4434:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 9896:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 8611:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 5692:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 9278:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 8161:
/***/ ((module) => {

"use strict";
module.exports = require("node:os");

/***/ }),

/***/ 6760:
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ 857:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 6928:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 3193:
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ 3557:
/***/ ((module) => {

"use strict";
module.exports = require("timers");

/***/ }),

/***/ 4756:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 9023:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 3106:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/**
 * The entrypoint for the action.
 */
const { run } = __nccwpck_require__(7936);

run();

module.exports = __webpack_exports__;
/******/ })()
;