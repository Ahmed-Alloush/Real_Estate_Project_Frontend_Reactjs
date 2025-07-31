import React from 'react';
import { Typography, Link } from '@mui/material';

// const email = 'office@example.com';

const EmailLink = ({email}) => (
  <Typography>
   <strong> Email:{' '}</strong>
    <Link href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
      {email}
    </Link>
  </Typography>
);

export default EmailLink;
