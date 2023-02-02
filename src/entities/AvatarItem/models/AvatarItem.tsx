
import { Card } from 'react-bootstrap';
const AvatarItem = ({ imageSource, setAvatar, showPopUp }: any) => {
    const selectAvatarHandle = () => {
        setAvatar(imageSource);
        showPopUp(false);
    }
    return (
        <Card style={{
            width: "100px",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px"
        }}>
            <Card.Img
                style={
                    {
                        width: '100px',
                        height: '100px',
                        borderRadius: "10px",
                        cursor: "pointer",
                    }
                }
                variant="top"
                src={imageSource}
                onClick={selectAvatarHandle}
            />
        </Card >

    );
};

export { AvatarItem };