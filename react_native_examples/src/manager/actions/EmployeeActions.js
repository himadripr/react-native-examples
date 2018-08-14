import EMPLOYEE_UPDATE from './Types'
//one action creator for any update within the form
export const employeeUpdate = ({prop, value}) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: {prop, value}
    }
}