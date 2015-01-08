var fs = require('fs');
var path = require('path');
var Q = require('q');
var archiver = require('archiver');

function zipFolder (opts, callback) {
    var deferred = Q.defer();

    var folderPath = opts.folderPath;

    if (!folderPath) {
        throw new Error('folder path required!')
    }

    var targetPath = path.join(folderPath + '.zip');
    var output = fs.createWriteStream(targetPath);
    var archive = archiver('zip');

    output.on('finish', function () {
        if (!opts.targetFolderPath) {
            targetPath = targetPath;
        } else  {
            // move to targetFolder
            var oldPath = targetPath;
            var newPath = path.join(opts.targetFolderPath, oldPath);
            fs.renameSync(oldPath, newPath);
            targetPath = newPath;
        }
        deferred.resolve(targetPath);
        console.log('archiver has been finalized: %s, total size: %s', targetPath, parseInt(archive.pointer() / 1024) + 'KB');
    });

    archive.on('error', function(err){
        deferred.reject(err);
    });

    archive.pipe(output);

    function recursiveZipFolder(folderPath, targetFolderPath) {
        var targetFolderPath = targetFolderPath ? targetFolderPath : '';
        var folder = fs.readdirSync(folderPath);
        folder.forEach(function (file) {
            var curPath  = path.join(folderPath, file);
            var stats = fs.statSync(curPath);
            if (stats.isFile()) {
                var basename = path.basename(curPath);
                archive
                    .append(fs.createReadStream(curPath), { name: path.join(targetFolderPath, basename)})
            } else if (stats.isDirectory()) {
                if (file !== folderPath) {
                    recursiveZipFolder(curPath, path.join(targetFolderPath, file));
                }
            }
        });
    }
    recursiveZipFolder(folderPath);

    archive.finalize();

    return deferred.promise.nodeify(callback);
}


exports.zipFolder = zipFolder;