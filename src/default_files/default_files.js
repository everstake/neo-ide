import Moment from 'moment'

import  domainContent  from './domain.cs.js'; // Relative path to your File

// isOpen: true,
// isSelected: true,
// keyDerived: true,

console.log("TEXT: ", domainContent); 
const defaultFiles = [
    {
      isDeleting: false,
      isDraft: false,
      isOpen: true,
      isRenaming: false,
      isSelected: false,
      keyDerived: true,
  
      key: 'examples_C#/',
      modified: +Moment().subtract(1, 'hours'),
      size: 0,
      file: false,
      saved: true,
      compiled: true,
      deployed: false,
      savedContent: "",
      currentContent: "",
      binary: ""
    },
    {
      isDeleting: false,
      isDraft: false,
      isOpen: true,
      isRenaming: false,
      isSelected: false,
      keyDerived: true,

      key: 'examples_C#/domain.cs',
      modified: +Moment().subtract(1, 'hours'),
      size: 1.5 * 245 * 1024,
      file: true,
      saved: true,
      compiled: false,
      deployed: false,
      savedContent: domainContent,
      currentContent: domainContent,
      binary: ""
    },
  ]

export default defaultFiles 