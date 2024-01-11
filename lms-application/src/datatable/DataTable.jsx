export const userColumns = [
    { field: "id", headerName: "ID", width: 100 },
    {
        field: "",
        headerName: "Avatar",
        width: 130,
        renderCell: (params) => {
            return (
                <img
                    style={{ height: "4vh", width: "4vh", borderRadius: "50%" }}
                    src={params.row.image_url}
                    alt="avatar"
                />
            );
        },
    },
    {
        field: "user_name",
        headerName: "Username",
        width: 130,
    },
    {
        field: "role",
        headerName: "Role",
        width: 100,
    },
    {
        field: "created_at",
        headerName: "Date Created",
        width: 200,
    },
    // {
    //     field: "phone",
    //     headerName: "Phone",
    //     width: 160,
    //     renderCell: (params) => {
    //         return (
    //             <div className={`cellWithStatus ${params.row.status}`}>
    //                 {params.row.status}
    //             </div>
    //         );
    //     },
    // },
];

export const enrolleeColumns = [
    { field: "id", headerName: "ID", width: 100 },
    {
        field: "full_name",
        headerName: "Name",
        width: 130,
    },
    {
        field: "date_of_birth",
        headerName: "Birthday",
        width: 130,
    },
    {
        field: "gender",
        headerName: "Gender",
        width: 100,
    },
    {
        field: "phone_number",
        headerName: "Contact",
        width: 130,
    },
    {
        field: "email",
        headerName: "Email",
        width: 200,
    },
    {
        field: "nationality",
        headerName: "Nationality",
        width: 130,
    },
    {
        field: "guardian_name",
        headerName: "Guardian",
        width: 200,
    },
    {
        field: "guardian_relationship",
        headerName: "Guardian Relationship",
        width: 200,
    },
    {
        field: "guardian_phone",
        headerName: "Guardian Contact",
        width: 130,
    },
    {
        field: "previous_school",
        headerName: "Former School",
        width: 200,
    },
    {
        field: "grade_completed",
        headerName: "Former Grade",
        width: 130,
    },
    {
        field: "enrolled_at",
        headerName: "Date Enrolled",
        width: 200,
    },
];

export const studentColumns = [
    { field: "id", headerName: "ID", width: 100 },
    {
        field: "full_name",
        headerName: "Name",
        width: 130,
    },
    {
        field: "date_of_birth",
        headerName: "Birthday",
        width: 130,
    },
    {
        field: "gender",
        headerName: "Gender",
        width: 100,
    },
    {
        field: "phone_number",
        headerName: "Contact",
        width: 130,
    },
    {
        field: "email",
        headerName: "Email",
        width: 200,
    },
    {
        field: "nationality",
        headerName: "Nationality",
        width: 130,
    },
    {
        field: "guardian_name",
        headerName: "Guardian",
        width: 200,
    },
    {
        field: "guardian_relationship",
        headerName: "Guardian Relationship",
        width: 200,
    },
    {
        field: "guardian_phone",
        headerName: "Guardian Contact",
        width: 130,
    },
    {
        field: "previous_school",
        headerName: "Former School",
        width: 200,
    },
    {
        field: "grade_completed",
        headerName: "Former Grade",
        width: 130,
    },
    {
        field: "date_enrolled",
        headerName: "Date Enrolled",
        width: 200,
    },
    {
        field: "created_at",
        headerName: "Date Accepted",
        width: 200,
    },
];
