import ReactMarkdown from "react-markdown";

export default function Recipe(props) {
  return (
    <div className="suggested-recipe-container">
      <h2>Chef Claude Recommends:</h2>
      <ReactMarkdown>{props.recipe}</ReactMarkdown>
    </div>
  );
}
