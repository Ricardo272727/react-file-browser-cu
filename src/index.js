import React, { useState, useEffect } from 'react';
import "./styles.css";



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



function File({ name, path, onClick }){
  return (
    <button className="file-cu" onClick={() => onClick(path + name)}>
       <span>{name}</span>
    </button>
  )
}

function Folder({
  name = '',
  childs,
  root, 
  prevPath, 
  paddingLeft = '0.4rem',
  borderColor = 'black',
  onClickFile,
  onClickFolder,
  onOpenFolder,
  onCloseFolder
}){
  const [open, setOpen] = useState(false || root);
  const [path, setPath] = useState(prevPath + name);
  const handleClick = () => {
    onClickFolder(path);
    if(open){
      onCloseFolder(path);
    } else {
      onOpenFolder(path);
    }
    setOpen(!open);
  };

  const styles = {
    listChilds: {
       display: open ? 'block' : 'none', 
       paddingLeft: root ? '0px' : paddingLeft,
    },
    title: {
      borderLeft: '0.3rem solid ' + borderColor
    }
  };
  
  return (
    <div className="folder-cu">
      { !root &&
        <button
          className="folder-title"
          onClick={handleClick}
          style={styles.title}
        >
          <span>
            {name}
          </span>
        </button>
      }
      <ul 
        className="folder-childs" 
        style={styles.listChilds}>
        {
          Object.keys(childs).map(key => (
            childs[key] ?
             <Folder 
              name={key}
              key={key}
              childs={childs[key]}
              prevPath={path}
              onClickFile={onClickFile}
              onClickFolder={onClickFolder}
              onOpenFolder={onOpenFolder}
              onCloseFolder={onCloseFolder}
            />
             :
             <File 
               name={key} 
               key={key} 
               onClick={onClickFile} 
               path={path}
            />
          ))
        }
      </ul>
    </div>
  );
}



function FileBrowserCu({
    files, 
    onClickFile, 
    onClickFolder, 
    onOpenFolder, 
    onCloseFolder
}) {
    const [childs, setChilds] = useState(getStructureFromPaths(files.map(f => f.path)));
    console.log(childs);
    return (
      <div className="file-browser-cu">
        <Folder 
          childs={childs}
          root={true}
          prevPath="/"
          onClickFile={onClickFile}
          onClickFolder={onClickFolder}
          onOpenFolder={onOpenFolder}
          onCloseFolder={onCloseFolder}
        />
      </div>
    );
}

const mockItems = [
  { path: 'src/functions/styles.css' },
  { path: 'hook.js' },
  { path: 'src/functions/' }
];

function testFileBrowser(props){

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
        files={mockItems}
        onClickFile={onClickFile}
        onClickFolder={onClickFolder}
        onOpenFolder={onOpenFolder}
        onCloseFolder={onCloseFolder}
      />
    </div>
  );
}


export default testFileBrowser;
