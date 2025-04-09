// src/lib/database.js
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'test',
  database: '8ball'
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Helper function to execute database queries
export async function executeQuery({ query, values = [] }) {
  try {
    // Get a connection from the pool
    const [results] = await pool.execute(query, values);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Test the database connection
export async function testConnection() {
  try {
    const results = await executeQuery({ query: 'SELECT 1 as test' });
    return results[0].test === 1;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}

// Get all players
export async function getPlayers() {
  return executeQuery({
    query: 'SELECT * FROM players ORDER BY name'
  });
}

// Get a player by ID
export async function getPlayerById(id) {
  return executeQuery({
    query: 'SELECT * FROM players WHERE id = ?',
    values: [id]
  });
}

// Get matches by player ID
export async function getMatchesByPlayerId(playerId) {
  return executeQuery({
    query: `
      SELECT m.*, 
             p1.name as player1_name, 
             p2.name as player2_name,
             w.name as winner_name
      FROM matches m
      JOIN players p1 ON m.player1_id = p1.id
      JOIN players p2 ON m.player2_id = p2.id
      JOIN players w ON m.winner_id = w.id
      WHERE m.player1_id = ? OR m.player2_id = ?
      ORDER BY m.match_date DESC
    `,
    values: [playerId, playerId]
  });
}

// Create a new match
export async function createMatch(player1Id, player2Id, winnerId) {
  return executeQuery({
    query: 'INSERT INTO matches (player1_id, player2_id, winner_id, match_date) VALUES (?, ?, ?, NOW())',
    values: [player1Id, player2Id, winnerId]
  });
}

// Get player statistics
export async function getPlayerStats(playerId) {
  // Get total matches
  const totalMatches = await executeQuery({
    query: 'SELECT COUNT(*) as total FROM matches WHERE player1_id = ? OR player2_id = ?',
    values: [playerId, playerId]
  });
  
  // Get wins
  const wins = await executeQuery({
    query: 'SELECT COUNT(*) as wins FROM matches WHERE winner_id = ?',
    values: [playerId]
  });
  
  // Calculate win rate
  const total = totalMatches[0]?.total || 0;
  const winCount = wins[0]?.wins || 0;
  const winRate = total > 0 ? (winCount / total) * 100 : 0;
  
  // Get streak
  const recentMatches = await executeQuery({
    query: `
      SELECT winner_id = ? as won
      FROM matches
      WHERE player1_id = ? OR player2_id = ?
      ORDER BY match_date DESC
      LIMIT 10
    `,
    values: [playerId, playerId, playerId]
  });
  
  let currentStreak = 0;
  for (let match of recentMatches) {
    if (match.won === 1 && currentStreak >= 0) {
      currentStreak++;
    } else if (match.won === 0 && currentStreak <= 0) {
      currentStreak--;
    } else {
      break;
    }
  }
  
  return {
    total,
    wins: winCount,
    losses: total - winCount,
    winRate: winRate.toFixed(1),
    currentStreak
  };
}

// Get player rankings
export async function getPlayerRankings() {
  return executeQuery({
    query: `
      SELECT 
        p.id,
        p.name,
        COUNT(m.id) as total_matches,
        SUM(CASE WHEN m.winner_id = p.id THEN 1 ELSE 0 END) as wins,
        COUNT(m.id) - SUM(CASE WHEN m.winner_id = p.id THEN 1 ELSE 0 END) as losses,
        ROUND((SUM(CASE WHEN m.winner_id = p.id THEN 1 ELSE 0 END) / COUNT(m.id)) * 100, 1) as win_percentage
      FROM players p
      LEFT JOIN matches m ON p.id = m.player1_id OR p.id = m.player2_id
      GROUP BY p.id
      ORDER BY win_percentage DESC, wins DESC
    `
  });
}

// Haal de laatste wedstrijden op voor een specifieke speler
export async function getRecentMatchesByPlayerId(playerId, limit = 6) {
  // LIMIT parameter direct in de query opnemen in plaats van als parameter
  return executeQuery({
    query: `
      SELECT 
        m.id,
        m.match_date,
        m.player1_id,
        m.player2_id,
        m.winner_id,
        p1.name as player1_name,
        p2.name as player2_name,
        SUBSTRING(p2.name, 1, 1) as opponent_initial,
        CASE 
          WHEN m.player1_id = ? THEN p2.id
          ELSE p1.id
        END as opponent_id,
        CASE 
          WHEN m.player1_id = ? THEN p2.name
          ELSE p1.name
        END as opponent_name,
        CASE 
          WHEN m.winner_id = ? THEN 'win'
          ELSE 'loss'
        END as result,
        DATE_FORMAT(m.match_date, '%Y-%m-%d') as match_date
      FROM matches m
      JOIN players p1 ON m.player1_id = p1.id
      JOIN players p2 ON m.player2_id = p2.id
      WHERE m.player1_id = ? OR m.player2_id = ?
      ORDER BY m.match_date DESC
      LIMIT ${parseInt(limit, 10)}
    `,
    values: [playerId, playerId, playerId, playerId, playerId]
  });
}

