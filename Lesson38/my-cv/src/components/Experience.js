export function Experience({ items }) {
  return (
    <div>
      <h2>Experience:</h2><hr />
      <div>
        {items.map(item => (
          <p key={item.id}>
            <strong>Link:</strong> <a href={item.link}>{item.name}</a><br />
            <strong>Job title:</strong> {item.title}<br />
            <strong>Project/Role description:</strong> {item.description}
          </p>
        ))}
      </div>
    </div>
  )
}