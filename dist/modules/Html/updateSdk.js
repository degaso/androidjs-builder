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
exports.updateSdk = updateSdk;
const path = __importStar(require("path"));
const admZip = require('adm-zip');
const GitListDir_1 = require("../../GitListDir");
const downloadGithubRepo_1 = require("./downloadGithubRepo");
const fs = __importStar(require("fs-extra"));
function updateSdk(env, callback) {
    const sdkZip = path.join(env.builder.cache, env.sdk.repo + '.zip');
    const sdkFolder = path.join(env.builder.cache);
    console.log("Downloading Androidjs-SDK:", (0, GitListDir_1.getDownloadLink)(env.sdk.user, env.sdk.repo));
    (0, downloadGithubRepo_1.downloadGithubRepo)(env.sdk, sdkZip, (error) => {
        if (error) {
            console.log('Failed to download sdk');
            process.exit();
        }
        else {
            try {
                let zip = new admZip(sdkZip);
                zip.extractEntryTo(env.sdk.repo + '-master/', sdkFolder, true, true);
                fs.removeSync(path.join(sdkFolder, env.sdk.repo));
                fs.renameSync(path.join(sdkFolder, env.sdk.repo + '-master'), path.join(sdkFolder, env.sdk.repo));
                if (callback) {
                    callback();
                }
            }
            catch (e) {
                console.log("Failed to extract sdk");
                process.exit();
            }
        }
    });
}
