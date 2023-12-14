export const userColumns = [
    { field: "user_code", headerName: "ID", width: 100 },
    {
        field: "user",
        headerName: "User",
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
        field: "name",
        headerName: "Name",
        width: 130,
    },
    {
        field: "role",
        headerName: "Role",
        width: 100,
    },
    {
        field: "email",
        headerName: "Email",
        width: 230,
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
