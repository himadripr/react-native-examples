import EMPLOYEE_UPDATE, { EMPLOYEE_NAME_UPDATE, EMPLOYEE_PHONE_UPDATE, EMPLOYEE_SHIFT_UPDATE } from './Types'
//one action creator for any update within the form
export const employeeUpdate = ({prop, value}) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: {prop, value}
    }
}

export const employeeUpdateName = (text) =>{
    return {
        type: EMPLOYEE_NAME_UPDATE,
        payload: text
    }
}

export const employeeUpdatePhone = (text) =>{
    return {
        type: EMPLOYEE_PHONE_UPDATE,
        payload: text
    }
}

export const employeeUpdateShift = (text) =>{
    return {
        type: EMPLOYEE_SHIFT_UPDATE,
        payload: text
    }
}