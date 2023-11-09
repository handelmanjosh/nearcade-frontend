import GameModal from "@/components/Game";
import { CONTRACT_ADDRESS } from "@/components/utils";
import { useWallet } from "@/wallets/wallet-selector";
import { useEffect, useState } from 'react';

export default function Account() {

    const { signedAccountId, viewMethod }: any = useWallet();
    const [games, setGames] = useState<any[]>([]);
    const [stats, setStats] = useState<any[]>([]);
    useEffect(() => {
        if (signedAccountId && viewMethod) {
            viewMethod(CONTRACT_ADDRESS, "getGames", {}).then((games: any) => {
                console.log(games);
                setGames(games);
            });
            viewMethod(CONTRACT_ADDRESS, "getStatsForPlayer", { player_id: signedAccountId }).then((stats: any) => {
                setStats(stats);
            });
        }
    }, [signedAccountId, viewMethod]);
    // user can view their listings, challenges, etc
    return (
        <div className="flex flex-col justify-center items-center w-screen">
            <p className="font-bold text-xl">Account: {signedAccountId}</p>
            {games && games.length > 0 &&
                <>
                    <p>Your games</p>
                    <div className="flex flex-row justify-center items-center gap-2">
                        {games.map((game, i) => {
                            console.log(game, i);
                            return (
                                <GameModal game={game} key={i} />
                            );
                        })}
                    </div>
                </>
            }
            <p> Your challenge progress </p>
            <div className="flex flex-row justify-center items-center gap-2">
                {games.map((game, i) => (
                    <div className="flex flex-col justify-center items-center" key={i}>
                        {game.challenges.map((metadata: any, index: number) => {
                            const stat = stats.find((stat: any) => stat.game_id === game.name && stat.challenge_id === index);
                            if (stat) {
                                <Stat stat={stat} statsmetadata={metadata} key={index} />;
                            }
                        })}
                    </div>
                ))}
            </div>
        </div >
    );
}

const Stat = ({ stat, statsmetadata }: { stat: any, statsmetadata: any; }) => {
    // You can use the stat and statsmetadata to render the component as needed
    return (
        <div className="border p-4 rounded shadow-md">
            <h3 className="text-lg font-bold">Player Stat</h3>
            <div className="mt-2">
                <p>Player ID: {stat.player_id}</p>
                <p>Game ID: {stat.game_id}</p>
                <p>Score: {stat.score}</p>
                <div>
                    <h4 className="font-bold">Challenges:</h4>
                    {statsmetadata.map((meta: any, index: number) => (
                        <div key={index} className="mt-1">
                            <p className="font-semibold">{meta.name}:</p>
                            <p>Description: {meta.description}</p>
                            {/* Additional rendering based on the challenge data */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};