

// src/ok/ 1 => src/
// /src/f/index.html 2 => /
// index.html 3 => ''
const getFirstFolder = (path) => {
  let slashPosition = path.indexOf('/');
  if(slashPosition !== -1 && slashPosition !== 0){
      return path.substring(0, slashPosition + 1);
  } else if(slashPosition === 0){
    return '/' 
  } else {
    return path;
  }
};

const findPatterns = (paths) => {
  let patterns = []; let childs = {};
  for(let i = 0; i < paths.length; i += 1){
    let folder = getFirstFolder(paths[i]);
    if(!patterns.includes(folder)){
      patterns.push(folder);
      childs[folder] = [];
    }
    if(paths[i] !== folder){
      childs[folder].push(paths[i].substring(folder.length))
    }
  }
  return childs;
};

const getStructureFromPaths = (paths) => {
  let patterns = findPatterns(paths);
  let structure = {};
  Object.keys(patterns).map(key => {
    if(patterns[key].length > 0){
      structure[key] = getStructureFromPaths(patterns[key]);
    } else {
      structure[key] = null;
    }
  })
  return structure;
};


let paths = [
  '/src/f/index.html',
  '/src/hook.js',
  '/hola.txt',
  '/src/functions/'
];


let structure = getStructureFromPaths(paths);
let depth = 0;

const getSpaces = (n) => {
  let esp = '';
  for(let i =0; i < n;i+=1){
    esp += ' ';
  }
  return esp;
};


const showStructure = (str, depth) => {
  Object.keys(str).map(s => {
    console.log(getSpaces(depth) + s );
    if(str[s]){
      showStructure(str[s], depth + 5)
    }
  })
};

showStructure(structure, 0);


