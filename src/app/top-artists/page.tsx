import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import { getSpotifyTopArtists } from "@/utils/spotify";
import TopArtistsClient from "@/app/top-artists/components/TopArtistsClient";
export default async function TopArtistsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  try {
    const initialArtists = await getSpotifyTopArtists("medium_term");

    const handleTimeRangeChange = async (
      timeRange: "short_term" | "medium_term" | "long_term",
    ) => {
      "use server";
      return await getSpotifyTopArtists(timeRange);
    };

    return (
      <TopArtistsClient
        initialArtists={initialArtists}
        onTimeRangeChange={handleTimeRangeChange}
      />
    );
  } catch (error) {
    console.error("Error while fetching top artists", error);
    return <div>Error while fetching top artists. Please try again</div>;
  }
}
