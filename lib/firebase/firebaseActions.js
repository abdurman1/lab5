
import firebase from 'firebase/app';
import 'firebase/database';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const addTaskToFirebase = async (task) => {
  const taskRef = firebase.database().ref('Tasks');
  const newTaskRef = taskRef.push();
  await newTaskRef.set(task);
};
