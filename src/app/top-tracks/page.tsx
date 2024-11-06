import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import { getSpotifyTopTracks } from "@/utils/spotify";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function TopTracksPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const placeHolderImage = "https://iili.io/HlHy9Yx.png";

  try {
    const topTracks = await getSpotifyTopTracks();
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Your Top Tracks</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topTracks.items.map((track) => (
            <Card key={track.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <Image
                  src={track.album.images[0]?.url ?? placeHolderImage}
                  alt={track.name}
                  width={400}
                  height={400}
                  className="h-48 w-full object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg">{track.name}</CardTitle>
                <p className="text-sm text-gray-500">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error while fetching top tracks", error);
    return <div>Error while fetching top tracks. Please try again</div>;
  }
}
