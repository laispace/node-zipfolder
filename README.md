
# Usage - zip a folder to current path

        var Q = require('q');
        var zip = require('zipfolder');

        // test-folder/ => test-folder.zip
        zip.zipFolder({folderPath: 'test-folder'}, function (err, path) {
           if (err) {
               console.log(err);
           } else {
               console.log(path);
           }
        });

# Usage - zip a folder to other path

        // test-folder/ => output-folder/test-folder.zip
        zip.zipFolder({folderPath: 'test-folder', targetFolderPath: 'output-folder'}, function (err, path) {
            if (err) {
                console.log(err);
            } else {
                console.log(path);
            }
        });

# Usage - use Q promise

        // use Q promise
        zip.zipFolder({folderPath: 'test-folder', targetFolderPath: 'output-folder'})
            .then(function (path) {
                console.log(path);
            }, function (err) {
                console.log(err);
            });





