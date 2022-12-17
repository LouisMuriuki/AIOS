import QRCode from 'react-native-qrcode-svg';
import React from 'react'

const QRcodeGen = ({value, getRef}) => {
  return (
    <QRCode
        value={value}
        size={250}
        color="black"
        backgroundColor="white"
        getRef={getRef}
        />
  )
}

export default QRcodeGen