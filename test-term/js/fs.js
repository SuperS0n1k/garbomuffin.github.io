/// <reference path="../jquery.d.ts" />

// the file system manager

/**
 * The File System API.
 *
 * fs.createFile(file) - makes a file with the given name, returns true on success
 *
 * fs.createDirectory(dir) - makes a directory with the given name, returns true on success
 *
 * fs.readFile(file) - returns the contents of the file or null if it's a directory or doesn't exist
 *
 * fs.listContents(dir) - returns an array containing the contents of an array, null if it doesn't exist
 *
 * fs.isDirectory(dir) - returns whether or not the given path is a directory, null if it doesn't exist
 *
 * Although you can edit and read the data directly in itself, it is highly discouraged because the data
 * format can change and the functions themselves will always work.
 *
 * Methods starting with an _ are used internally, do not use them!
 */
var fsData = new Map();

var fs = {
  data: [ // incredibly inefficient, but it works!
    {
      _dirName: "dev",
      null: {
        contents: "testing",
        isFile: true,
      }
    },
  ],
  createFile: function(file){
    fs.data.push(file);
  },
  createDirectory: function(dir){

  },
  readFile: function(file){
    var loc = file.split("/");
    _recursiveReadFile("");
    // var contents = fs.data[file.replace(/\./g, "/")];
    // return contents === null ? null : contents;
  },
  listContents: function(folder){
    // var contents;
    // try{
    //   contents = fs.data[file.replace(/\./g, "/")];
    // }catch(e){
    //   return null;
    // }
    // return contents;
  },
  isDirectory: function(dir){
    // var contents;
    // try{
    //   contents = fs.data[file.replace(/\./g, "/")];
    // }catch(e){
    //   return null;
    // }
    // return contents.isFile !== true;
  },
  isFile: function(f){
    return !isDirectory(f);
  },
  _recursiveReadFile: function(f){

  }
};
