import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import {
  getSpotifyUserProfile,
  getSpotifyUserPlayList,
  getSpotifyUserListeningHistory,
} from "@/utils/spotify";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const placeHolderImage = "https://iili.io/HlHy9Yx.png";

  try {
    const [profile, playlist, recentlyPlayed] = await Promise.all([
      getSpotifyUserProfile(),
      getSpotifyUserPlayList(),
      getSpotifyUserListeningHistory(),
    ]);

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">
          Welcome, {profile.display_name}
        </h1>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">Your Playlists</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {playlist.items.slice(0, 6).map((playlist) => (
              <Card key={playlist.id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <Image
                    src={playlist.images?.[0]?.url ?? placeHolderImage}
                    alt={playlist.name}
                    width={400}
                    height={400}
                    className="h-48 w-full object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg">{playlist.name}</CardTitle>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">Recently Played</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentlyPlayed.items.slice(0, 6).map((item) => (
              <Card
                key={`${item.track.id}-${item.played_at}`}
                className="overflow-hidden"
              >
                <CardHeader className="p-0">
                  <Image
                    src={item.track.album.images?.[0]?.url ?? placeHolderImage}
                    alt={item.track.name}
                    width={400}
                    height={400}
                    className="h-48 w-full object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg">{item.track.name}</CardTitle>
                  <p className="text-sm text-gray-500">
                    {item.track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                  <p className="text-xs text-gray-400">
                    Played: {new Date(item.played_at).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="flex justify-center space-x-4">
          <Link href="/top-artists">
            <Card className="cursor-pointer hover:bg-gray-100">
              <CardContent className="flex items-center justify-center p-6">
                <span className="text-lg font-semibold">View Top Artists</span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/top-tracks">
            <Card className="cursor-pointer hover:bg-gray-100">
              <CardContent className="flex items-center justify-center p-6">
                <span className="text-lg font-semibold">View Top Tracks</span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/recently-played">
            <Card className="cursor-pointer hover:bg-gray-100">
              <CardContent className="flex items-center justify-center p-6">
                <span className="text-lg font-semibold">
                  View All Recently Played
                </span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error while fetching dashboard data", error);
    return <div>Error while fetching dashboard data. Please try again</div>;
  }
}
