import EmployeeRegisterationForm from "./dynamic/employee";
import StudentRegister from "./Registeration/register"

const StudentRegistrationForm = () => {
    return (
        <div>
            {/* <StudentRegister required /> */}
            {/* using zod for validating fields */}
            <EmployeeRegisterationForm />
        </div>
    )
}

export default StudentRegistrationForm;