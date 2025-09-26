const ProgressUI = ({
  rangeColor,
  rangePercent,
  wholeColor,
  wholePercent,
}: {
  rangeColor: string;
  rangePercent: string;
  wholeColor: string;
  wholePercent: string;
}) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "5px",
        borderRadius: "5px",
        overflow: "hidden",
      }}
    >
      <div style={{ width: rangePercent, backgroundColor: rangeColor }}></div>
      <div style={{ width: wholePercent, backgroundColor: wholeColor }}></div>
    </div>
  );
};

export default ProgressUI;
