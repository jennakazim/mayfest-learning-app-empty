import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import { getSpotifyUserListeningHistory } from "@/utils/spotify";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function RecentlyPlayedPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const placeHolderImage = "https://iili.io/HlHy9Yx.png";

  try {
    const recentlyPlayed = await getSpotifyUserListeningHistory();
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Recently Played</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentlyPlayed.items.map((item) => (
            <Card
              key={`${item.track.id}-${item.played_at}`}
              className="overflow-hidden"
            >
              <CardHeader className="p-0">
                <Image
                  src={item.track.album.images[0]?.url ?? placeHolderImage}
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
      </div>
    );
  } catch (error) {
    console.error("Error while fetching recently played tracks", error);
    return (
      <div>Error while fetching recently played tracks. Please try again</div>
    );
  }
}
