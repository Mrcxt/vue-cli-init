export default {
  shortcuts: [
    {
      text: "今日",
      onClick(picker) {
        const end = dayjs().toDate();
        const start = dayjs().toDate();
        picker.$emit("pick", [start, end]);
      }
    },
    {
      text: "昨日",
      onClick(picker) {
        const end = dayjs()
          .subtract(1, "day")
          .toDate();
        const start = dayjs()
          .subtract(1, "day")
          .toDate();
        picker.$emit("pick", [start, end]);
      }
    },
    {
      text: "近7日",
      onClick(picker) {
        const end = dayjs().toDate();
        const start = dayjs()
          .subtract(7, "day")
          .toDate();
        picker.$emit("pick", [start, end]);
      }
    },
    {
      text: "近30日",
      onClick(picker) {
        const end = dayjs().toDate();
        const start = dayjs()
          .subtract(30, "day")
          .toDate();
        picker.$emit("pick", [start, end]);
      }
    }
  ]
};
