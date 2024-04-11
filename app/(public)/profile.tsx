import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { CustomForm } from "@/components/CustomForm";

const profile = () => {
  fetch("https://fakestoreapi.com/users")
    .then((res) => res.json())
    .then((json) => console.log(json));

  return <CustomForm />;
};

export default profile;

const styles = StyleSheet.create({});
