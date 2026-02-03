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
exports.lsGit = lsGit;
exports.getDownloadLink = getDownloadLink;
exports.getFileDownloadLink = getFileDownloadLink;
const request = __importStar(require("request"));
function lsGit(user, repo, dir, callback) {
    if (!callback) {
        callback = dir;
        dir = '';
    }
    let options = {
        url: `https://api.github.com/repos/${user}/${repo}/contents/${dir}?ref=HEAD`,
        headers: {
            'User-Agent': 'request'
        }
    };
    request.get(options, callback);
}
function getDownloadLink(user, repo, branch = "master") {
    return `https://github.com/${user}/${repo}/archive/${branch}.zip`;
}
/// TODO: need to update this function
// @ts-ignore
function getFileDownloadLink(user, repo, dir, file) {
    if (file === undefined)
        return `https://raw.githubusercontent.com/${user}/${repo}/HEAD/${dir}`;
    else
        return `https://raw.githubusercontent.com/${user}/${repo}/HEAD/${dir}/${file}`;
}
// function callback(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         const ls: Array<{name: string, type: string}> = JSON.parse(body);
//         ls.forEach(e => {
//             console.log(e.type.toUpperCase(), e.name);
//         })
//     }
// }
