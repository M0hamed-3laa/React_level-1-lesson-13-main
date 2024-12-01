import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/Config";
import Loading from "../../comp/Loading";
import { doc } from "firebase/firestore";
import Moment from "react-moment";
function SubTaskesSection({
  user,
  idString,
  completedCheckBox,
  trashIcon,
  addMoreBTN,
  showAddNewTaskes,
  addBTN,
  cancelBTN,
  inputNewTaske,
  newTaskeInput,
}) {
  const [value, loading, error] = useDocument(doc(db, user.uid, idString));

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <>
        <main>
          <h1>{error.message}</h1>
        </main>
      </>
    );
  }
  if (value) {
    return (
      <section className="sub-task mtt">
        <div className="parent-time">
          <p className="time">
            Created: <Moment fromNow date={value.data().id} />
          </p>
          <div>
            <input
              onChange={(eo) => {
                completedCheckBox(eo);
              }}
              checked={value.data().completed}
              id="checkbox"
              type="checkbox"
            />
            <label htmlFor="checkbox">Completed </label>
          </div>
        </div>
        <ul>
          {value.data().details.map((item, index) => {
            return (
              <li key={index} className="card-task flex">
                <p>{item}</p>
                <i
                  onClick={() => {
                    trashIcon(item);
                  }}
                  className="fa-solid fa-trash"></i>
              </li>
            );
          })}
        </ul>

        {showAddNewTaskes && (
          <form className="add-new-task flex">
            <input
              type="text"
              className="add-task"
              autoFocus
              value={newTaskeInput}
              onChange={(eo) => inputNewTaske(eo)}
            />
            <button
              onClick={(eo) => {
                addBTN(eo);
              }}
              className="add">
              Add
            </button>
            <button
              onClick={(eo) => {
                cancelBTN(eo);
              }}
              className="cancel">
              Cancel
            </button>
          </form>
        )}
        <div className="center">
          <button
            onClick={(eo) => {
              addMoreBTN(eo);
            }}
            className="add-more-btn">
            Add more <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </section>
    );
  }
}

export default SubTaskesSection;
