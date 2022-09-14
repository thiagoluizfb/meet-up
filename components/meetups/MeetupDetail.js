import Card from "../ui/Card";

function MeetupDetail(props) {
  return (
    <section>
      <h1>{props.title}</h1>
      <img src={props.src} alt={props.title}/>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
}

export default MeetupDetail;
