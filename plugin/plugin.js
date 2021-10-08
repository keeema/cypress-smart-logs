"use strict";
/// <reference types="../index" />
exports.__esModule = true;
exports.install = void 0;
var fs = require("fs");
var path = require("path");
function install(on, _config) {
    on("task", { "clean-smart-logs": function (_a) {
            var path = _a.path;
            return clearFiles(path);
        } });
    on("task", {
        "write-smart-logs": function (_a) {
            var filePath = _a.filePath, content = _a.content;
            return writeLogs(filePath, content);
        }
    });
    on("before:run", function (details) {
        clearFiles(details.config["smart-logs-folder"] || "cypress/smart-logs");
    });
}
exports.install = install;
function clearFiles(directory) {
    if (!fs.existsSync(directory))
        return null;
    var files = fs.readdirSync(directory);
    try {
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            fs.unlink(path.join(directory, file), function (err) { return err && console.log(err); });
        }
    }
    catch (err) {
        console.log(err);
    }
    return null;
}
function writeLogs(filePath, content) {
    try {
        console.log(filePath);
        var resolvedPath = path.resolve(filePath);
        var targetDir = path.dirname(resolvedPath);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        fs.appendFileSync(resolvedPath, content);
    }
    catch (err) {
        console.log(err);
    }
    return null;
}
