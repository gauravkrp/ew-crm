export const ROLE_ADMIN = 'admin'
export const ROLE_EMPLOYEE = 'employee'
export const ROLE_EMPLOYEE_WITH_DELETE = 'employee_with_delete'

// TODO:
// DO EVERY TIME IN STYTCH: add trusted

const objects = {
    student_leads : {
        READ: false,
        WRITE:false,
        UPDATE: false,
        DELETE: false
    }
}

export const getPermissions = (role: string) =>{
    let permission = {...objects}
    switch(role){
        case ROLE_ADMIN:
            permission.student_leads = {
                READ: true,
                WRITE: true,
                UPDATE: true,
                DELETE: true
            }
            return permission
        case ROLE_EMPLOYEE:
            permission.student_leads = {
                READ: true,
                WRITE:true,
                UPDATE: true,
                DELETE: false
            }
            return permission
        case ROLE_EMPLOYEE_WITH_DELETE:
            permission.student_leads = {
                READ: true,
                WRITE:true,
                UPDATE: true,
                DELETE: true
            }
            return permission
    }
}

