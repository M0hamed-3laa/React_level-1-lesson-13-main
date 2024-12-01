import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import "./editTask.css";
import ThemeContexttt from "../../context/ThemeContext";
import TitleTaskesSection from "./TitleTaskesSection";
import SubTaskesSection from "./SubTaskesSection";
import BTNSection from "./BTNSection";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/Config";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../comp/Loading";
import ReactLoading from "react-loading";

import {
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/Config";

const EditTask = () => {
  //Global State
  const [user, loading, error] = useAuthState(auth);
  const { theme } = useContext(ThemeContexttt);
  const { idString } = useParams();
  const nav = useNavigate();
  //SupTaskes Section State
  const [showAddNewTaskes, setShowAddNewTaskes] = useState(false);
  const [newTaskeInput, setNewTaskeInput] = useState("");
  //BTN Section State
  const [showData, setShowData] = useState(false);

  //=================
  // Title Section
  //=================
  const titleInput = async (eo) => {
    await updateDoc(doc(db, user.uid, idString), {
      title: eo.target.value,
    });
  };
  //=================
  // SupTaskes Section
  //=================
  const completedCheckBox = async (eo) => {
    if (eo.target.checked) {
      await updateDoc(doc(db, user.uid, idString), {
        completed: true,
      });
    } else {
      await updateDoc(doc(db, user.uid, idString), {
        completed: false,
      });
    }
  };
  const trashIcon = async (item) => {
    await updateDoc(doc(db, user.uid, idString), {
      details: arrayRemove(item),
    });
  };
  const addMoreBTN = (eo) => {
    eo.preventDefault();
    setShowAddNewTaskes(true);
  };
  const cancelBTN = (eo) => {
    eo.preventDefault();

    setShowAddNewTaskes(false);
    setNewTaskeInput("");
  };
  const addBTN = async (eo) => {
    eo.preventDefault();
    setNewTaskeInput("");
    if (newTaskeInput !== "") {
      await updateDoc(doc(db, user.uid, idString), {
        details: arrayUnion(newTaskeInput),
      });
    }
  };
  const inputNewTaske = (eo) => {
    eo.preventDefault();
    setNewTaskeInput(eo.target.value);
  };
  //=================
  // BTN Section
  //=================

  const deleteBTN = async (eo) => {
    setShowData(true);
    await deleteDoc(doc(db, user.uid, idString));
    nav("/");
  };
  if (error) {
    return (
      <>
        <Helmet>
          <title>Edit Page</title>
          <style type="text/css">{`.Light main h1 span{color: #222}`}</style>
        </Helmet>
        <Header />
        <main>
          <h1>{error.message}</h1>
        </main>
        <Footer />
      </>
    );
  }

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return (
      <div className={`${theme}`}>
        <Helmet>
          <title>edit task Page</title>
        </Helmet>

        <Header />
        {showData ? (
          <main>
            <ReactLoading type={"spin"} color={"teal"} height={90} width={90} />
          </main>
        ) : (
          <div className="edit-task">
            {/* Title */}
            <TitleTaskesSection
              user={user}
              idString={idString}
              titleInput={titleInput}
            />

            {/* Sub-tasks section */}
            <SubTaskesSection
              user={user}
              idString={idString}
              completedCheckBox={completedCheckBox}
              trashIcon={trashIcon}
              addMoreBTN={addMoreBTN}
              showAddNewTaskes={showAddNewTaskes}
              cancelBTN={cancelBTN}
              addBTN={addBTN}
              inputNewTaske={inputNewTaske}
              newTaskeInput={newTaskeInput}
            />
            {/* Add-more BTN && Delete BTN */}

            <BTNSection user={user} idString={idString} deleteBTN={deleteBTN} />
          </div>
        )}

        <Footer />
      </div>
    );
  }
};

export default EditTask;
