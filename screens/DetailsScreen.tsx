import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Fire from '../api/Fire';
import todoColors from '../components/Colors';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

const DetailsScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [run, setRun] = useState([]);
  const [loading, setLoading] = useState(true);
  const [distanceGraph, setDistanceGraph] = useState([]);

  useEffect(() => {
    let firebase = new Fire((error, user) => {
      if (error) {
        return Alert.alert("Uh oh, something went wrong!");
      }

      firebase.getRun(theRun => {
        // theRun.forEach(data => {
        //   //distance.push(data.distance);
        // });
        setRun(theRun);
        setLoading(false);
      });
    });
    makeGraphData(run);

    return () => {
      firebase.detach();
    }
  }, []);

  const makeGraphData = theRun => {
    let distance = [];
    let averageSpeed = [];
    var i;
    for (i = 0; i < theRun.length; i++) {
      var objDist = {};
      var objAvgSpd = {};
      objDist[i + 1] = theRun[i].distance;
      objAvgSpd[i + 1] = theRun[i].averageSpeed;
      //var obj = { i: theRun[i].distance };
      distance.push({
        key: i + 1,
        value: theRun[i].distance
      });
      averageSpeed.push({
        key: i + 1,
        value: theRun[i].averageSpeed
      });
    }
    setDistanceGraph(distance);
    console.log(distanceGraph);
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={todoColors.blue} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text> Distance {distanceGraph[0]}</Text>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryBar data={distanceGraph} x="session" y="distance (km/h)" />
      </VictoryChart>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingContainer: {
    marginTop: 80,
    justifyContent: 'center'
  },
  text: {
    color: '#ffffff',
    fontSize: 16
  },
  loadingModelContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  imageWrapper: {
    width: 280,
    height: 280,
    padding: 10,
    borderColor: '#cf667f',
    borderWidth: 5,
    borderStyle: 'dashed',
    marginTop: 40,
    marginBottom: 10,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 250,
    height: 250,
    position: 'absolute',
    top: 10,
    left: 10,
    bottom: 10,
    right: 10
  },
  predictionWrapper: {
    height: 100,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  transparentText: {
    color: '#ffffff',
    opacity: 0.7
  },
  footer: {
    marginTop: 40
  },
  poweredBy: {
    fontSize: 20,
    color: '#e69e34',
    marginBottom: 6
  },
  tfLogo: {
    width: 125,
    height: 70
  }
});
