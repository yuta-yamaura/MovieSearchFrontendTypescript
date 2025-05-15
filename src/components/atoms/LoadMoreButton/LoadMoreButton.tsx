import "./LoadMoreButton.css";

type LoadMoreButtonProps = {
  loadMore: () => void;
};

export const LoadMoreButton = ({ loadMore }: LoadMoreButtonProps) => {
  return (
    <button onClick={loadMore} className="load-more-btn">
      もっと見る
    </button>
  );
};
