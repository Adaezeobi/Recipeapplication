import { View, Text } from "react-native";
import React from "react";
import { useState } from "react";
import { Modal } from "react-native";

export default function shoppingListModal() {
  const [modalVisisble, setModalVisible] = useState(false);
  return (
    <View>
      <Modal visible={modalVisisble}></Modal>
    </View>
  );
}
