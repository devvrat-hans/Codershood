import { auth, db } from './firebase/config.js';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

document.addEventListener('DOMContentLoaded', async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Load user profile
    loadUserProfile(user.uid);
    
    // Initialize contribution heatmap
    initHeatmap();
    
    // Load coding profiles
    loadCodingProfiles();
    
    // Setup profile connection handlers
    setupProfileConnections();
});

async function loadUserProfile(userId) {
    try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        const userData = userDoc.data();
        
        // Update UI with user data
        document.getElementById('userName').textContent = userData.username;
        document.getElementById('problemsSolved').textContent = userData.problemsSolved || 0;
        document.getElementById('contestsParticipated').textContent = userData.contestsParticipated || 0;
        document.getElementById('contributions').textContent = userData.contributions || 0;
        
        if (userData.photoURL) {
            document.getElementById('userAvatar').src = userData.photoURL;
        }
        
        if (userData.about) {
            document.getElementById('aboutContent').querySelector('p').textContent = userData.about;
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

function initHeatmap() {
    const ctx = document.getElementById('contributionHeatmap').getContext('2d');
    new Chart(ctx, {
        type: 'heatmap',
        data: {
            // Heatmap data configuration
        },
        options: {
            // Heatmap options
        }
    });
}

function loadCodingProfiles() {
    // LeetCode API
    fetch('https://leetcode-stats-api.herokuapp.com/{username}')
        .then(res => res.json())
        .then(data => {
            document.getElementById('leetcodeRating').textContent = data.rating;
            document.getElementById('leetcodeProblems').textContent = data.totalSolved;
        })
        .catch(console.error);

    // Codeforces API
    fetch('https://codeforces.com/api/user.info?handles={username}')
        .then(res => res.json())
        .then(data => {
            const user = data.result[0];
            document.getElementById('codeforcesRating').textContent = user.rating;
            document.getElementById('codeforcesRank').textContent = user.rank;
        })
        .catch(console.error);

    // CodeChef API (requires OAuth)
    // Implementation depends on CodeChef API access
}

function setupProfileConnections() {
    document.getElementById('connectLeetcode').addEventListener('click', connectLeetcode);
    document.getElementById('connectCodeforces').addEventListener('click', connectCodeforces);
    document.getElementById('connectCodechef').addEventListener('click', connectCodechef);
}

async function connectLeetcode(e) {
    e.preventDefault();
    // Implement LeetCode connection logic
}

async function connectCodeforces(e) {
    e.preventDefault();
    // Implement Codeforces connection logic
}

async function connectCodechef(e) {
    e.preventDefault();
    // Implement CodeChef connection logic
}