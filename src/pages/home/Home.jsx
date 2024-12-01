import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Loading from "../../comp/Loading";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/Config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { useContext, useState } from "react";
import ThemeContexttt from "../../context/ThemeContext";
import { Helmet } from "react-helmet-async";
import "./home.css";
import { doc, setDoc } from "firebase/firestore";
import HomeModal from "./HomeModal";
import AllTaskesSection from "./AllTaskesSection";
const Home = () => {
  const { theme } = useContext(ThemeContexttt);
  const [user, loading, error] = useAuthState(auth);
  const [showModal, setshowModal] = useState(false);
  const [details, setDetails] = useState([]);
  const [inputDetails, setinbutDetails] = useState("");
  const [title, setTitle] = useState("");
  const [submitLodaing, setSubmitLodaing] = useState(true);
  const [successfullyMassgeShow, setSuccessfullyMassgeShow] = useState("");

  // Send Verify to Email(if user Not Verify)
  const sendAgain = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Email verification sent!");
      // ...
    });
  };

  //================
  //function of modal
  //=================

  //Close Modal
  const CloseModal = () => {
    setshowModal(false);
    setinbutDetails("");
    setTitle("");
    setDetails([]);
  };

  const titleInbut = (eo) => {
    setTitle(eo.target.value);
  };
  const detailsInbut = (eo) => {
    setinbutDetails(eo.target.value);
  };

  const addTask = (eo) => {
    eo.preventDefault();
    if (inputDetails !== "" && !details.includes(inputDetails)) {
      setDetails([...details, inputDetails]);
      setinbutDetails("");
    }
  };

  const handelSubmit = async (eo) => {
    eo.preventDefault();
    const taskesId = new Date().getTime();
    if (title !== "" && details.length !== 0) {
      setSubmitLodaing(false);
      await setDoc(doc(db, user.uid, `${taskesId}`), {
        title: title,
        details: details,
        id: taskesId,
        completed: false,
      });
      setinbutDetails("");
      setTitle("");
      setDetails([]);
      setSubmitLodaing(true);
      setshowModal(false);
      setSuccessfullyMassgeShow("show");
      setTimeout(() => {
        setSuccessfullyMassgeShow("");
      }, 4000);
    }
  };
  if (error) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
          <style type="text/css">{`.Light main h1 span{color: #222}   `}</style>
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

  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
          <style type="text/css">{`.Light main h1 span{color: #222}   `}</style>
        </Helmet>

        <Header />

        <main className={`${theme}`}>
          <p className="pls">
            Please{" "}
            <Link style={{ fontSize: "30px" }} to="/signin">
              sign in
            </Link>{" "}
            to continue...{" "}
            <span>
              <i className="fa-solid fa-heart"></i>
            </span>
          </p>
        </main>

        <Footer />
      </>
    );
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          <Header />

          <main>
            <p>
              Welcome: {user.displayName}
              <span>
                <i className="fa-solid fa-heart"></i>
              </span>
            </p>

            <p>Please verify your email to continue ✋ </p>
            <button
              onClick={() => {
                sendAgain();
              }}
              className="delete">
              Send email
            </button>
          </main>

          <Footer />
        </>
      );
    }
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
          </Helmet>

          <Header />
          {showModal && (
            <HomeModal
              CloseModal={CloseModal}
              titleInbut={titleInbut}
              detailsInbut={detailsInbut}
              addTask={addTask}
              handelSubmit={handelSubmit}
              submitLodaing={submitLodaing}
              title={title}
              inputDetails={inputDetails}
              details={details}
            />
          )}
          <main className={`home ${theme}`}>



            {/* SHOW all tasks */}
            {<AllTaskesSection user={user} />}

            {/* Add new task BTN */}
            <section className="mt">
              <button
                className="add-task-btn"
                onClick={() => {
                  setshowModal(true);
                }}>
                Add new task <i className="fa-solid fa-plus"></i>
              </button>
            </section>
            <p className={`success-message ${successfullyMassgeShow}`}>
              Successfully <i className="fa-solid fa-clipboard-check"></i>
            </p>
          </main>

          <Footer />
        </>
      );
    }
  }
};

export default Home;
