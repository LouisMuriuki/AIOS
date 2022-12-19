import { BlurView } from "expo-blur";
import { useContext } from "react";
import { Modal, StyleSheet,View } from "react-native";
import { ModalContext } from "../../context/ModalContext";

const MainModal = ({children}) => {
  const { mainModal, setMainModal } = useContext(ModalContext);
  return (
    <Modal
      animationType="slide"
      visible={mainModal}
      transparent={true}
      onRequestClose={() => setMainModal(false)}
    >
      <BlurView
        intensity={100}
        tint="dark"
        style={[styles.nonBlurredContent, { height: "100%" }]}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {children}
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: 330,
    elevation: 5,
  },
  
});

export default MainModal;