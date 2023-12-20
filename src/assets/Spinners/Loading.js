import "./Styles/loadspinner.css";

const Loading = () => {
  return (
    <div className="load-lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;
