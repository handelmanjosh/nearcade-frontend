export default function GameModal({ game }: any) {
  console.log({ game });
  return (
    <div className="p-5 border shadow-lg rounded-md bg-white">
      <div className="text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{game.name}</h3>
        <div className="mt-2">
          <img src={game.img_url} alt={game.name} className="mx-auto mb-4" style={{ maxHeight: '200px', maxWidth: '100%' }} />
          <p className="text-sm text-gray-500">{game.description}</p>
        </div>
        <div className="px-4 py-3">
          <a href={game.url ?? "/controller.png"} target="_blank" className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Play Game
          </a>
        </div>
      </div>
    </div>
  );
};
