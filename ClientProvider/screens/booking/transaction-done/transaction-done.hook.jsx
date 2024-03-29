import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import TransactionReportServices from '../../../services/transaction/transaction-reports-services';
import ServiceSpecsServices from '../../../services/service-specs/service-specs-services';
import BookingServices from '../../../services/booking/booking-services';
import AddressServices from '../../../services/address/address-services';
import ServiceServices from '../../../services/service/service-services';

import { addressHandler } from '../../../utils/address-handler';

export default ( navigation, route ) => {
  const { reportID } = route.params;
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState();
  const [type, setType] = useState();
  const [cost, setCost] = useState();
  const [desc, setDesc] = useState();

  useEffect(() => {
    ( async() => {
      try {
        let { body: report } = await TransactionReportServices.getTransactionReportsByID(reportID);
        let { body: booking } = await BookingServices.getBookingByID(report.bookingID);

        let { body: specs } = await ServiceSpecsServices.getSpecsByID(report.specsID);
        let { body: address } = await AddressServices.getAddressByID(specs.addressID);
        let { body: service } = await ServiceServices.getService(report.serviceID)

        setAddress(addressHandler(address));
        setType(service.typeName);
        setDesc(booking.description);
        setCost(booking.cost);
      } catch(err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })();
  }, [])

  const onDone = () => {
    navigation.navigate('RequestList');
  }

  return {
    reportID,
    open, setOpen, 
    loading, setLoading,
    address, setAddress,

    type, setType, 
    cost, setCost, 
    desc, setDesc,
    onDone,
  }
}