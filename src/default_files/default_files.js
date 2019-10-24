import Moment from 'moment'

import  domainContent  from './domain.cs.js'; // Relative path to your File

console.log("TEXT: ", domainContent); 
const defaultFiles = [
    {
      key: 'examples_C#/',
      modified: +Moment().subtract(1, 'hours'),
      size: 0,
      file: false,
      saved: true,
      content: "",
      compiled: ""
    },
    {
      key: 'examples_C#/domain.cs',
      modified: +Moment().subtract(1, 'hours'),
      size: 1.5 * 245 * 1024,
      file: true,
      saved: true,
      content: domainContent,
      compiled: ""
    },
  ]

export default defaultFiles 