import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import TaskList from './src/screens/TaskList';
import Auth from './src/screens/Auth';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor='black' />
      <Auth/>
      {/*<TaskList/>*/}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
