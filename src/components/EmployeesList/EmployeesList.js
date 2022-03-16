import EmployeesListItem from "../EmployeesListItem/EmployeesListItem";
import './EmployeesList.css'


const EmployeesList = ({ data, onDelete, onToggleProp }) => {

    return (
        <ul className='app-list list-group'>
            {
                data.map(item => <EmployeesListItem key={item.id}
                    name={item.name} salary={item.salary}
                    increase={item.increase} rise={item.rise}
                    onDelete={() => onDelete(item.id)}
                    onToggleProp={(e) => onToggleProp(item.id, e.currentTarget.getAttribute('data-toggle'))} />)
            }
        </ul>
    )
}

export default EmployeesList;