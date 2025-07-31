import React from "react";
import { Typography, Link } from "@mui/material";

// const phoneNumber = '+963987654321'; // Example: Syria number

const PhoneWhatsAppLink = ({ phoneNumber }) => {

  const whatsappLink = `https://wa.me/${phoneNumber.replace("+", "")}`;

  return (
    <Typography>
      <strong>Phone:{" "}</strong>
      <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
        {phoneNumber}
      </Link>
    </Typography>
  );
};
export default PhoneWhatsAppLink;
