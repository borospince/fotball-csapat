const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;
  const competition = String(req.query.competition || "PL").toUpperCase();

  if (!apiKey) {
    return res.status(503).json({
      message: "FOOTBALL_DATA_API_KEY nincs beallitva a backend .env fajlban.",
    });
  }

  try {
    const response = await fetch(
      `https://api.football-data.org/v4/competitions/${competition}/standings`,
      {
        headers: {
          "X-Auth-Token": apiKey,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: data?.message || "Nem sikerult lekerdezni az elo tabellat.",
      });
    }

    const totalStanding =
      (data.standings || []).find((s) => s.type === "TOTAL") ||
      (data.standings || [])[0];

    const rows = (totalStanding?.table || []).map((entry) => ({
      team: entry.team?.shortName || entry.team?.name || "Ismeretlen",
      played: Number(entry.playedGames || 0),
      wins: Number(entry.won || 0),
      draws: Number(entry.draw || 0),
      losses: Number(entry.lost || 0),
      gf: Number(entry.goalsFor || 0),
      ga: Number(entry.goalsAgainst || 0),
      gd: Number(entry.goalDifference || 0),
      pts: Number(entry.points || 0),
    }));

    return res.json({
      competition: data?.competition?.name || competition,
      season: data?.season?.currentMatchday || null,
      updatedAt: new Date().toISOString(),
      rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Szerverhiba az elo tabella lekerese kozben.",
      error: error.message,
    });
  }
});

module.exports = router;
