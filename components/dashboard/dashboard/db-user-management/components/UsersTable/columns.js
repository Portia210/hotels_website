import dayjs from "dayjs";

export const columns = [
  {
    header: "Full name",
    size: 200,
    cell: (props) => {
      const firstName = props.row.original.firstName;
      const lastName = props.row.original.lastName;
      const fullName = `${firstName} ${lastName}`;
      return <span>{fullName}</span>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 200,
    cell: (props) => {
      return <span>{props.getValue()}</span>;
    },
  },
  {
    accessorKey: "agentNumber",
    header: "Agent Number",
    size: 180,
    meta: {
      headerAlign: "center",
      align: "center",
    },
    cell: (props) => {
      return <span>{props.getValue()}</span>;
    },
  },
  {
    accessorKey: "subscription",
    header: "Plan",
    meta: {
      headerAlign: "center",
      align: "center",
    },
    cell: (props) => {
      return <span>{props.getValue().name}</span>;
    },
  },
  {
    header: "Monthly Payment",
    size: 200,
    meta: {
      headerAlign: "center",
      align: "center",
    },
    cell: (props) => {
      return <span>20$</span>;
    },
  },
  {
    header: "Total Payment",
    size: 150,
    meta: {
      headerAlign: "center",
      align: "center",
    },
    cell: (props) => {
      return <span>200$</span>;
    },
  },
  {
    accessorKey: "createdAt",
    size: 100,
    header: "Joined Date",
    meta: {
      headerAlign: "center",
      align: "center",
    },
    cell: (props) => {
      const formatValue = dayjs(props.getValue()).format("DD/MM/YYYY");
      return <span>{formatValue}</span>;
    },
  },
];
