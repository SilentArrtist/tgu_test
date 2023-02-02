import { Modal } from "react-bootstrap";
import { AvatarItem } from "../../../entities";
import { imageAPI } from "../../../shared/services/ImageService";
import { GridLayout } from "../../GridLayout/models/GridLayout";

const SelectAvatarPopUp = ({ show, setShow, value, setValue }: any) => {
    const { data: images } = imageAPI.useFetchAllImagesQuery(20);

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Add new User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={
                    {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        // overflowY: "auto"
                    }
                }
            >
                {
                    images
                    &&
                    <GridLayout colCount={4} md={3}>
                        {
                            images?.map((image: any) => (
                                <AvatarItem setAvatar={setValue} showPopUp={setShow} imageSource={image.url} key={image.id} />
                            ))
                        }
                    </GridLayout>
                }

            </Modal.Body>
        </Modal>

    );
};

export { SelectAvatarPopUp };