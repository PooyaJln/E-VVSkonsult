import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const SaveIcon = ({handleSubmit}) => {
    return ( 
    <button>
        <FontAwesomeIcon
            onSubmit={handleSubmit}
            icon={faFloppyDisk}
        />
    </button> );
}
 
export default SaveIcon;