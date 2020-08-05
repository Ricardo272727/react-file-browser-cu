# file-browser-cu

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Describe file-browser-cu here.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo


# A simple file browser library for react.

## Usage 

`
const files = [
  { path: 'src/functions/styles.css' },
  { path: 'hook.js' },
  { path: 'src/functions/' }
];

function exampleFileBrowser(props){

  const onClickFile = (file) => {
    console.log('click on file', file);
  };

  const onClickFolder = (folder) => {
    console.log('click folder', folder);
  };
  
  const onOpenFolder = (folder) => {
    console.log('open folder', folder);
  };

  const onCloseFolder = (folder) => {
    console.log('close folder', folder);
  };

  return (
    <div className="demo">
       <FileBrowserCu 
        files={files}
        onClickFile={onClickFile}
        onClickFolder={onClickFolder}
        onOpenFolder={onOpenFolder}
        onCloseFolder={onCloseFolder}
      />
    </div>
  );
}
`







