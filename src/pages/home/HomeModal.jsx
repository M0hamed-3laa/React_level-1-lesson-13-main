import Modal from "../../shared/Modal";
import ReactLoading from "react-loading";

function HomeModal({
  CloseModal,
  titleInbut,
  detailsInbut,
  addTask,
  details,
  handelSubmit,
  submitLodaing,
  title,
  inputDetails,
}) {
  return (
    <Modal CloseModal={CloseModal}>
      <div className="modal-cotent">
        <input
          onChange={(eo) => {
            titleInbut(eo);
          }}
          value={title}
          required
          placeholder=" Add title : "
          type="text"
        />
        <div>
          <input
            onChange={(eo) => {
              detailsInbut(eo);
            }}
            placeholder=" details "
            type="text"
            value={inputDetails}
          />

          <button
            onClick={(eo) => {
              addTask(eo);
            }}>
            Add
          </button>
        </div>
        {details.map((item, key) => (
          <ul key={key}>
            <li>{item}</li>
          </ul>
        ))}
        <button
          className="submit"
          onClick={async (eo) => {
            handelSubmit(eo);
          }}>
          {submitLodaing ? (
            <>Submit</>
          ) : (
            <ReactLoading
              type={"spin"}
              color={"white"}
              height={20}
              width={20}
            />
          )}
          {/* Submit */}
        </button>
      </div>
    </Modal>
  );
}

export default HomeModal;
