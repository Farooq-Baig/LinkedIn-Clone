// src/actions/userActions.js
import { auth, provider, storage, db } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./userType";

// Action creators
export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});

// Thunks
export function signInAPI() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(setUser(result.user));
      })
      .catch((error) => alert(error.message));
  };
}

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });
  };
}

export function signOutAPI() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => dispatch(setUser(null)))
      .catch((error) => console.log(error.message));
  };
}

export function postArticleAPI(payload) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    let downloadURL = "";

    if (payload.image) {
      const storageRef = ref(storage, `images/${payload.image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, payload.image);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Progress logic
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error("Upload error:", error);
            reject(error);
          },
          async () => {
            downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve();
          }
        );
      });
    }

    await addDoc(collection(db, "articles"), {
      actor: {
        description: payload.user.email,
        title: payload.user.displayName,
        date: Timestamp.now(),
        image: payload.user.photoURL,
      },
      video: payload.video || "",
      sharedImg: downloadURL || "",
      comments: 0,
      description: payload.description,
    });

    dispatch(setLoading(false));
  };
}

export function getArticlesAPI() {
  return (dispatch) => {
    const articlesQuery = query(
      collection(db, "articles"),
      orderBy("actor.date", "desc")
    );
    onSnapshot(articlesQuery, (snapshot) => {
      const payload = snapshot.docs.map((doc) => doc.data());
      console.log(payload);
      dispatch({
        type: GET_ARTICLES,
        payload: payload,
      });
    });
  };
}
