import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

type SpotifyUserProfile = {
  display_name: string;
  email: string;
};

type SpotifyPlaylist = {
  items: Array<{
    id: string;
    name: string;
    images: Array<{
      url: string;
    }>;
  }>;
};

type SpotifyTrack = {
  id: string;
  name: string;
  album: {
    images: Array<{
      url: string;
    }>;
  };
  artists: Array<{
    name: string;
  }>;
};

type SpotifyListeningHistory = {
  items: Array<{
    track: SpotifyTrack;
    played_at: string;
  }>;
};

type SpotifyArtist = {
  id: string;
  name: string;
  images: Array<{
    url: string;
  }>;
  popularity: number;
};

type SpotifyTopArtists = {
  items: SpotifyArtist[];
};

type SpotifyTopTracks = {
  items: SpotifyTrack[];
};

async function getAccessToken() {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    throw new Error("No access token available");
  }
  return session.accessToken;
}

async function spotifyFetch<T>(endpoint: string): Promise<T> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error("No access token available");
  }
  console.log("Using access token:", accessToken);
  const response = await fetch(`${SPOTIFY_API_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Spotify API error:", response.status, errorBody);
    throw new Error(`Failed to fetch from Spotify API: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export async function getSpotifyUserProfile(): Promise<SpotifyUserProfile> {
  return spotifyFetch<SpotifyUserProfile>("/me");
}

export async function getSpotifyUserPlayList(): Promise<SpotifyPlaylist> {
  return spotifyFetch<SpotifyPlaylist>("/me/playlists");
}

export async function getSpotifyUserListeningHistory(): Promise<SpotifyListeningHistory> {
  return spotifyFetch<SpotifyListeningHistory>("/me/player/recently-played");
}

export async function getSpotifyTopArtists(
  timeRange = "medium_term",
): Promise<SpotifyTopArtists> {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    throw new Error("No access token available");
  }

  const response = await fetch(
    `${SPOTIFY_API_BASE_URL}/me/top/artists?time_range=${timeRange}&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Spotify API error:", response.status, errorBody);
    throw new Error(`Failed to fetch from Spotify API: ${response.statusText}`);
  }

  return response.json() as Promise<SpotifyTopArtists>;
}

export async function getSpotifyTopTracks(
  timeRange = "medium_term",
): Promise<SpotifyTopTracks> {
  return spotifyFetch<SpotifyTopTracks>(
    `/me/top/tracks?time_range=${timeRange}&limit=50`,
  );
}
