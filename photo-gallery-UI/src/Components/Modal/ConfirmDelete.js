import { Modal, Button } from "@nextui-org/react";

/**
 * Component - Confirm Delete dialog
 */
function ConfirmDelete({ deleteVisible, handleDelete, handleCancel }) {
  return (
    <>
      <Modal open={deleteVisible} width="25%" preventClose>
        <Modal.Header>
          <h4>Confirm Delete</h4>
        </Modal.Header>
        <Modal.Body css={{ textAlign: "center" }}>
          Are your sure? Do you want to delete this image?
        </Modal.Body>
        <Modal.Footer css={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleCancel} css={{ backgroundColor: "$black" }}>
            No
          </Button>
          <Button
            onClick={() => handleDelete(deleteVisible)}
            css={{ backgroundColor: "$black" }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmDelete;
