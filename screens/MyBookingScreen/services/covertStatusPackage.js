const convertStatusPackage = data => {
  let label = '';
  switch (data) {
    case 'Booking_created':
      label = 'Created';
      break;
    case 'Booking_DP_Confirmed':
      label = 'DP Confirm';
      break;
    case 'Booking_In_Payment':
      label = 'SP Confirm';
      break;
    case 'Booking_Confirmed':
      label = 'Confirmed';
      break;
    case 'Booking_Completed':
      label = 'Completed';
      break;
    case 'Booking_Cancelled':
      label = 'Cancelled';
      break;
    case 'Booking_hold':
      label = 'OnHold';
      break;
    case 'Booking_draft':
      label = 'Quotation';
      break;

    default:
      label = 'accepted';
  }
  return label;
};

export default convertStatusPackage;
