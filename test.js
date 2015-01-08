var Q = require('q');
var zip = require('./zip');

// test-folder/ => test-folder.zip
zip.zipFolder({folderPath: 'test-folder'}, function (err, path) {
   if (err) {
       console.log(err);
   } else {
       console.log(path);
   }
});

// test-folder/ => output-folder/test-folder.zip
//zip.zipFolder({folderPath: 'test-folder', targetFolderPath: 'output-folder'}, function (err, path) {
//    if (err) {
//        console.log(err);
//    } else {
//        console.log(path);
//    }
//});

//// use Q promise
//zip.zipFolder({folderPath: 'test-folder', targetFolderPath: 'output-folder'})
//    .then(function (path) {
//        console.log(path);
//    }, function (err) {
//        console.log(err);
//    });


