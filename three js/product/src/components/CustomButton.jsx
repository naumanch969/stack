import state from '../store'
import { useSnapshot } from 'valtio'


const CustomButton = ({ type, title, customStyles, handleClick }) => {
    /////////////////////////////////////////  STATE  /////////////////////////////////////////////
    const snap = useSnapshot(state)

    ///////////////////////////////////////  FUNCTION  /////////////////////////////////////////////
    const generateStyle = (type) => {
        if (type == 'filled') {
            return {
                backgroundColor: snap.color,
                color: '#fff',
            }
        }
    }

    return (
        <button
            onClick={handleClick}
            className={`px-2 py-1.5 flex-1 rounded-md ${customStyles} `}
            style={generateStyle(type)}
        >
            {title}
        </button>
    )
}

export default CustomButton;