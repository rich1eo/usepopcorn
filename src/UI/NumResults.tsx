interface NumResultsProps {
  moviesLen: number;
}

function NumResults({ moviesLen }: NumResultsProps) {
  return (
    <p className="num-results">
      Found <strong>{moviesLen}</strong> results
    </p>
  );
}

export default NumResults;
