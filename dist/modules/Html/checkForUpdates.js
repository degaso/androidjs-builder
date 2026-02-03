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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdate = getUpdate;
exports.getUpdateMessage = getUpdateMessage;
const dns = require('dns');
const GitListDir_1 = require("../../GitListDir");
const downloadGithubFile_1 = require("./downloadGithubFile");
const path = __importStar(require("path"));
const semver = require('semver');
let isSearchComplete = false;
let isAvailable = false;
let _hostname = '';
let _service = '';
let msg = '';
dns.lookupService('8.8.8.8', 53, function (err, hostname, service) {
    isSearchComplete = true;
    if (err) {
    }
    else {
        _hostname = hostname;
        _service = service;
        if (_hostname.length > 0 && _service.length > 0) {
            isAvailable = true;
        }
    }
    // google-public-dns-a.google.com domain
});
function getSdkVersion(env, callback) {
    let tempFilePath = path.join(env.builder.cache, 'TEMP-sdk-config.json');
    let sdkConfigFileLink = (0, GitListDir_1.getFileDownloadLink)(env.sdk.user, env.sdk.repo, 'config.json');
    let _sdkConfigFileLink = {
        user: env.sdk.user,
        repo: env.sdk.repo,
        file: 'config.json',
        dir: ''
    };
    (0, downloadGithubFile_1.downloadGithubFile)(_sdkConfigFileLink, tempFilePath, () => {
        try {
            let sdkConfig = require(tempFilePath);
            callback(sdkConfig.version);
        }
        catch (e) {
            ///...
        }
    }, false);
}
function getUpdate(env) {
    return new Promise(resolve => {
        let loopCount = 0;
        let loop = setInterval(() => {
            // check for 5 seconds for network connectivity
            if (++loopCount === 5) {
                clearInterval(loop);
            }
            if (isSearchComplete && (true || clearInterval(loop))) {
                if (isAvailable) {
                    try {
                        let oldSdk = require(path.join(env.builder.cache, env.sdk.repo, 'config.json'));
                        getSdkVersion(env, sdkVersion => {
                            if (semver.lt(oldSdk.version, sdkVersion)) {
                                msg = `Androidjs-sdk: ${sdkVersion} available`;
                                msg += `Update using $androidjs u`;
                            }
                            else {
                                ///...
                            }
                        });
                    }
                    catch (e) {
                        ///...
                    }
                }
            }
            else {
                /// if search is not complete then do nothing for 5 seconds
            }
        }, 1000);
    });
}
function getUpdateMessage() {
    if (msg.length > 1) {
        console.log(msg);
    }
}
