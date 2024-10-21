import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <div className="absolute left-2 top-8">
      {favoriteCount > 0 && (
        <span
          className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-pink-500 rounded-full"
          aria-label={`${favoriteCount} favorite${favoriteCount > 1 ? 's' : ''}`}
        >
          {favoriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;
