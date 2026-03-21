export function Line({ h = 14, w = "100%" }: { h?: number; w?: number | string }) {
  return <div className="skel" style={{ height: h, width: w, borderRadius: 6, margin: "8px 0" }} />;
}

export function CardSkeleton() {
  return (
    <div className="card">
      <Line h={18} w="70%" />
      <Line />
      <Line w="60%" />
    </div>
  );
}