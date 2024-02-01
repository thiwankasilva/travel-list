export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start Adding Items</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage =
    numItems !== 0 ? Math.round((numPacked / numItems) * 100) : 0;
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You Got everything ready to Go"
          : `You have ${numItems} items on your list,
       and you already packed ${numPacked}(${percentage}%)}`}
      </em>
    </footer>
  );
}
