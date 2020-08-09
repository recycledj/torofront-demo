import React from 'react';
import Dialog from '@material-ui/core/Dialog';

export default function FormDialog({ open, children }) {

  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth={true}>
        { children }
      </Dialog>
    </div>
  );
}
