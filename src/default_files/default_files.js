import Moment from 'moment'

import domainContentCs from './domain.cs.js';
import domainContentPy from './domain.py.js';

const defaultFiles = [
    {
      key: 'examples_python/',
      modified: +Moment().subtract(1, 'hours'),
      size: 0,
      file: false,
      saved: true,
      compiled: true,
      deployed: false,
      savedContent: "",
      currentContent: "",
      binary: ""
    },{
      key: 'examples_python/domain.py',
      modified: +Moment().subtract(1, 'hours'),
      size: 1.5 * 245 * 1024,
      file: true,
      saved: true,
      compiled: false,
      deployed: false,
      savedContent: domainContentPy,
      currentContent: domainContentPy,
      binary: ""
    },{
      key: 'examples_csharp/',
      modified: +Moment().subtract(1, 'hours'),
      size: 0,
      file: false,
      saved: true,
      compiled: true,
      deployed: false,
      savedContent: "",
      currentContent: "",
      binary: ""
    },{
      key: 'examples_csharp/domain.cs',
      modified: +Moment().subtract(1, 'hours'),
      size: 1.5 * 245 * 1024,
      file: true,
      saved: true,
      compiled: false,
      deployed: false,
      savedContent: domainContentCs,
      currentContent: domainContentCs,
      binary: ""
    },
  ]

export default defaultFiles 