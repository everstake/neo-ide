import React from "react";
import Button from '@material-ui/core/Button';

export default (message, variant, group, callBack) => ({
    message: message,
    options: {
      variant: variant,
      group: group,
      action: key => (
        <Button onClick={() => {callBack(key)}}>close</Button>
      )
    }
});