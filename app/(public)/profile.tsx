import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { UpdateForm } from "@/components/UpdateForm";
import { useAdmin, useUser } from "@/store/store";
import { useDeleteUser, useUsers } from "@/api/useUsers";
import { Ionicons } from "@expo/vector-icons";
import { ToastMessage, showToast } from "@/components/ToastMessage";
import { ConfirmationModal } from "@/components/ConfirmationModal";

type UserData = [
  {
    email: string;
    username: string;
    password: string;
    phone: string;
    name: object;
  }
];

const profile = () => {
  const { data: userList } = useUsers();
  const { username } = useUser();
  const [currentUser, setCurrentUser] = useState<UserData>();
  const [selectedUser, setSelectedUser] = useState<UserData>();
  const [modalVisible, setModalVisible] = useState(false);

  const { isAdmin } = useAdmin();

  useEffect(() => {
    const findUser = userList?.filter(
      (user: any) => user.username === username
    );
    findUser && setCurrentUser(findUser[0]);
  }, [username]);

  useEffect(() => {
    if (selectedUser) {
      setCurrentUser(selectedUser);
    }
  }, [selectedUser]);

  return (
    <View style={{ height: "100%", overflow: "scroll" }}>
      {!isAdmin && currentUser && <UpdateForm currentUser={currentUser} />}

      <ToastMessage />

      {isAdmin && (
        <UserCard
          userList={userList}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </View>
  );
};

const UserCard = ({
  userList,
  setSelectedUser,
  selectedUser,
  modalVisible,
  setModalVisible,
}: any) => {
  const { mutate: deleteUser } = useDeleteUser();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleDelete = (userId: any) => {
    deleteUser(userId, {
      onSuccess: () => {
        setIsConfirmed(false);
        showToast({
          title: "Success",
          message: "User deleted successfully.",
        });
      },
    });
  };
  return (
    <View style={{ margin: 15, gap: 8 }}>
      {userList?.map((user: any) => {
        return (
          <View
            key={user?.id}
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text>
                User: <Text style={styles.boldText}>{user?.username}</Text>
              </Text>
              <Text>
                Name:{" "}
                <Text style={styles.boldText}>
                  {user?.name?.firstname} {user?.name?.lastname}
                </Text>
              </Text>
              <Text>
                Email: <Text style={styles.boldText}>{user?.email}</Text>
              </Text>
              <Text>
                Phone: <Text style={styles.boldText}>{user?.phone}</Text>
              </Text>
            </View>

            <View
              style={{
                justifyContent: "space-between",
                gap: 15,
                flexDirection: "row",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                style={{ ...styles.button }}
                onPress={() => {
                  setModalVisible(true);
                  setSelectedUser(user);
                }}
              >
                <Ionicons name="create-outline" size={32} color={"green"} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ ...styles.button }}
                onPress={() => setIsConfirmed(true)}
              >
                <Ionicons name="trash-outline" size={32} color={"red"} />
              </TouchableOpacity>

              <ConfirmationModal
                isConfirmed={isConfirmed}
                setIsConfirmed={setIsConfirmed}
                message={
                  "Are you sure you want to delete this item? This action cannot be undone."
                }
                ButtonName={"Delete"}
                onPress={() => handleDelete(user?.id)}
                style={{ backgroundColor: "red" }}
              />
            </View>
          </View>
        );
      })}

      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={{ margin: 15 }}>
          <TouchableHighlight
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Ionicons name="arrow-back-outline" size={32} color={"black"} />
          </TouchableHighlight>

          <Text
            style={{ alignSelf: "center", fontSize: 20, fontWeight: "600" }}
          >
            Update User Details
          </Text>

          <View>
            {selectedUser && <UpdateForm currentUser={selectedUser} />}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 25,
    backgroundColor: "white",
  },
  boldText: {
    fontWeight: "600",
  },
});
