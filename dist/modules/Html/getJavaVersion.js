"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.javaVersion = javaVersion;
const findJava = require('find-java-home');
function javaVersion(callback) {
    findJava(callback);
}
