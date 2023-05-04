export function Image(props) {
  return (
    <div>
      <h1>Yehor Kompaniiets</h1>
      <img src={props.src} alt="Myphoto" className="photo"/>
    </div>
  );
}