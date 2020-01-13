import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  RefreshControl
} from "react-native";
import axios from "axios";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);

  async function getFeedbacks() {
    setLoading(true);
    await axios
      .get("https://alex-api-cobranca.herokuapp.com/feedback")
      .then(response => {
        //console.log(response.data);
        setFeedbacks(response.data);
        //console.log(feedbacks);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        Alert.alert("Serviço indisponível");
      });
  }

  useEffect(() => {
    getFeedbacks();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Carregando...</Text>
      </View>
    );
  } else {
    return (
      <FlatList
        style={styles.viewCardFeedbacks}
        data={feedbacks}
        keyExtractor={f => f._id}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <View
              style={{
                margin: 5,
                padding: 5,
                borderWidth: 1,
                borderColor: "#444",
                borderRadius: 8
              }}
            >
              <Text style={{ alignSelf: "flex-start", marginVertical: 10 }}>
                {item.email}
              </Text>
              <Text
                style={{
                  alignSelf: "flex-start",
                  margin: 2,
                  fontSize: 22,
                  fontWeight: "bold"
                }}
              >
                {item.feedback}
              </Text>
              <Text style={{ alignSelf: "center", marginTop: 10 }}>
                {item.dataCompleta}
              </Text>
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getFeedbacks} />
        }
        ListEmptyComponent={
          <View style={[styles.container, styles.loading]}>
            <Text>Nenhum feedback encontrado</Text>
          </View>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    backgroundColor: "#fff"
  },
  viewCardFeedbacks: {
    margin: 5,
    marginTop: 10
  },
  loading: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
});
