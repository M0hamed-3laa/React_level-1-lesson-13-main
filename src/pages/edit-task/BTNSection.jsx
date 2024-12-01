import { doc } from "firebase/firestore";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/Config";

function BTNSection({ deleteBTN, user, idString }) {
  const [value, loading, error] = useDocument(doc(db, user.uid, idString));

  if (value) {
    return (
      <section className="center mtt">
        <div>
          <button
            onClick={(eo) => {
              deleteBTN(eo);
            }}
            className="delete">
            Delete task
          </button>
        </div>
      </section>
    );
  }
}

export default BTNSection;
