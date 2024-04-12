import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { UpdateForm } from "@/components/UpdateForm";

const profile = () => {
  fetch("https://fakestoreapi.com/users")
    .then((res) => res.json())
    .then((json) => console.log(json));

  return <UpdateForm />;
};

export default profile;

const styles = StyleSheet.create({});
