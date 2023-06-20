
import { useParams } from "react-router-dom"
import { Calendar, Kanban, Editor, Colorpicker } from '../../components'

const Apps = () => {

    const { folder, file } = useParams()
    const Capitalize = (str) => {
        return str && str.charAt(0).toUpperCase() + str.slice(1);
    }
    const trimHyphen = (str) => {
        return str && str.indexOf('-') !== -1 ? str.replace('-', '') : str
    }
    // const filesArr = ['Calendar', 'Kanban', 'Editor', 'Colorpicker']

    if (Capitalize(trimHyphen(file)) == 'Calendar') return <Calendar />
    if (Capitalize(trimHyphen(file)) == 'Kanban') return <Kanban />
    if (Capitalize(trimHyphen(file)) == 'Editor') return <Editor />
    if (Capitalize(trimHyphen(file)) == 'Colorpicker') return <Colorpicker />


}

export default Apps