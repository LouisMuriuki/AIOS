import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ModalContextProvider } from './context/ModalContext'
import AppStack from './navigation/AppStack'

const Main = () => {
  return (
    <ModalContextProvider>
       <AppStack/>
    </ModalContextProvider>
  )
}

export default Main

const styles = StyleSheet.create({})